import {Analyser} from "../index";
import * as path from 'path';
import { createReadStream, createWriteStream } from 'fs';

describe('Test library', () => {
    let analyser: Analyser;
    jest.setTimeout(1000 * 60 * 2);

    beforeEach(done => {
        const srcPath = path.join(__dirname, 'seed', 'src.seed.ts');
        const seedPath = path.join(__dirname, 'seed', 'common.seed.ts');
        const readStream = createReadStream(srcPath);
        const writeStream = createWriteStream(seedPath);
        readStream.pipe(writeStream);
        writeStream.on('error', (e) => done.fail(e));
        readStream.on('error', (e) => done.fail(e));
        readStream.on('end', () => {
            writeStream.end();
            analyser = new Analyser(seedPath);
            done();
        });
    })

    it('First test', async () => {
        await analyser.handleFile();
    })
})
