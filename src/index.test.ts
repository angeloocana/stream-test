import path from 'path';
import * as assert from 'ptz-assert';
import * as ST from './index';

describe('stream-test', () => {
    describe('readStream', () => {
        it('reads the whole file', (done) => {
            const fileName = path.join(__dirname, '../src/test-file.txt');

            ST.createTestFile(fileName);

            const expectedLastChunk = '999998\n999999\n';

            function onEnd(lastChunk) {
                assert.equal(lastChunk.toString(), expectedLastChunk);
                done();
            }

            ST.readStream(fileName, onEnd);
        });
    });
});
