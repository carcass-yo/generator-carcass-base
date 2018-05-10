const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('gitlabci', () => {
  const generator = () => helpers.run(path.join(__dirname, '../generators/app'));
  const testFn = () => assert.file(['.gitlab-ci.yml', 'Makefile']);

  describe('with options', () => {
    beforeAll(() => generator().withOptions({ gitlabci: true }).toPromise());
    it('creates CI config and Makefile', testFn);
  });

  describe('with prompts', () => {
    beforeAll(() => generator().withPrompts({ gitlabci: true }).toPromise());
    it('creates CI config and Makefile', testFn);
  });
});
