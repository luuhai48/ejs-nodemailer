const path = require('path');
const ejs = require('ejs');

const defaultConfig = {
  layoutsDir: undefined,
  defaultLayout: 'main',
};

class EjsTemplateEngine {
  constructor(config = {}) {
    this.defaultLayout = config.defaultLayout || defaultConfig.defaultLayout;
    this.layoutsDir = config.layoutsDir || defaultConfig.layoutsDir;
  }

  async render(filePath, options) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, options?.context || [], { cache: options?.cache }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  async renderTemplate(filePath, options, callback) {
    try {
      let html = await this.render(filePath, options);
      const layoutPath = this._resolveLayoutPath(
        options && 'layout' in options && options.layout ? options.layout : this.defaultLayout,
      );
      if (layoutPath) {
        html = await this.render(layoutPath, {
          ...options,
          layout: undefined,
          context: {
            ...(options?.context || {}),
            body: html,
          },
        });
      }
      callback && callback(null, html);
    } catch (err) {
      callback && callback(err);
    }
  }

  _resolveLayoutPath(layoutPath) {
    if (!layoutPath) {
      return null;
    }
    if (!path.extname(layoutPath)) {
      layoutPath += '.ejs';
    }
    return path.resolve(this.layoutsDir || '', layoutPath);
  }
}

module.exports = EjsTemplateEngine;
