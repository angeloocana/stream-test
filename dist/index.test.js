'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

var ST = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('stream-test', function () {
    describe('readStream', function () {
        it('reads the whole file', function (done) {
            var fileName = _path2.default.join(__dirname, '../src/test-file.txt');
            ST.createTestFile(fileName);
            var expectedLastChunk = '999998\n999999\n';
            function onEnd(lastChunk) {
                assert.equal(lastChunk.toString(), expectedLastChunk);
                done();
            }
            ST.readStream(fileName, onEnd);
        });
    });
});
//# sourceMappingURL=index.test.js.map
//# sourceMappingURL=index.test.js.map