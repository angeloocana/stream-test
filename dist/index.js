'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTestFile = createTestFile;
exports.readStream = readStream;

var _chunkingStreams = require('chunking-streams');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTestFile(fileName) {
    if (_fs2.default.existsSync(fileName)) {
        console.log('test file already exists');
        return;
    }
    console.log('generating test file');
    var data = '';
    var chunkLines = 0;
    for (var i = 0; i < 1000000; i++) {
        chunkLines++;
        data += i + '\n';
        if (chunkLines === 1000) {
            console.log('appending to file: ', i);
            _fs2.default.appendFileSync(fileName, data, function (err) {
                return console.log(err);
            });
            chunkLines = 0;
            data = '';
        }
    }
    console.log('file created');
}
function readStream(fileName, onEnd) {
    var lineChunk = new _chunkingStreams.LineCounter({
        numLines: 2,
        flushTail: false
    });
    var lastChunk = null;
    _fs2.default.createReadStream(fileName, { encoding: 'utf-8' }).pipe(lineChunk).on('data', function (chunk) {
        return lastChunk = chunk;
    }).on('error', function (err) {
        return console.log('onError', err);
    }).on('end', function () {
        return onEnd(lastChunk);
    }).on('finish', function () {
        return console.log('finish');
    }).on('open', function () {
        return console.log('open');
    }).on('close', function () {
        return console.log('close');
    });
}
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map