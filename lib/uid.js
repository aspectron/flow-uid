const crypto = require('crypto');
const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'.split('');
module.exports = (options) => {
    const { length, prefix, suffix, firstMustBeLetter }
        = Object.assign({
            length : 16,
            prefix : '',
            suffix : '',
            firstMustBeLetter : false }, options || { });

    let bytes = [...crypto.randomBytes(length)].map(v => v%alphabet.length);
    if(firstMustBeLetter && bytes[0] < 9)
        bytes[0] += 9;
    let uid = bytes.map(v => alphabet[v]).join('');
    if(prefix)
        uid = prefix+uid;
    if(suffix)
        uid = uid+suffix;
    return uid;
}
