import { join } from 'path';

export const rootDir = join(__dirname, '..', '..');
export const srcDir = join(rootDir, 'source');
export const version = require(join(rootDir, 'package.json')).version; 
