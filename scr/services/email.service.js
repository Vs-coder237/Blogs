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
                subject: "Hello",
                text: "Hello World?",
                html: `<h1>Welcome to our plateform</h1>
                <h1>hello ${name}</h1>
                <p>We are delighted to have you join our community</p>
                `
            }
            const info = await transporter.sendMail(mailOption)
            console.log("message sent successfully")
            return info
        } catch (error) {
            console.error("Error while sending mail", error)
        }
    } 
}