function playMoonMusic() {
    var song = document.getElementById("moonSong");
    
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }
}

function playMagnetMusic() {
    var song = document.getElementById("magnetSong");
    
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }
}

window.playMoonMusic = playMoonMusic;
window.playMagnetMusic = playMagnetMusic;
