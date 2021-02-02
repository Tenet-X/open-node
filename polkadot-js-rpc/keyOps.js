
const { Keyring } = require('@polkadot/api');//yarn add @polkadot/api
const {stringToU8a, u8aToHex } = require('@polkadot/util');//yarn add @polkadot/util-crypto
const { signatureVerify,cryptoWaitReady, mnemonicGenerate } = require('@polkadot/util-crypto');

async function main () {
  
    // we only need to do this once per app, somewhere in our init code
   // (when using the API and waiting on `isReady` this is done automatically)
    await cryptoWaitReady();
    const keyringEd = new Keyring({ type: 'ed25519' });
    //const keyringSr = new Keyring({ type: 'sr25519' });

    // generate a mnemonic with default params (we can pass the number
    // of words required 12, 15, 18, 21 or 24, less than 12 words, while
    // valid, is not supported since it is more-easily crackable)
    const mnemonic = mnemonicGenerate();
    console.log("mnemonic: ",mnemonic,'\n');

    // create & add the pair to the keyring with the type and some additional
    // metadata specified
    const pair = keyringEd.addFromUri(mnemonic, { name: 'first pair' });

    // the pair has been added to our keyring
    console.log(keyringEd.pairs.length, 'pairs available');

    // log the name & address (the latter encoded with the ss58Format)
    console.log(pair.meta.name, 'has address: ', pair.address,'\npublic key: ',u8aToHex(pair.publicKey));

    // create the message and sign it
    const message = stringToU8a('this is our message');
    const signature = pair.sign(message);

    // verify the message using Alice's address
    const { isValid } = signatureVerify(message, signature, pair.address);

    // output the result
    console.log('\nsignature: ', `${u8aToHex(signature)} \nis ${isValid ? 'valid' : 'invalid'}`);
}

main().catch(console.error).finally(() => process.exit());
