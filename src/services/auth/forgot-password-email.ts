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

export const forgotPasswodSendMagicLinkService = async (
    email: string,
    resetLink: string
) => {

    console.log("resetLink", { resetLink })

    return new Promise(async (resolve, reject) => {
        const message = {
            from: 'OZI <info@cabexpert.co>',
            to: email,
            subject: 'OZI - Reset Your Password',
            html: `<p>You have requested to reset your password. Click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
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
