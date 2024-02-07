const bcrypt = require("bcryptjs");
const { queryAsync } = require('./database');

async function loginUser(name, password) {
    try {
        const result = await queryAsync('SELECT userID, userTypeID, password FROM user_credentials WHERE login = ?', [name]);

        if (result.length === 0) {
            return { status: 401, message: 'Invalid login credentials' };
        }

        const user = result[0];
        const hashedPassword = user.password;

        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
            return { status: 401, message: 'Invalid login credentials' };
        }

        console.log('User logged in successfully');

        const d = new Date();
        d.setTime(d.getTime() + (30 * 60 * 1000));

        return {
            status: 200,
            message: 'Logged in successfully',
            userID: user.userID,
            userTypeID: user.userTypeID,
            cookies: [
                { name: "userId", value: user.userID, options: { expires: d, path: '/' } },
                { name: "userType", value: user.userTypeID, options: { expires: d, path: '/' } },
                { name: "userName", value: name, options: { expires: d, path: '/' } }
            ]
        };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    loginUser
};