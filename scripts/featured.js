const FeaturedGames = {
    games: [
        { name: 'Fortnite', icon: 'fa-solid fa-crosshairs', url: 'pages/player.html?type=game&title=Fortnite&url=https://nowgg.fun/apps/aptoide/5874/aptoide.html?deep_link=aptoidesearch://com.epicgames.fortnite' },
        { name: 'Games', icon: 'fa-solid fa-gamepad', url: 'pages/games.html' },
        { name: 'Movies', icon: 'fa-solid fa-film', url: 'pages/movies.html' },
        { name: 'TalonAI', icon: 'fa-solid fa-robot', url: 'pages/chat.html' },
        { name: 'Music', icon: 'fa-solid fa-music', url: 'pages/music.html' },
        { name: 'Roblox', icon: 'fa-solid fa-cubes', url: 'pages/player.html?type=game&title=Roblox&url=https://nowgg.fun/apps/aptoide/5874/aptoide.html?deep_link=aptoidesearch://roblox.com.roblox' },
        { name: 'Settings', icon: 'fa-solid fa-cog', url: 'pages/settings.html' },
        { name: 'Geometry Dash', gameName: 'Geometry Dash Lite (REMAKE)' },
        { name: 'Retro Bowl', gameName: 'Retro Bowl' },
        { name: 'OvO', gameName: 'Ovofixed', img: 'https://cdn.jsdelivr.net/gh/gn-math/covers@main/1.png', bgColor: 'var(--surface-hover)' },
        { name: 'Basket Random', gameName: 'Basket Random' },
        { name: 'Code Runner', icon: 'fa-solid fa-code', url: 'pages/code.html' }
    ],

    async load() {
        try {
            let allGames = [];
            
            // 1. Improved Gloader/Fetch logic with proper error boundaries
            if (window.Gloader && typeof window.Gloader.load === 'function') {
                allGames = await window.Gloader.load('multi');
            } else {
                const response = await fetch("https://cdn.jsdelivr.net/gh/gn-math/assets@latest/zones.json");
                if (!response.ok) throw new Error("Failed to fetch zones.json");
                
                const data = await response.json();
                allGames = data.map(g => {
                    const rawName = g.name || g.title || "";
                    return {
                        name: rawName.replace(/\.html$|-a\.html$/i, '').replace(/[-_]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').trim(),
                        url: (g.url || g.file || "").replace('{HTML_URL}', "https://cdn.jsdelivr.net/gh/gn-math/html@main").replace('-a.html', '.html'),
                        img: `https://cdn.jsdelivr.net/gh/gn-math/assets@latest/images/${rawName.replace(/\.html$|-a\.html$/i, '').toLowerCase().replace(/\s+/g, '-')}.png`
                    };
                });
            }

            // 2. Optimized matching and preloading
            const preloads = this.games.map(async (g) => {
                if (!g.gameName) return;

                const searchKey = g.gameName.toLowerCase().replace(/[^a-z0-9]/g, '');
                
                // Find game by normalized name or exact name
                const targetGame = allGames.find(game => {
                    const gameNameRaw = (game.name || "").toLowerCase().replace(/[^a-z0-9]/g, '');
                    return (game.normalized === searchKey) || (gameNameRaw === searchKey) || (gameNameRaw.includes(searchKey));
                });

                if (targetGame && targetGame.url) {
                    g.url = `pages/player.html?type=game&title=${encodeURIComponent(g.name)}&url=${encodeURIComponent(targetGame.url)}`;
                    g.img = g.img || targetGame.img;
                    
                    // Preload Image safely
                    if (g.img) {
                        const img = new Image();
                        img.src = g.img;
                    }
                } else {
                    // Fallback URL if game is not found in the list
                    g.url = `pages/games.html?gamename=${encodeURIComponent(g.gameName)}`;
                    if (!g.icon) g.icon = 'fa-solid fa-gamepad';
                }
            });

            await Promise.all(preloads);
        } catch (err) {
            console.error("FeaturedGames Load Error:", err);
            // Emergency fallback for all items with a gameName
            this.games.forEach(g => {
                if (g.gameName && !g.url) {
                    g.url = `pages/games.html?gamename=${encodeURIComponent(g.gameName)}`;
                    g.icon = 'fa-solid fa-gamepad';
                }
            });
        }
    }
};

window.FeaturedGames = FeaturedGames;
