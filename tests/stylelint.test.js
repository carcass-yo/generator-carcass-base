const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('stylelint', () => {
  const generator = () => helpers.run(path.join(__dirname, '../generators/app'));
  const testFn = () => assert.file(['.stylelintrc']);

  describe('with options', () => {
    beforeAll(() => generator().withOptions({ stylelint: true }).toPromise());
    it('creates stylelint config', testFn);
  });

  describe('with prompts', () => {
    beforeAll(() => generator().withPrompts({ stylelint: true }).toPromise());
    it('creates stylelint config', testFn);
  });
});
