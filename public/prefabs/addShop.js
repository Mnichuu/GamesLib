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
                container.innerHTML += generateGameBlock(gameData);
        });
    }

    function generateGameBlock(gameData) {
        return `
           <div class="game-block">
                <p>
                    <strong>${gameData.name}</strong>
                </p>
            </div>
        `;
    }
})();