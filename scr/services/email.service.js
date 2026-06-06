import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export const mailFormat = {
    sendMessage: async (email, name) => {
        try {
            const mailOption = {
                from: process.env.SMTP_USER,
                to: email,
                subject: "Welcome to Our Platform 🎉",
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>Welcome</title>
                </head>
                <body style="margin:0; padding:0; background-color:#f0f4f8; font-family: 'Segoe UI', Arial, sans-serif;">

                  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
                    <tr>
                      <td align="center">

                        <!-- Card -->
                        <table width="560" cellpadding="0" cellspacing="0"
                          style="background:#ffffff; border-radius:16px; overflow:hidden;
                                 box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                          <!-- Header banner -->
                          <tr>
                            <td align="center"
                              style="background: linear-gradient(135deg, #0D1B2A 0%, #1B3A5C 60%, #00A896 100%);
                                     padding: 44px 40px 36px;">
                              <div style="font-size:36px; margin-bottom:12px;">✉️</div>
                              <h1 style="margin:0; color:#ffffff; font-size:26px;
                                         font-weight:700; letter-spacing:0.5px;">
                                Welcome Aboard!
                              </h1>
                              <p style="margin:8px 0 0; color:#72C4BC; font-size:14px;">
                                We're thrilled to have you with us
                              </p>
                            </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                            <td style="padding: 36px 40px 20px;">
                              <p style="margin:0 0 16px; font-size:16px; color:#1A2A3A;">
                                Hey <strong style="color:#00A896;">${name}</strong> 👋,
                              </p>
                              <p style="margin:0 0 16px; font-size:15px; color:#5A6A7A; line-height:1.7;">
                                Your account has been created successfully. 
                                We are delighted to have you join our community — 
                                you're now part of something great.
                              </p>
                              <p style="margin:0 0 28px; font-size:15px; color:#5A6A7A; line-height:1.7;">
                                Feel free to explore the platform and get started. 
                                If you ever need help, we're just one message away.
                              </p>

                              <!-- CTA Button -->
                              <table cellpadding="0" cellspacing="0" style="margin: 0 auto 28px;">
                                <tr>
                                  <td align="center"
                                    style="background: linear-gradient(135deg, #00A896, #1B3A5C);
                                           border-radius:8px;">
                                    <a href="#"
                                      style="display:inline-block; padding:14px 36px;
                                             color:#ffffff; font-size:15px; font-weight:600;
                                             text-decoration:none; letter-spacing:0.3px;">
                                      Get Started →
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <!-- Divider -->
                          <tr>
                            <td style="padding: 0 40px;">
                              <hr style="border:none; border-top:1px solid #e8edf3; margin:0;" />
                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td align="center" style="padding: 24px 40px 32px;">
                              <p style="margin:0; font-size:12px; color:#9AABBF; line-height:1.6;">
                                You received this email because you signed up on our platform.<br/>
                                If this wasn't you, please ignore this message.
                              </p>
                              <p style="margin:12px 0 0; font-size:12px; color:#C5D5E4;">
                                © ${new Date().getFullYear()} Your Platform Name. All rights reserved.
                              </p>
                            </td>
                          </tr>

                        </table>
                        <!-- End Card -->

                      </td>
                    </tr>
                  </table>

                </body>
                </html>
                `
            }

            const info = await transporter.sendMail(mailOption)
            console.log("Message sent successfully")
            return info
        } catch (error) {
            console.error("Error while sending mail", error)
        }
    }
}