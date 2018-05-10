const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('docker', () => {
  const generator = () => helpers.run(path.join(__dirname, '../generators/app'));
  const testFn = () => assert.file(['.dockerignore']);

  describe('with options', () => {
    beforeAll(() => generator().withOptions({ docker: true }).toPromise());
    it('creates .dockerignore', testFn);
  });

  describe('with prompts', () => {
    beforeAll(() => generator().withPrompts({ docker: true }).toPromise());
    it('creates .dockerignore', testFn);
  });
});
