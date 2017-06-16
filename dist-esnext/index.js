import { LineCounter } from 'chunking-streams';
import fs from 'fs';
export function createTestFile(fileName) {
    if (fs.existsSync(fileName)) {
        console.log('test file already exists');
        return;
    }
    console.log('generating test file');
    let data = '';
    let chunkLines = 0;
    for (let i = 0; i < 1000000; i++) {
        chunkLines++;
        data += `${i}\n`;
        if (chunkLines === 1000) {
            console.log('appending to file: ', i);
            fs.appendFileSync(fileName, data, (err) => console.log(err));
            chunkLines = 0;
            data = '';
        }
    }
    console.log('file created');
}
export function readStream(fileName, onEnd) {
    const lineChunk = new LineCounter({
        numLines: 2,
        flushTail: false
    });
    let lastChunk = null;
    fs.createReadStream(fileName, { encoding: 'utf-8' })
        .pipe(lineChunk)
        .on('data', chunk => lastChunk = chunk)
        .on('error', (err) => console.log('onError', err))
        .on('end', () => onEnd(lastChunk))
        .on('finish', () => console.log('finish'))
        .on('open', () => console.log('open'))
        .on('close', () => console.log('close'));
}
//# sourceMappingURL=index.js.map