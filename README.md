# EJS-Nodemailer - Teamplate engine for Nodemailer using Ejs

## Install

```bash
npm install ejs-nodemailer
# Or
yarn add ejs-nodemailer
```

## Usage

(See example)

```javascript
const enm = require('ejs-nodemailer');
const { createTransport } = require('nodemailer');


async function sendTemplateMail() {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'YOUR@EMAIL.COM',
      pass: 'YOUR-PASS',
    },
  });

  transporter.use(
    'compile',
    enm({
      layoutsDir: 'template/layouts', // Directory where you store all the layout template files
      templatePath: 'template', // Directory where you store all the template files.
      defaultLayout: 'main',
    }),
  );

  await transporter.sendMail({
    to: 'target@email.com',
    subject: 'Subject',
    template: 'home', // Name of the template file without extension `.ejs`
    context: {
      message: 'Hello world',
    },
  });
}
```
