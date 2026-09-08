import { Resend } from "resend";
import { env } from "../config/env.config";
import { EmailTokenPurpose } from "../../generated/prisma/enums";

class EmailService {
  private static async sendEmail(to: string, subject: string, html: string) {
    const resend = new Resend(env.EMAILER_API_KEY);

    await resend.emails.send({
      from: env.EMAILER_ADDRESS!,
      to,
      subject,
      html,
    });
  }

  static async formatAndSendEmail(
    email: string,
    confirmationUrl: string,
    purpose: EmailTokenPurpose
  ) {
    let subject;
    let html;

    if (purpose === "DELETE") {
      subject = "Confirm account deletion";
      html = `<h2>Confirm account deletion</h2>

              <p>Hello,</p>

							<p>
 							  You requested to delete your NetSpectra account.
							  Click the button below to confirm this action.
							</p>

							<a href="${confirmationUrl}"
 						  	style="display:inline-block;padding:10px 16px;background:#dc2626;color:white;text-decoration:none;border-radius:6px;">
						  	Confirm deletion
							</a>

							<p>
 								This link will expire in 15 minutes.
							</p>

							<p>
  							If you did not request this, you can safely ignore this email.
							</p>`;
    } else {
      subject = "Confirm account changes";
      html = `<h2>Confirm account changes</h2>

							<p>Hello,</p>

							<p>
							  You requested to modify your NetSpectra account.
								Click the button below to confirm this action.
							</p>

							<a href="${confirmationUrl}"
							  style="display:inline-block;padding:10px 16px;background:#2563eb;color:white;text-decoration:none;border-radius:6px;">
							  Confirm changes
							</a>

							<p>
							  This link will expire in 15 minutes.
							</p>

							<p>
  							If you did not request this, you can safely ignore this email.
							</p>`;
    }
    await EmailService.sendEmail(email, subject, html);
  }
}

export default EmailService;
