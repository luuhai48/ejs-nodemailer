import { SentMessageInfo, Transporter } from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";

declare namespace enm {
  interface TemplateOptions {
    template?: string | undefined;
    context?: any;
  }

  type EjsTransporter = Transporter & {
    sendMail(
      mailOptions: Mail.Options & TemplateOptions,
      callback: (err: Error | null, info: SentMessageInfo) => void,
    ): void;
    sendMail(mailOptions: Mail.Options & TemplateOptions): Promise<SentMessageInfo>;
  };

  interface EjsNodemailerOptions {
    templatePath: string;
    layoutsDir?: string;
    defaultLayout?: string;
    cache?: boolean;
  }

  export { TemplateOptions, EjsTransporter, EjsNodemailerOptions };
}

declare function enm(options: enm.EjsNodemailerOptions): Mail.PluginFunction;

export = enm;
