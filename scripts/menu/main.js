MyGame.game = (function(screens) {
    let activeScreen;
    let body = document.getElementsByTagName("body")[0];

    function centerBody() {
        body.style.display = "flex";
    }

    function clearStyle() {
        body.style.display = "block";
    }

    function showScreen(id) {
        let active = document.getElementsByClassName('active');
        for (let i = 0; i < active.length; i++) {
            active[i].classList.remove('active');
        }

        if (activeScreen == 'gameplay') {
            centerBody();
        }
        activeScreen = id;
        if (activeScreen == 'gameplay') {
            clearStyle();
        }
        screens[id].run();
        document.getElementById(id).classList.add('active');
    }

    function resize() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        h > w ? s = w : s = h;
        width = s * 0.8;
        let height = s * 0.95;
        document.getElementById('menuing').style.width = `${width}px`;
        document.getElementById('menuing').style.height = `${height}px`;
        document.getElementById('menuing').style["font-size"] = `${width / 20}px`;
    }

    function initialize() {
        window.addEventListener('resize', resize);
        resize();

        let screen = null;
        for (screen in screens) {
            if (screens.hasOwnProperty(screen)) {
                screens[screen].initialize();
            }
        }
        showScreen('mainMenu');
    }

    return {
        initialize,
        showScreen
    }

}(MyGame.screens));