const PrefabGenerateUser = (function () {
    return {
        addUserProfiles
    };

    function addUserProfiles(container, userData) {
        if (!container || !userData) {
            console.error('Invalid arguments');
            return;
        }

        userData.forEach(userData => {
            if (userData.userID == User.getUserId()) {
                container.innerHTML += generateUser(userData, userData.userID);
            }
        });

        container.addEventListener('click', function (event) {
            if (event.target.classList.contains('edit-button')) {
                showEditPopup(event.target);
            }
        });
    }

    function generateUser(userData, userId) {
        const username = userData.nick || 'Brak nazwy użytkownika';
        const imageFile = `../../values/images/avatar0.png`;

        return `
 <div class="card">
          <div class="left-containers">
              <div class="left-container_1">
                <h2 class="gradienttext">John Doe</h2>
                <p>Web Developer</p>
              </div>
              <div class="left-container_2">
                <h2 class="gradienttext">John Doe</h2>
                <p>Web Developer</p>
              </div>
          </div>
      <div class="right-container">
        <h3 class="gradienttext">Profile Details</h3>
        <table>
        
              <tr>
                    <td>Name :</td>
                    <td>John Doe</td>
              </tr>
              <tr>
                    <td>Age :</td>
                    <td>35</td>
              </tr>
              <tr>
                    <td>Mobile :</td>
                    <td>+91 XXXXXXXXXX</td>
              </tr>
              <tr>
                    <td>Email :</td>
                    <td>john@example.com</td>
              </tr>
              <tr>
                    <td>Address :</td>
                    <td>123 Main St, Anytown, USA</td>
              </tr>
        </table>
      </div>
</div>

        `;
    }

    function showEditPopup(editButton) {
        const usernameElement = editButton.closest('.user-profile-block').querySelector('.username');
        const currentUsername = usernameElement.textContent;

        let newUsername = prompt('Podaj nową nazwę użytkownika (maksymalnie 15 znaków):', currentUsername);

        if (newUsername !== null) {
            // Ogranicz długość do 15 znaków
            newUsername = newUsername.trim().slice(0, 15);

            // Wywołaj funkcję updateUsername, aby zaktualizować nazwę użytkownika na serwerze
            updateUsername(newUsername, User.getUserId());

            // Zaktualizuj widok użytkownika
            usernameElement.textContent = newUsername;
        }
    }

})();
