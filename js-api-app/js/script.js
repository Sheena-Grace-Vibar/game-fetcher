document.addEventListener('DOMContentLoaded', () => {
    let navToggle = document.querySelector("#mobile .fa-bars");
    let nav = document.querySelector("#mobile nav");
    let platformToggle = document.querySelector("#mobile .platform");
    let platformList = document.querySelector("#mobile #platform-list");
// Mobile Toggling
    function resetToggles() {
        if (platformList.classList.contains("show")) {
            platformList.classList.remove("show");
            platformToggle.innerHTML = `Platform <i class="fa-solid fa-caret-down"></i>`;
        }
    };

    if (navToggle) {
        navToggle.addEventListener("click", function() {
            nav.classList.toggle("show");
            if (!nav.classList.contains("show")) {
                resetToggles();
            }
        });
    };

    if (platformToggle) {
        platformToggle.addEventListener("click", function() {
            platformList.classList.toggle("show");
            if (platformList.classList.contains("show")) {
                platformToggle.innerHTML = `Platform <i class="fa-solid fa-caret-up"></i>`;
            } else {
                platformToggle.innerHTML = `Platform <i class="fa-solid fa-caret-down"></i>`;
            }
        });
    }
// Fetching the API
    async function fetchGames() {
    const url = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.freetogame.com/api/games');
        try {
            const response = await fetch(url);
            if (response.ok) {
                try {
                    const data = await response.json();
                    const games = JSON.parse(data.contents);
                    window.gamesList = games;
                    console.log("Successfully fetched the games!");
                } catch (parseError) {
                    console.error("Failed to parse the games JSON: ", parseError);
                    const mainContent = document.getElementById('main-content');
                    mainContent.innerHTML = "Cannot retrieve the games due to unstable fetching of API. Kindly keep on refreshing the page until it works but do not spam the refresh. It just needs some refreshing. :)";
                }
            } else {
                console.error("Failed to retrieve games: ", response.statusText);
                const mainContent = document.getElementById('main-content');
                mainContent.innerHTML = "Cannot retrieve the games due to unstable fetching of API. Kindly keep on refreshing the page until it works but do not spam the refresh. It just needs some refreshing. :)";
            }
        } catch (fetchError) {
            console.error("Fetching failed: ", fetchError);
        }
    }


// Windows PC Based Games Filtering
    document.querySelectorAll('.windows-pc').forEach(element => {
        element.addEventListener('click', function() {
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = '';
            try {
                window.gamesList.filter(game => game.platform.includes('PC (Windows)')).forEach((game) => {
                    if (game.thumbnail && game.title && game.game_url) {
                        const gameArticle = document.createElement('article');
                        const thumbnailImg = document.createElement('img');
                        thumbnailImg.src = game.thumbnail;
                        thumbnailImg.alt = game.title;
                        const gameTitle = document.createElement('h2');
                        gameTitle.textContent = game.title;
                        gameArticle.appendChild(thumbnailImg);
                        gameArticle.appendChild(gameTitle);
                        gameArticle.addEventListener('click', () => {
                            window.open(game.game_url, '_blank');
                        });
                        mainContent.appendChild(gameArticle);
                    } else {
                        console.error(`Game missing thumbnail, title, or game_url: ${game}`);
                    }
                });
            } catch(error) {
                const mainContent = document.getElementById('main-content');
                mainContent.innerHTML = "Cannot retrieve the games due to unstable fetching of API. Kindly keep on refreshing the page until it works but do not spam the refresh. It just needs some refreshing. :)";
            }
        });
    });
// Web Browser Based Games Filtering
    document.querySelectorAll('.web-browser').forEach(element => {
        element.addEventListener('click', function() {
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = '';
            try {
                window.gamesList.filter(game => game.platform.includes('Web Browser')).forEach((game) => {
                    if (game.thumbnail && game.title && game.game_url) {
                        const gameArticle = document.createElement('article');
                        const thumbnailImg = document.createElement('img');
                        thumbnailImg.src = game.thumbnail;
                        thumbnailImg.alt = game.title;
                        const gameTitle = document.createElement('h2');
                        gameTitle.textContent = game.title;
                        gameArticle.appendChild(thumbnailImg);
                        gameArticle.appendChild(gameTitle);
                        gameArticle.addEventListener('click', () => {
                            window.open(game.game_url, '_blank');
                        });
                        mainContent.appendChild(gameArticle);
                    } else {
                        console.error(`Game missing thumbnail, title, or game_url: ${game}`);
                    }
                });
            } catch(error) {
                const mainContent = document.getElementById('main-content');
                mainContent.innerHTML = "Cannot retrieve the games due to unstable fetching of API. Kindly keep on refreshing the page until it works but do not spam the refresh. It just needs some refreshing. :)";
            }
        });
    });
// Search Bar Function
    document.querySelectorAll("#search-bar").forEach(searchBar => {
        searchBar.addEventListener('keypress', async function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                let query = searchBar.value.trim();
                const results = window.gamesList.filter(game => game.title.toLowerCase().includes(query.toLowerCase()));
                const mainContent = document.getElementById('main-content');
                mainContent.innerHTML = '';

                if (results.length === 0) {
                    mainContent.innerHTML = '<strong>Game cannot be found.</strong> Make sure the spelling is correct and try again.';
                } else {
                    results.forEach((game) => {
                        if (game.thumbnail && game.title && game.game_url) {
                            const gameArticle = document.createElement('article');
                            gameArticle.addEventListener('click', () => {
                                window.open(game.game_url, '_blank');
                            });
                            const thumbnailImg = document.createElement('img');
                            thumbnailImg.src = game.thumbnail;
                            thumbnailImg.alt = game.title;
                            const gameTitle = document.createElement('h2');
                            gameTitle.textContent = game.title;
                            const gamePlatform = document.createElement('p');
                            gamePlatform.style.textAlign = 'left';
                            gamePlatform.style.paddingLeft = '10px';
                            gamePlatform.innerHTML = '<strong>Platform:</strong> ' + game.platform;
                            const gamePublisher = document.createElement('p');
                            gamePublisher.style.textAlign = 'left';
                            gamePublisher.style.paddingLeft = '10px';
                            gamePublisher.innerHTML = '<strong>Publisher:</strong> ' + game.publisher;
                            const gameReleaseDate = document.createElement('p');
                            gameReleaseDate.style.textAlign = 'left';
                            gameReleaseDate.style.paddingLeft = '10px';
                            gameReleaseDate.innerHTML = '<strong>Release Date: </strong> ' + game.release_date;
                            const gameDescription = document.createElement('p');
                            gameDescription.style.textAlign = 'left';
                            gameDescription.style.paddingLeft = '10px';
                            gameDescription.innerHTML = '<strong>Description:</strong> ' + game.short_description;
                            gameArticle.appendChild(thumbnailImg);
                            gameArticle.appendChild(gameTitle);
                            gameArticle.appendChild(gamePlatform);
                            gameArticle.appendChild(gamePublisher);
                            gameArticle.appendChild(gameReleaseDate);
                            gameArticle.appendChild(gameDescription);
                            mainContent.appendChild(gameArticle);
                        } else {
                            console.error(`Failed to fetch the game: ${game}`);
                        }
                    });
                }
            }
        });
    });

    fetchGames();
});
