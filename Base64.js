/**
 *
 *  Base64.js
 *
 *  copyright 2003,2013 Kevin Lindsey
 *
 */

Base64 = {};

/**
 *   encoding table
 */
Base64.encoding = [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z", "a", "b", "c", "d", "e", "f",
    "g", "h", "i", "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s", "t", "u", "v",
    "w", "x", "y", "z", "0", "1", "2", "3",
    "4", "5", "6", "7", "8", "9", "+", "/"
];

/**
 *  encode
 *
 *  @param {Array<Integer>} data
 *  @returns {String}
 */
Base64.encode = function(data) {
    var result = [];
    var ip57   = Math.floor(data.length / 57);
    var fp57   = data.length % 57;
    var ip3    = Math.floor(fp57 / 3);
    var fp3    = fp57 % 3;
    var index  = 0;
    var num;

    for ( var i = 0; i < ip57; i++ ) {
        for ( j = 0; j < 19; j++, index += 3 ) {
            num = data[index] << 16 | data[index+1] << 8 | data[index+2];
            result.push(Base64.encoding[ ( num & 0xFC0000 ) >> 18 ]);
            result.push(Base64.encoding[ ( num & 0x03F000 ) >> 12 ]);
            result.push(Base64.encoding[ ( num & 0x0FC0   ) >>  6 ]);
            result.push(Base64.encoding[ ( num & 0x3F     )       ]);
        }
        result.push("\n");
    }

    for ( i = 0; i < ip3; i++, index += 3 ) {
        num = data[index] << 16 | data[index+1] << 8 | data[index+2];
        result.push(Base64.encoding[ ( num & 0xFC0000 ) >> 18 ]);
        result.push(Base64.encoding[ ( num & 0x03F000 ) >> 12 ]);
        result.push(Base64.encoding[ ( num & 0x0FC0   ) >>  6 ]);
        result.push(Base64.encoding[ ( num & 0x3F     )       ]);
    }

    if ( fp3 == 1 ) {
        num = data[index] << 16;
        result.push(Base64.encoding[ ( num & 0xFC0000 ) >> 18 ]);
        result.push(Base64.encoding[ ( num & 0x03F000 ) >> 12 ]);
        result.push("==");
    }
    else if ( fp3 == 2 ) {
        num = data[index] << 16 | data[index+1] << 8;
        result.push(Base64.encoding[ ( num & 0xFC0000 ) >> 18 ]);
        result.push(Base64.encoding[ ( num & 0x03F000 ) >> 12 ]);
        result.push(Base64.encoding[ ( num & 0x0FC0   ) >>  6 ]);
        result.push("=");
    }

    return result.join("");
};

if (typeof module !== "undefined") {
    module.exports = Base64;
}
