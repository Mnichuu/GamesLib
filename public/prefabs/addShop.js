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
        if(!isLoggedIn) {
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

        return `
           <div class="game-block">
                <p>
                    <strong>${gameData.name}</strong>
                </p>
                <details>
                    <summary>Toggle Description</summary>
                    <p>${gameData.description}</p>
                </details>
                <button class="add-to-library-btn" data-gameid="${gameData.gameID}" data-isdownloaded="${gameData.isDownloaded}">
                    Add to Library
                </button>
            </div>
        `;
    }
})();