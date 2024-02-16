const PrefabGenerateUser = (function () {
    return {
        addUserProfiles
    };

    function addUserProfiles(container, userData) {
        userData.forEach(userData => {
            if (userData.userID == User.getUserId()) {
                container.innerHTML += generateUser(userData, userData.userID);

                // Kod dla pierwszego przycisku
                document.querySelectorAll('.btn.btn-primary').forEach(button => {
                    button.addEventListener('click', () => {
                        showPopup(userData); // Funkcja do wyświetlania okna popup
                    });
                });

                document.querySelectorAll('.button2').forEach(button => {
                    button.addEventListener('click', () => {
                        showPopup_avatar(userData); // Funkcja do wyświetlania okna popup dla drugiego przycisku
                    });
                });

            }
        });

    }

    function generateUser(userData, userId) {
        const username = userData.nick || 'Brak nazwy użytkownika';
        const full_name = userData.full_name;
        const age = userData.age;
        const phone = userData.phone;
        const address = userData.address;
        const description = userData.description;
        const avatarIndex = userData.profilePhoto;

        return `
        <div class="card">
            <div class="left-containers">
                <div class="left-container_1">
                    <img src="/images/avatar${avatarIndex}.png" alt="Avatar" width="250" height="250">
                    <button_avatar type="button" class="button2" id="editButton">Change Profile Photo</button_avatar>
                </div>
                <div class="left-container_2">
                </div>
            </div>
            <div class="right-container">
                <h3 class="gradienttext">Profile Details</h3>
                <table>
                    <tr>
                        <td>Username :</td>
                        <td>${username}</td>
                    </tr>
                     <tr>
                        <td>Full Name :</td>
                        <td>${full_name}</td>
                    </tr>
                    <tr>
                        <td>Age :</td>
                        <td>${age}</td>
                    </tr>
                    <tr>
                        <td>Mobile :</td>
                        <td>${phone}</td>
                    </tr>
                    <tr>
                        <td>Address :</td>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <td>Description :</td>
                        <td>${description}</td>
                    </tr>
                </table>
                   <button type="button" class="btn btn-primary" id="editButton">Edit</button>
            </div>
        </div>
    `;
    }

    function showPopup(userData) {
        // Create a container div for the popup
        const popupContainer = document.createElement('div');
        const username = userData.nick;
        const full_name = userData.full_name;
        const age = userData.age;
        const phone = userData.phone;
        const address = userData.address;
        const description = userData.description;
        const userID = userData. userID;
        popupContainer.className = 'popup-container';

        // Create the form HTML
        popupContainer.innerHTML = `
        <div class="description_container">  
           
            <form id="contact" action="/auth/profile" method="post">
            <h4>Edit Your Information</h4>
                
                <fieldset>
                    <input placeholder="Nick (max 25 characters): ${username}" type="text" tabindex="1"  name="user_name" maxlength="25">
                </fieldset>
                <fieldset>
                    <input placeholder="Name & Surname (max 50 characters): ${full_name}" type="text"  tabindex="2" name="user_full_name" maxlength="50">
                </fieldset>
                <fieldset>
                        <input placeholder="Age : ${age}" type="number" tabindex="3" name="user_age" max="999" title="Please enter a valid age (up to 999)">
                </fieldset>
                <fieldset>
                    <input placeholder="Your Phone Number (+48) : ${phone}" type="text" tabindex="5" name="user_phone" pattern="[0-9]{9}" title="Please enter a valid phone number" >
                </fieldset>
                <fieldset>
                    <input placeholder="Address (max 50 characters): ${address}" type="text" tabindex="6"  autofocus name="user_address" maxlength="50">
                </fieldset>
                <fieldset>
                    <textarea placeholder="Add profile description (max 250 characters): ${description}" tabindex="7" name="user_description" maxlength="250"></textarea>
                </fieldset>
                <fieldset>
                    <input type="hidden" name="userID" value="${userID}">
                </fieldset>
                <fieldset>
                    <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Save Info</button>
                </fieldset>
            </form>
        </div>
`;
        document.body.appendChild(popupContainer);

    }

    function showPopup_avatar(userData) {
        const userID = userData.userID;
        const popupContainer_2 = document.createElement('div_2');
        popupContainer_2.className = 'popup-container_2';

        // Create the form HTML
        popupContainer_2.innerHTML = `
        <div class="description_container_2">  
            
                <h4>Change Profile Picture</h4>    
                <div class="avatar-container">
                    ${generateAvatarButtons(userData)}
                </div> </div>
                
           
        </div>
    `;

        document.body.appendChild(popupContainer_2);
    }


    function generateAvatarButtons(userData) {
        let avatarButtonsHTML = '';
        const userID = userData.userID;
        for (let row = 0; row < 6; row++) {
            avatarButtonsHTML += '<div class="avatar-row">';

            for (let col = 0; col < 5; col++) {
                const avatarIndex = row * 5 + col;
                avatarButtonsHTML += `
            <form id="contact" action="/auth/avatar" method="post">
                <button class="avatar-button">
                <input type="hidden" name="avatar_picture_id" value="${avatarIndex}">           
                <input type="hidden" name="userID" value="${userID}">
                    <img src="/images/avatar${avatarIndex}.png" alt="Avatar ${avatarIndex}" ">                  
                </button>
                    
            </form>
            `;
            }
            avatarButtonsHTML += '</div>';
        }

        return avatarButtonsHTML;
    }

})();