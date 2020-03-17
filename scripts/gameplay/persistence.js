MyGame.persistence = (function() {
    let keyBindings = {};
    let previousKeyBindings = localStorage.getItem("Lunarlander.keybindings");

    let scores = [];
    let previousScores = localStorage.getItem("Lunarlander.scores");
    let amountToRemember = 5;

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

    function canAddScore(score) {
        if (scores.length < amountToRemember) {
            return true;
        }
        else if (score > scores[scores.length - 1].score) {
            return true;
        }
        return false;
    }

    function updateScores() {
        let myNode = document.getElementById("highScoreList");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        for (let i = 0; i < scores.length; i++) {
            let node = document.createElement("li");
            let name = scores[i].name;
            let score = scores[i].score;
            let s = `${i+1}: ${name}: ${score}`;
            let text = document.createTextNode(s);
            node.appendChild(text);
            document.getElementById("highScoreList").appendChild(node);
        }
    }

    return {
        get keyBindings() {return keyBindings},
        get scores() { return scores},
        addKeyBinding,
        removeKeyBinding,
        addScore,
        canAddScore,
        updateScores
    }
}());