import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

interface Attachement {}

export class EmailService {
  constructor() {}

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { htmlBody, subject, to, attachements = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
      <h2>Logs de sistema - Noc</h2>
      <p>Esse duis officia anim laboris. Ad magna officia anim pariatur anim reprehenderit aliquip fugiat. Velit fugiat minim elit culpa consequat anim reprehenderit non eu laboris esse eu. Do deserunt excepteur aliqua laborum. Laboris Lorem aute occaecat non duis nulla cupidatat exercitation. Veniam aute culpa qui consequat culpa irure et sunt mollit minim sint sint.</p>
      <p>Ver log adjuntos</p>
      `;

    const attachements: Attachement[] = [
      { filename: "logs-low.log", path: "logs/logs-low.log" },
      { filename: "logs-medium.log", path: "logs/logs-medium.log" },
      { filename: "logs-high.log", path: "logs/logs-high.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachements });
  }
}
