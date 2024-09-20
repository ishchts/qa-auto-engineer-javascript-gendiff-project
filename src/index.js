import fs from 'fs';
import path from 'path';
import parse from './parsers/index.js';
import getBuildAst from './buildAst.js';
import render from './formatters/index.js';

const getFullPath = (filePath) => path.resolve(filePath);

const getExtName = (filePath) => path.extname(filePath).slice(1);

const gendiff = (beforePath, afterPath, format = 'stylish') => {
  const beforeFile = fs.readFileSync(getFullPath(beforePath), 'utf-8');
  const afterFile = fs.readFileSync(getFullPath(afterPath), 'utf-8');

  const parseBeforeFile = parse(getExtName(beforePath), beforeFile);
  const parseAfterFile = parse(getExtName(afterPath), afterFile);

  const buildAst = getBuildAst(parseBeforeFile, parseAfterFile);
  const result = render(format, buildAst);
  return result;
};

export default gendiff;
