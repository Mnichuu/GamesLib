const PrefabVerificatorList = (function() {
    return {
        addGames2Verification
    };

    function addGames2Verification(container, gamesData) {
        if (!container || !Array.isArray(gamesData)) {
            console.error('Invalid arguments');
            return;
        }

            for (let i = 0; i < gamesData.length; i++) {
                if(gamesData[i].verified == 0) {
                    container.innerHTML += generateGameBlock(gamesData[i], i);
                }


            }
    }

    function generateGameBlock(gameData, i) {
        let num = i;
        return `
               <div class="verification-game-block">
                    <div>
                         <p>
                            <strong>${gameData.name}</strong>
                            <input type="hidden" name="name" value="${gameData.name}" >
                            <details>
                                <summary class="button3" class="add-to-library-btn">
                                    Szczegóły
                                </summary>
                                <p>${gameData.description}</p>
                            </details>
                             <div class="form">
                                <form action="/verify-game" method="POST">
                                    <input type="hidden" name="name" value="${gameData.name}">
                                    <button class="button1" class="add-to-library-btn" data-name="${gameData.name}" data-description="${gameData.description}">
                                        Zatwierdź
                                    </button>
                                </form>
                            </div>
                        </p>
                    </div>
                </div>
            `;
    }
})();
