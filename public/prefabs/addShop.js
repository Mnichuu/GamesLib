const PrefabAddNews = (function() {
    return {
        addNews
    };

    function addNews(container, gamesData) {
        if (!container) {
            console.error('Invalid arguments');
            return;
        }

        gamesData.forEach(gameData => {
                container.innerHTML += generateGameBlock(gameData, User.isLogged());
        });
    }

    function generateGameBlock(gameData, isLoggedIn) {
        if(!isLoggedIn || User.getUserType() == 2) {
            return `
            <div class="game-block">
                    <p>
                        <strong>${gameData.name}</strong>
                    </p>
                    <details>
                        <summary>Toggle Description</summary>
                        <p>${gameData.description}</p>
                    </details>
                </div>
            `;
        }

        if(User.getUserType() == 1) {
            return `
            <div class="game-block">
                    <p>
                        <strong>${gameData.name}</strong>
                    </p>
                    <details>
                        <summary>Toggle Description</summary>
                        <p>${gameData.description}</p>
                    </details>
                    <form class="add-to-verification" action="/add-game-verification" method="POST">
                    <input type="hidden" name="gameID" value="${gameData.gameID}">
                    <button class="add-to-verification-btn" data-gameid="${gameData.gameID}">
                        Verify again
                    </button>
                </form>
                </div>
            `
        }

        let text = 'Add to Library';
        let action = "/add-game-library";
        if (gameData.isDownloaded == null) {
            text = 'Add to Library';
            action = "/add-game-library";
        } else {
            text = 'In Library';
            action = "/auth/yourGames";
        }

        return `
           <div class="game-block">
                <p>
                    <strong>${gameData.name}</strong>
                </p>
                <details>
                    <summary>Toggle Description</summary>
                    <p>${gameData.description}</p>
                </details>
                <form class="add-to-library" action="${action}" method="POST">
                    <input type="hidden" name="gameID" value="${gameData.gameID}">
                    <button class="add-to-library-btn" data-gameid="${gameData.gameID}" data-isdownloaded="${gameData.isDownloaded}">
                        ${text}
                    </button>
                </form>
            </div>
        `;
    }
})();