// USAGE:
//   ENDPOINT=ws://127.0.0.1:9944 ADD=addr1 REMOVE=addr2 node updateReservedNodes.js

require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');
const typedefs = require('./typedefs.json');

const WS_ENDPOINT = process.env.ENDPOINT || 'ws://localhost:9944';
const NODE_TO_ADD = process.env.ADD || '';
const NODE_TO_REMOVE = process.env.REMOVE || '';

async function main () {
    const wsProvider = new WsProvider(WS_ENDPOINT);
    const api = await ApiPromise.create({ provider: wsProvider, types: typedefs });

    if (NODE_TO_ADD) {
        const r = await api.rpc.system.addReservedPeer(NODE_TO_ADD);
        console.log('addReservedPeer response: ', r.toJSON());
    }

    if (NODE_TO_REMOVE) {
        const r = await api.rpc.system.removeReservedPeer(NODE_TO_REMOVE);
        console.log('removeReservedPeer response: ', r.toJSON());
    }
}

main().catch(console.error).finally(() => process.exit());
