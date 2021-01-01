const SecureRandom = Java.type('java.security.SecureRandom');
const rnd = new SecureRandom();
const base58alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

randomBytes = () => {
    let bytes = new Array(16);
    for (let i = 0; i< 4; i++) {
        let r = rnd.nextInt();
        let idx = i * 4;
        bytes[idx] = r & 0xff;
        bytes[idx + 1] = (r >> 8) & 0xff;
        bytes[idx + 2] = (r >> 16) & 0xff;
        bytes[idx + 3] = (r >> 24) & 0xff;
    }
    return bytes;
}

base58encode = (buffer) => {
    var carry, digits, j;
    if (buffer.length === 0) {
        return "";
    }
    i = void 0;
    j = void 0;
    digits = [0];
    i = 0;
    while (i < buffer.length) {
        j = 0;
        while (j < digits.length) {
            digits[j] <<= 8;
            j++;
        }
        digits[0] += buffer[i];
        carry = 0;
        j = 0;
        while (j < digits.length) {
            digits[j] += carry;
            carry = (digits[j] / 58) | 0;
            digits[j] %= 58;
            ++j;
        }
        while (carry) {
            digits.push(carry % 58);
            carry = (carry / 58) | 0;
        }
        i++;
    }
    i = 0;
    while (buffer[i] === 0 && i < buffer.length - 1) {
        digits.push(0);
        i++;
    }
    return digits.reverse().map(function(digit) {
        return base58alphabet[digit];
    }).join("");
};

module.exports = (options) => {
    const { length, prefix, hash, firstMustBeLetter }
        = Object.assign({
        length : 16,
        prefix : '',
        hash : 'sha256',
        firstMustBeLetter : false }, options || { });
    let uid = base58encode(randomBytes());
    while (uid.length < length) {
        uid += base58encode(randomBytes());
        if(firstMustBeLetter)
            uid = uid.replace(/^\d+/,'');
    }
    if(prefix)
        uid = prefix+uid;
    if(prefix)
        uid = uid+suffix;
    return uid.substring(0,length);
}
