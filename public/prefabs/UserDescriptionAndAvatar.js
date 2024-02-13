const PrefabGenerateUser = (function () {
    return {
        addUserProfiles
    };

    function addUserProfiles(container, userData) {
        userData.forEach(userData => {
            if (userData.profileID == User.getUserId()) {
                container.innerHTML += generateUser(userData, userData.profileID);

                document.querySelectorAll('.btn.btn-primary').forEach(button => {
                    button.addEventListener('click', () => {
                        showPopup(userData); // Function to display the popup
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
        const email = userData.email;
        const address = userData.address;
        const description = userData.description;
        const imageFile = `../../values/images/avatar0.png`;

        return `
        <div class="card">
            <div class="left-containers">
                <div class="left-container_1">
                    <h2 class="gradienttext">${username}</h2>
                    
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
                        <td>Email :</td>
                        <td>${email}</td>
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
        const email = userData.email;
        popupContainer.className = 'popup-container';

        // Create the form HTML
        popupContainer.innerHTML = `
        <div class="description_container">  
           
            <form id="contact" action="/auth/profile" method="post">
            <h4>Edit Your Information</h4>
                
                <fieldset>
                    <input placeholder="Nick : ${username}" type="text" tabindex="1" required autofocus name="user_name">
                </fieldset>
                <fieldset>
                    <input placeholder="Name & Surname : ${full_name}" type="text" required autofocus tabindex="2" name="user_full_name">
                </fieldset>
                <fieldset>
                    <input placeholder="Age : ${age}" type="number" tabindex="3" required  name="user_age">
                </fieldset>
                <fieldset>
                    <input placeholder="Your Phone Number : ${phone}" type="tel" required tabindex="5"  name="user_phone">
                </fieldset>
                <fieldset>
                    <input placeholder="Address : ${address}" type="text" tabindex="6" required autofocus name="user_address">
                </fieldset>
                <fieldset>
                    <textarea placeholder="Add profile description.... : ${description}"  tabindex="7" required name="user_description" ></textarea >
                </fieldset>
                <fieldset>
                    <input type="hidden" name="email" value="${email}">
                </fieldset>
                <fieldset>
                    <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Save Info</button>
                </fieldset>
            </form>
        </div>
`;
        document.body.appendChild(popupContainer);

    }


})();