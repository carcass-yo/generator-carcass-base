const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('tslint', () => {
  const generator = () => helpers.run(path.join(__dirname, '../generators/app'));
  const testFn = () => assert.file(['tslint.json']);

  describe('with options', () => {
    beforeAll(() => generator().withOptions({ tslint: true }).toPromise());
    it('creates tslint config', testFn);
  });

  describe('with prompts', () => {
    beforeAll(() => generator().withPrompts({ tslint: true }).toPromise());
    it('creates tslint config', testFn);
  });
});
