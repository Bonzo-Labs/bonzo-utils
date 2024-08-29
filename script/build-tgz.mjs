/*
 * Copyright (c) 2024 Bonzo Labs
 * Released under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import path from 'path';
import fs from 'fs';
import url from 'url';
import { execSync } from 'child_process';

const rootDir = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir);

makeTgz('liquidity-pool');

function makeTgz(project) {

    const libDir = path.join(rootDir, 'packages', project, 'lib');

    execSync('npm pack', { cwd: libDir });
    const tgzFiles = fs.readdirSync(libDir).filter(f => f.endsWith('.tgz'));
    for (const tgzFile of tgzFiles) {
        fs.copyFileSync(path.join(libDir, tgzFile), path.join(distDir, tgzFile));
        fs.rmSync(path.join(libDir, tgzFile));
    }
}
