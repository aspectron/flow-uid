const crypto = require('crypto');
const basex = require('base-x')
const base58alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const base58 = basex(base58alphabet)

module.exports = (options) => {
    const { length, prefix, hash, firstMustBeLetter } 
        = Object.assign({ 
            length : 16, 
            prefix : '', 
            hash : 'sha256', 
            firstMustBeLetter : false }, options || { });
    let uid = base58.encode(crypto.createHash(hash).update(crypto.randomBytes(Math.round(length/4*5))).digest());
    if(firstMustBeLetter)
        uid = uid.replace(/^\d+/,'');
    if(prefix)
        uid = prefix+uid;
    if(prefix)
        uid = uid+suffix;
    return uid.substring(0,length);
}
