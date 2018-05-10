const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('eslint', () => {
  const generator = () => helpers.run(path.join(__dirname, '../generators/app'));
  const testFn = () => assert.file(['.eslintrc']);

  describe('with options', () => {
    beforeAll(() => generator().withOptions({ eslint: true }).toPromise());
    it('creates eslint config', testFn);
  });

  describe('with prompts', () => {
    beforeAll(() => generator().withPrompts({ eslint: true }).toPromise());
    it('creates eslint config', testFn);
  });
});
