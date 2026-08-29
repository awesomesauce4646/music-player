var moonSong = document.getElementById("moonSong");
var armedSong = document.getElementById("armedSong");


function playMoonMusic() {
    
    if (moonSong.paused) {
        moonSong.play();
        armedSong.pause();
        armedSong.currentTime = 0;
    } else {
        moonSong.pause();
    }
}

function playArmedMusic() {
    
    if (armedSong.paused) {
        armedSong.play();
        moonSong.pause();
        moonSong.currentTime = 0;
    } else {
        armedSong.pause();
    }
}

window.playMoonMusic = playMoonMusic;
window.playArmedMusic = playArmedMusic;
