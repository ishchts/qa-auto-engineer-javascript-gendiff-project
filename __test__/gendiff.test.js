import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const extNames = ['json', 'yml', 'ini'];

const resultStylish = fs.readFileSync(getFixturePath('stylish'), 'utf-8');
const resultPlain = fs.readFileSync(getFixturePath('plain'), 'utf-8');
const resultJson = fs.readFileSync(getFixturePath('json'), 'utf-8');

extNames.forEach((ext) => {
  const pathFile1 = getFixturePath(`before.${ext}`);
  const pathFile2 = getFixturePath(`after.${ext}`);

  describe('gendiff test', () => {
    test(`${ext} extension test with stylish format`, () => {
      expect(gendiff(pathFile1, pathFile2, 'stylish')).toBe(resultStylish);
    });

    test(`${ext} extension test with plain format`, () => {
      expect(gendiff(pathFile1, pathFile2, 'plain')).toBe(resultPlain);
    });

    test(`${ext} extension test with json format`, () => {
      expect(gendiff(pathFile1, pathFile2, 'json')).toBe(resultJson);
    });
  });
});
