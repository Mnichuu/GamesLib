const bcrypt = require("bcryptjs");
const { queryAsync } = require('./database');
const { news2Array, 
    profile2Array } = require('./db2array');

async function loginUser(name, password) {
    try {
        const result = await queryAsync(`
        SELECT UC.userID, UC.userTypeID, UC.password, UP.nick 
        FROM user_credentials AS UC
        JOIN user_profile AS UP ON UC.userID = UP.userID
        WHERE login = ?`, 
        [name]);

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

        news2Array(user.userID);
        profile2Array(user.userID);

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
                { name: "userName", value: name, options: { expires: d, path: '/' } },
                { name: "userNick", value: user.nick, options: { expires: d, path: '/' } }
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