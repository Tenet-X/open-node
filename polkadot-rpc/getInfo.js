// USAGE:
//   ENDPOINT=ws://127.0.0.1:9944 node getInfo.js

require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');
const typedefs = require('./typedefs.json');

const WS_ENDPOINT = process.env.ENDPOINT || 'ws://35.229.59.163:9944';

async function main () {
    const wsProvider = new WsProvider(WS_ENDPOINT);
    const api = await ApiPromise.create({ provider: wsProvider, types: typedefs });

    const nodeRoles = await api.rpc.system.nodeRoles();
    const health = await api.rpc.system.health();
    const networkState = await api.rpc.system.networkState();
    const syncStae = await api.rpc.system.syncState();

    console.log({
        networkState.peerId.toString()
    });
}

main().catch(console.error).finally(() => process.exit());
