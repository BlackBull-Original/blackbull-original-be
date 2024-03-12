import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtppro.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: 'info@cabexpert.co',
    pass: 'K855VHf6SAcW',

  },
} as any);

export const sendMagicLinkService = async (
  firstName: string,
  lastName: string,
  email: string,
  number: string,
  designation: string,
  companyName: string,
  profEmail: string,
  address: string,
) => {

  return new Promise(async (resolve, reject) => {
    const message = {
      from: 'OZI <info@cabexpert.co>',
      to: email,
      subject: 'OZI - Verify Your Account',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Please activate your account</title>
        <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
      </head>
      <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
          <tbody>
            <tr>
              <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                  <tbody>
                    <tr>
                      <td style="padding: 40px 0px 0px;">
                        <div style="text-align: left;">
                        </div>
                        <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                          <div style="color: rgb(0, 0, 0); text-align: left;">
                            <h1 style="margin: 1rem 0">Final step...</h1>
                            <p style="padding-bottom: 16px">Welcome, ${firstName} ${lastName}!</p>
                            <p style="padding-bottom: 16px">You've successfully signed up with OZI.</p>
                            <p style="padding-bottom: 16px">Here are your details:</p>
                            <ul style="padding-bottom: 16px">
                              <li><strong>Email:</strong> ${email}</li>
                              <li><strong>Number:</strong> ${number}</li>
                              <li><strong>Designation:</strong> ${designation}</li>
                              <li><strong>Company Name:</strong> ${companyName}</li>
                              <li><strong>Professional Email:</strong> ${profEmail}</li>
                              <li><strong>Address:</strong> ${address}</li>
                            </ul>
                            <p style="padding-bottom: 16px">If you didn’t ask to verify this address, you can ignore this email.</p>
                            <p style="padding-bottom: 16px">Thanks,<br>The OZI team</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>`
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
