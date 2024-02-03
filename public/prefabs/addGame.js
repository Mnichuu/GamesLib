const PrefabAddGames = (function() {
    return {
        addGames
    };

    function addGames(container, gamesData) {
        if (!container) {
            console.error('Invalid arguments');
            return;
        }

        gamesData.forEach(gameData => {
            if (gameData.userID == User.getUserId()) {
                container.innerHTML += generateGameBlock(gameData);
            }
        });
    }

    function generateGameBlock(gameData) {
        return `
           <div class="game-block">
                <p>
                    <strong>${gameData.name}</strong>
                    ${gameData.isDownloaded == "1" ? 'Pobrane: <span class="material-icons">done</span>' : 'Pobrane: <span class="material-icons">close</span>'}
                </p>
            </div>
        `;
    }
})();