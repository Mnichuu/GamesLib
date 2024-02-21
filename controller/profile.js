const { queryAsync } = require('./database');
const { profile2Array } = require('./db2array');

async function UserDescriptionEdit(user_name, user_full_name, user_age, user_phone, user_address, user_description, userID) {
    try {
        // pobierant z tablicy wartosc result sluzaca do sprawdzania danych podczas zmiany opisu oraz dwie wartosci wyswietlane w lewym dolnym oknie ekranu profilu
        const result = await queryAsync(`
            SELECT description , nick, profileID, full_name, age, phone, address 
            FROM user_profile WHERE userID = ?`, 
            [userID]);
        const games_number = await queryAsync(`
            SELECT COUNT(*) AS number_of 
            FROM library WHERE userID = ?`, 
            [userID]);
        const is_downloaded = await queryAsync(`
            SELECT COUNT(*) AS games_downloaded 
            FROM library 
            WHERE isDownloaded = 1 AND userID = ?`, 
            [userID]);

        // sprawdzamy czy wartosci podawane przez uzytkownika w opisie nie sa puste, jesli sa to nic nie bedziemy zmieniac

        if(user_name == ""){
            user_name = result[0].nick
        }
        if(user_full_name == ""){
            user_full_name = result[0].full_name
        }
        if(user_age == ''){
            user_age = result[0].age
        }
        if(user_phone == ''){
            user_phone = result[0].phone
        }
        if(user_address == ""){
            user_address = result[0].address
        }
        if(user_description == ""){
            user_description = result[0].description
        }

        // polecenie update aktualizujace tabele user_profile nowymi danymi

        await queryAsync(`
            UPDATE user_profile 
            SET description = ?, nick = ?, full_name = ?, age = ?, phone = ?, address = ? , games_library = ?, games_downloaded = ? 
            WHERE userID = ?`, 
            [user_description, user_name,user_full_name, user_age, user_phone, user_address,games_number[0].number_of, is_downloaded[0].games_downloaded,userID]);

        profile2Array(userID);

        return { status: 200, message: 'User registered!' };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

async function UserProfilePicture(avatar_picture_id, userID) {

    // polecenie update wysylane w sytuacji gdy uzytkownik zmieni swoje zdjecie profilowe

    try {
        await queryAsync(`
            UPDATE user_profile 
            SET profilePhoto = ? 
            WHERE userID = ?`,
            [avatar_picture_id, userID]);

        profile2Array(userID);

        return { status: 200, message: 'Avatar set!' };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    UserDescriptionEdit,
    UserProfilePicture
};