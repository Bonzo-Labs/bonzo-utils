/*
 * Copyright (c) 2024 Bonzo Labs
 * Released under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import path from 'path';
import fs from 'fs';
import url from 'url';

const rootDir = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');

cleanBonzoBalance();

function cleanBonzoBalance() {
    const projDir = path.join(rootDir, 'packages', 'liquidity-pool');
    const libDir = path.join(projDir, 'lib');
    fs.rmSync(libDir, { recursive: true, force: true });
    fs.rmSync(path.join(projDir, 'tsconfig.tsbuildinfo'), { force: true });
}
