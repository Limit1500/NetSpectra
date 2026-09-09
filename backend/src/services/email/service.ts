import { Resend } from "resend";
import { env } from "../../config/env.config";

class EmailService {
  static async sendEmail(to: string, subject: string, html: string) {
    const resend = new Resend(env.EMAILER_API_KEY);

    await resend.emails.send({
      from: env.EMAILER_ADDRESS!,
      to,
      subject,
      html,
    });
  }
}

export default EmailService;
