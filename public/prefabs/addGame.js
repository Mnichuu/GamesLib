const PrefabAddGames = (function () {
    return {
        addGames
    };

    function addGames(container, gamesData) {
        if (!container) {
            console.error('Invalid arguments');
            return;
        }

        gamesData.forEach(gameData => {
            container.innerHTML += generateGameBlock(gameData);
        });
    }

    function generateDownloadBlock(gameData) {
        return `<div class="form">
                    <form action="/download-game" method="POST">
                        <input type="hidden" name="gameID" value=${gameData.gameID}>
                        <button class="add-to-library-btn" data-name= ${gameData.gameID}>
                            Pobierz 
                        </button>
                    </form>
                </div>
        `;
    }

    function generateDownloadedBlock(gameData) {
        return `<div class="form">
                    <form>
                        <input type="hidden" name="gameID" value=${gameData.gameID}>
                        <button class="add-to-library-btn" data-name= ${gameData.gameID}>
                            Pobrane 
                        </button>
                    </form>
                </div>
        `;
    }
    function generateGameBlock(gameData) {
        return `
           <div class="game-block">
                <p>
                    <strong>${gameData.name}</strong>
                    ${gameData.isDownloaded == "1" ? 'Pobrane: <span class="material-icons">done</span>' + generateDownloadedBlock(gameData) : 'Pobrane: <span class="material-icons">close</span>' + generateDownloadBlock(gameData)}
                </p>
            </div>
        `;
    }
})();