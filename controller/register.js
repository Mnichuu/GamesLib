const bcrypt = require("bcryptjs");
const { queryAsync } = require('./database');

async function registerUser(name, email, password, password_confirm) {
    try {
        const result = await queryAsync('SELECT login FROM user_credentials WHERE login = ?', [name]);

    // sprawdzamy czy email ktory chcemy zarejestrowac nie jest juz w uzytku
        if (result.length > 0) {
            return { status: 403, message: 'This email is already in use' };
        } else if (password !== password_confirm) {
            return { status: 403, message: 'Passwords do not match!' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const basic_description = "I am a USER!"
        const basic_photo = "0"
        const basic_name = "John Doe"
        const basic_phone = 123123123
        const basic_age = 111
        const basic_address = "Noland"

        // dodawanie do tablicy user_credentials nowego usera podczas rejestracji

        await queryAsync(`
            INSERT INTO user_credentials (login, email, password, userTypeID) 
            VALUES (?, ?, ?, 3)`, 
            [name, email, hashedPassword]);
        const user_ID =  await queryAsync(`
            SELECT userID 
            FROM user_credentials 
            WHERE email = ?`,
            [email]);

        // dodanie do tablicy user_profile nowego usera o bazowych danych

        await queryAsync(`
            INSERT INTO user_profile 
            (description, nick, profilePhoto, full_name,age,phone,address,userID,games_library,games_downloaded) 
            VALUES  (?, ?, ?, ?, ?, ?, ?, ?,0 ,0)`, 
            [basic_description, name, basic_photo,basic_name,basic_age, basic_phone, basic_address,user_ID[0].userID]);

        return { status: 200, message: 'User registered!' };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    registerUser
};