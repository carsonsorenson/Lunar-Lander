MyGame.objects.sound = function(spec) {
    let sound = new Audio();
    sound.src = spec.audioSrc;
    return sound;

}