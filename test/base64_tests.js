var Base64 = require('../Base64');

exports.oneByte = function(beforeExit, assert) {
    var data = [0];
    var result = Base64.encode(data);

    assert.equal("AA==", result);
};
