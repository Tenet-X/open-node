// USAGE:
//   ENDPOINT=ws://127.0.0.1:9944 DRY_RUN=0 node insertSessionKey.js

require('dotenv').config();

const { ApiPromise, Keyring, WsProvider } = require('@polkadot/api');
const { u8aToHex } = require('@polkadot/util');
const typedefs = require('./typedefs.json');

const WS_ENDPOINT = process.env.ENDPOINT || 'ws://localhost:9944';
const SESSION_KEY = process.env.SESSION_KEY || '//Alice//session';
const DRY_RUN = process.env.DRY_RUN == '1' || false;

async function main () {
    const wsProvider = new WsProvider(WS_ENDPOINT);
    const api = await ApiPromise.create({ provider: wsProvider, types: typedefs });

    const keyringEd = new Keyring({ type: 'ed25519' });
    const keyringSr = new Keyring({ type: 'sr25519' });

    const gran = keyringEd.addFromUri(SESSION_KEY); //generate key pair structure
    const babe = keyringSr.addFromUri(SESSION_KEY);

    // Session Keys:
    //   grandpa: GrandpaId,
    //   babe: BabeId,
    //   im_online: ImOnlineId,
    //   authority_discovery: AuthorityDiscoveryId,
    const keys = api.createType('Keys', [
        gran.publicKey, babe.publicKey, babe.publicKey, babe.publicKey
    ]);
    const opaqueSessionKey = keys.toHex();

    let rpcResult = {};
    if (!DRY_RUN) {
        const pubkeyGran = u8aToHex(gran.publicKey);
        const pubkeyBabe = u8aToHex(babe.publicKey);
        await api.rpc.author.insertKey('gran', SESSION_KEY, pubkeyGran);
        await api.rpc.author.insertKey('babe', SESSION_KEY, pubkeyBabe);
        await api.rpc.author.insertKey('imon', SESSION_KEY, pubkeyBabe);
        await api.rpc.author.insertKey('audi', SESSION_KEY, pubkeyBabe);
        const inserted = (await api.rpc.author.hasSessionKeys(opaqueSessionKey)).toJSON();
        rpcResult = {
            pubkeyGran,
            pubkeyBabe,
            inserted,
        };
    }

    console.log(
        opaqueSessionKey
    );
}

main().catch(console.error).finally(() => process.exit());
