MyGame.screens['controls'] = (function(game) {
    if (!('left' in MyGame.persistence.keyBindings)) {
        MyGame.persistence.addKeyBinding('left', 'ArrowLeft');
        MyGame.persistence.addKeyBinding('right', 'ArrowRight');
        MyGame.persistence.addKeyBinding('thrust', 'ArrowUp');
    }

    let alerted = false;

    let buttons = {
        left: {
            row: document.getElementById("rotLeftRow"),
            key: document.getElementById("rotLeft"),
            active: false,
        },
        right: {
            row: document.getElementById("rotRightRow"),
            key: document.getElementById("rotRight"),
            active: false
        },
        thrust: {
            row: document.getElementById("thrustRow"),
            key: document.getElementById("thrust"),
            active: false
        },
    };

    function removeActives() {
        for (let button in buttons) {
            buttons[button].row.classList.remove('active');
            buttons[button].active = false;
        }
    }

    function changeBinding(element, curButton) {
        element.classList.add('active');
        buttons[curButton].active = true;
    }

    function onKeyPress(e) {
        for (let button in buttons) {
            if (buttons[button].active) {
                MyGame.persistence.addKeyBinding(button, e.key);
                buttons[button].key.innerHTML = e.key;
            }
        }
    }

    function initialize() {
        document.addEventListener("keydown", onKeyPress);
        document.getElementById("controlsBack").addEventListener(
            'click', function() {
                removeActives();
                game.showScreen('mainMenu');
            }
        )

        for (let button in buttons) {
            buttons[button].row.classList.remove('active');
            buttons[button].row.addEventListener(
                'click', function() {
                    if (!alerted) {
                        alert("Press any key to change key binding")
                        alerted = true;
                    }
                    removeActives();
                    changeBinding(this, button);
                }
            )
            buttons[button].key.innerHTML = MyGame.persistence.keyBindings[button];
        }
    }

    function run() {
    };

    return {
        initialize,
        run
    }
}(MyGame.game));