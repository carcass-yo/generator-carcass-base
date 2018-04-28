const YoGenerator = require('yeoman-generator');
const shell = require('shelljs');
// const _ = require('lodash');
// const chalk = require('chalk');
const path = require('path');

class CarcassBaseGenerator extends YoGenerator {
  /**
   * Keystone.js generator
   * @param {String|Array} args
   * @param {Object} opts
   */
  constructor(args, opts) {
    super(args, opts);
    this.options.appnameSlug = this.appname.replace(/\s+/g, '-');
    this.options.dirname = path.basename(this.destinationPath());
    this.options.gitOrigin = CarcassBaseGenerator.getGitOrigin('#ENTER_YOUR_GIT_REPO_HERE#');
    this.option('authorName', {
      type: String,
      description: 'Enter your name',
      default: this.user.git.name(),
    });
    this.option('authorEmail', {
      type: String,
      description: 'Enter your email',
      default: this.user.git.email(),
    });
  }

  /**
   * Get git repository origin url
   * @param {string} [defaultValue] set default returned value
   * @return {string}
   */
  static getGitOrigin(defaultValue = '') {
    if (!shell.which('git')) return defaultValue;
    const res = shell
      .exec('git remote get-url origin', { silent: true })
      .stdout
      .trim();
    return res.includes('Not a git repository') ? defaultValue : res;
  }

  async prompting() {
    // Convert options configs to prompts
    // eslint-disable-next-line no-underscore-dangle
    const options = this._options;
    const prompts = [];
    Object.keys(options)
      .filter(o => !['help', 'skip-cache', 'skip-install'].includes(o))
      .forEach((o) => {
        prompts.push({
          type: 'input',
          name: o,
          message: options[o].description,
          default: options[o].default,
        });
      });

    const answers = await this.prompt(prompts);
    Object.assign(this.options, answers);
    console.log(this.options);
  }

  writing() {
    // this.fs.copyTpl(
    //   this.templatePath('.'),
    //   this.destinationPath('.'),
    //   this.options,
    //   {},
    //   {
    //     globOptions: { dot: true },
    //   },
    // );
  }
}

module.exports = CarcassBaseGenerator;
