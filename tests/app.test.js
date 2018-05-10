const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-carcass-base', () => {
  beforeAll(() => helpers.run(path.join(__dirname, '../generators/app')).toPromise());

  it('creates base project files', () => {
    assert.file([
      '.editorconfig',
      '.gitignore',
      'package.json',
      'readme.md',
    ]);
  });
});
