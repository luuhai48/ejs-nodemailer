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
      layoutsDir: 'template/layouts',
      templatePath: 'template',
      defaultLayout: 'main',
    }),
  );

  await transporter.sendMail({
    to: 'target@email.com',
    subject: 'Subject',
    template: 'home',
    context: {
      message: 'Hello world',
    },
  });
}
