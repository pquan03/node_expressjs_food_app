
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

export default {
    generateOTP,
    checkEmail,
    checkPassword,
}