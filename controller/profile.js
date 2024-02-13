const bcrypt = require("bcryptjs");
const { queryAsync } = require('./database');

async function UserDescriptionEdit(user_name, user_full_name, user_age, user_phone, user_address, user_description, userID) {
    try {
        const basic_photo = "user.jpg"
        console.log(userID)
        await queryAsync('UPDATE user_profile SET description = ?, nick = ?, profilePhoto = ?, full_name = ?, age = ?, phone = ?, address = ? WHERE userID = ?', [user_description, user_name, basic_photo,user_full_name, user_age, user_phone, user_address,userID]);
        return { status: 200, message: 'User registered!' };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    UserDescriptionEdit
};