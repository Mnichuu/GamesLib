const bcrypt = require("bcryptjs");
const { queryAsync } = require('./database');

async function UserDescriptionEdit(user_name, user_full_name, user_age, user_phone, user_address, user_description, email) {
    try {
        const basic_photo = "user.jpg"
        await queryAsync('UPDATE user_profile SET description = ?, nick = ?, profilePhoto = ?, full_name = ?, age = ?, phone = ?, address = ? WHERE email = ?', [user_description, user_name, basic_photo,user_full_name, user_age, user_phone, user_address,email]);
        await queryAsync('UPDATE user_credentials SET login = ? WHERE email = ?', [user_name, email]);
        return { status: 200, message: 'User registered!' };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    UserDescriptionEdit
};