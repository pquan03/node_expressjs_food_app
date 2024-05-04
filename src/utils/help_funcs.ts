import nodemailer from 'nodemailer';


const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString().substring(0, 6);
}

const checkEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// min: 6, max: 18
const checkPassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
    return passwordRegex.test(password);
}


const sendEmail = async (userEmail: string, message: string) => {
    // create transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        }
    })

    //Define email options
    let mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: userEmail,
        subject: 'Winter Verification Code',
        html: `<h1>Winter Verification Code</h1>
            <p>Your verification code is:</p>
            <h2 style="color: red;" >${message}</h2>
            <p>Please enter this code on the verification page to complete your registration process</p>
            <p>If you did not request this code, please ignore this email</p>
            <p>Thank you!</p>
            <p>Winter Team.</p>`
    } 

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
    } catch(err: any) {
        console.log(`Error: ${err.message}`);
    }

}

export default {
    generateOTP,
    checkEmail,
    checkPassword,
    sendEmail,
}