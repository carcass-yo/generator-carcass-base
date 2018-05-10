const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('.env', () => {
  const generator = () => helpers.run(path.join(__dirname, '../generators/app'));
  const testFn = () => assert.file(['.env']);

  describe('with options', () => {
    beforeAll(() => generator().withOptions({ tslint: true }).toPromise());
    it('creates .env file', testFn);
  });

  describe('with prompts', () => {
    beforeAll(() => generator().withPrompts({ tslint: true }).toPromise());
    it('creates .env file', testFn);
  });
});
