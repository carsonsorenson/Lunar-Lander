MyGame.persistence = (function() {
    let keyBindings = {};
    let previousKeyBindings = localStorage.getItem("Lunarlander.keybindings");

    let scores = [];
    let previousScores = localStorage.getItem("Lunarlander.scores");
    let amountToRemember = 10;

    if (previousKeyBindings !== null) {
        keyBindings = JSON.parse(previousKeyBindings);
    }

    if (previousScores !== null) {
        scores = JSON.parse(previousScores);
    }

    function addKeyBinding(key, value) {
        console.log(key, value);
        keyBindings[key] = value;
        localStorage['Lunarlander.keybindings'] = JSON.stringify(keyBindings);
    }

    function removeKeyBinding(key) {
        delete keyBindings[key];
        localStorage['Lunarlander.keybindings'] = JSON.stringify(keyBindings);
    }

    function addScore(name, score) {
        scores.push({
            name, score
        });
        scores.sort((a, b) => (a.score < b.score) ? 1: -1);
        localStorage['Lunarlander.scores'] = JSON.stringify(scores);
        if (scores.length > amountToRemember) {
            removeScore();
        }
    }

    function removeScore() {
        scores.splice(scores.length - 1, 1);
        localStorage['Lunarlander.scores'] = JSON.stringify(scores);
    }

    return {
        get keyBindings() {return keyBindings},
        addKeyBinding,
        removeKeyBinding,
        addScore
    }
}());