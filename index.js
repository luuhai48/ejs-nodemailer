'use strict';

const path = require('path');
const EjsTemplateEngine = require('./engine');

module.exports = function(options) {
  const templateEngine = new EjsTemplateEngine(options);

  return function(mail, cb) {
    const data = mail.data;
    if (data.html) return cb();

    const filePath = path.join(options.templatePath, data.template + '.ejs');
    templateEngine.renderTemplate(filePath, { context: data.context, ...options }, function (err, data) {
      if (err) return cb(err);
      mail.data.html = data;
      cb();
    });
  }
}
