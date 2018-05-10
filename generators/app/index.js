const CarcassGenerator = require('carcass-generator');
const path = require('path');

class CarcassGeneratorBase extends CarcassGenerator {
  /**
   * Keystone.js generator
   * @param {String|Array} args
   * @param {Object} opts
   */
  constructor(args, opts) {
    super(args, opts);

    const checkOption = name =>
      this.options[name] !== undefined && this.options[name] !== null;

    this.questionsList = [
      {
        name: 'appname',
        when: () => !checkOption('appname'),
        type: 'input',
        message: 'Enter your app name',
        default: this.appname,
      },
      {
        name: 'authorName',
        when: () => !checkOption('authorName'),
        type: 'input',
        message: 'Enter your name',
        default: this.user.git.name(),
      },
      {
        name: 'authorEmail',
        when: () => !checkOption('authorEmail'),
        type: 'input',
        message: 'Enter your email',
        default: this.user.git.email(),
      },
      {
        name: 'docker',
        when: () => !checkOption('docker'),
        type: 'confirm',
        message: 'I will use Docker in my project',
      },
      {
        name: 'eslint',
        when: () => !checkOption('eslint'),
        type: 'confirm',
        message: 'I will use ESLint in my project',
      },
      {
        name: 'tslint',
        when: () => !checkOption('eslint'),
        type: 'confirm',
        message: 'I will use TSLint in my project',
      },
      {
        name: 'stylelint',
        when: () => !checkOption('stylelint'),
        type: 'confirm',
        message: 'I will use StyleLint in my project',
      },
      {
        name: 'gitlabci',
        when: () => !checkOption('gitlabci'),
        type: 'confirm',
        message: 'I will use Gitlab CI in my project',
      },
      {
        name: 'dotenv',
        when: () => !checkOption('dotenv'),
        type: 'confirm',
        message: 'Create .env file',
      },
    ];

    this.options.dirname = path.basename(this.destinationPath());
    this.options.gitOrigin = CarcassGeneratorBase.getGitOrigin('#ENTER_YOUR_GIT_REPO_HERE#');
    this.convertPromptsToOptions(this.questionsList);
  }

  async prompting() {
    const answers = await this.prompt(this.questionsList);
    Object.assign(this.options, answers);
    this.options.appnameSlug = this.options.appname.replace(/\s+/g, '-');
  }

  writing() {
    if (this.options.docker) {
      this.fs.copyTpl(
        this.templatePath('.dockerignore'),
        this.destinationPath('.dockerignore'),
      );
    }

    if (this.options.eslint) {
      this.fs.copyTpl(
        this.templatePath('.eslintrc'),
        this.destinationPath('.eslintrc'),
      );
    }

    if (this.options.tslint) {
      this.fs.copyTpl(
        this.templatePath('tslint.json'),
        this.destinationPath('tslint.json'),
      );
    }

    if (this.options.stylelint) {
      this.fs.copyTpl(
        this.templatePath('.stylelintrc'),
        this.destinationPath('.stylelintrc'),
      );
    }

    if (this.options.gitlabci) {
      this.fs.copyTpl(
        this.templatePath('.gitlab-ci.yml'),
        this.destinationPath('.gitlab-ci.yml'),
      );
      this.fs.copyTpl(
        this.templatePath('Makefile'),
        this.destinationPath('Makefile'),
      );
    }

    if (this.options.dotenv) {
      this.fs.copyTpl(
        this.templatePath('_env'),
        this.destinationPath('.env'),
      );
    }

    this.fs.copyTpl(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig'),
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.options,
    );

    this.fs.copyTpl(
      this.templatePath('readme.md'),
      this.destinationPath('readme.md'),
      this.options,
    );
  }
}

module.exports = CarcassGeneratorBase;
