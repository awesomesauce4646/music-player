var volumeSlider = document.getElementById("volumeSlider");
var nowPlayingText = document.getElementById("nowPlayingText");
var nowPlayingImg = document.getElementById("nowPlayingImg");

var songInfo = {
    moon: {
        text: "On The Moon — Chromaa ft. MIGURIMA",
        img: "images/moon.jpg",
        audio: document.getElementById("moonSong"),
        btnClass: ".moonPlayBtn"
    },
    armed: {
        text: "Armed and Ready — Jeff Williams ft. Casey Lee Williams",
        img: "images/rwby.webp",
        audio: document.getElementById("armedSong"),
        btnClass: ".armedPlayBtn"
    },
    heaven: {
        text: "HEAVEN SAYS — chart",
        img: "images/heavensays.jpg",
        audio: document.getElementById("heavenSong"),
        btnClass: ".heavenPlayBtn"
    },
    otherSide: {
        text: "The Player on The Other Side — Honkai: Star Rail 2.0 OST",
        img: "images/otherSide.webp",
        audio: document.getElementById("otherSideSong"),
        btnClass: ".otherSidePlayBtn"
    }
};

var songOrder = ["moon", "armed", "heaven", "otherSide"];

volumeSlider.addEventListener("input", function () {
    songOrder.forEach(function (name) {
        songInfo[name].audio.volume = this.value;
    }, this);
});

function getSongAudio(name) {
    return songInfo[name].audio;
}

function updateNowPlaying(name) {
    if (name) {
        nowPlayingText.textContent = songInfo[name].text;
        nowPlayingImg.src = songInfo[name].img;
        nowPlayingImg.style.display = "inline-block";
    } else {
        nowPlayingText.textContent = "Nothing playing";
        nowPlayingImg.style.display = "none";
        nowPlayingImg.src = "";
    }
}

function playSongByName(name) {
    songOrder.forEach(function (otherName) {
        if (otherName !== name) {
            var other = songInfo[otherName];
            other.audio.pause();
            other.audio.currentTime = 0;
            document.querySelectorAll(other.btnClass).forEach(function (btn) {
                btn.textContent = "PLAY";
            });
        }
    });

    var current = songInfo[name];
    current.audio.play();
    document.querySelectorAll(current.btnClass).forEach(function (btn) {
        btn.textContent = "PAUSE";
    });

    updateNowPlaying(name);
}

function toggleSong(name) {
    var audio = getSongAudio(name);
    var btnClass = songInfo[name].btnClass;

    if (audio.paused) {
        playSongByName(name);
    } else {
        audio.pause();
        document.querySelectorAll(btnClass).forEach(function (btn) {
            btn.textContent = "PLAY";
        });
        updateNowPlaying(null);
    }
}

function playMoonMusic() {
    toggleSong("moon");
}

function playArmedMusic() {
    toggleSong("armed");
}

function playHeavenMusic() {
    toggleSong("heaven");
}

function playOtherSideMusic() {
    toggleSong("otherSide");
}


function skipCurrentSong() {
    var playlistRows = Array.from(document.querySelectorAll(".playlist .song-row"));
    var playlistOrder = playlistRows.map(function (row) {
        return row.dataset.song;
    });

    if (playlistOrder.length === 0) {
        // nothing in the playlist to skip to
        return;
    }

    var currentIndex = playlistOrder.findIndex(function (name) {
        return !songInfo[name].audio.paused;
    });

    var nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % playlistOrder.length;
    playSongByName(playlistOrder[nextIndex]);
}

function addToPlaylist(button) {
    var row = button.closest(".song-row");
    var clone = row.cloneNode(true);
    clone.dataset.song = row.dataset.song;

    var addBtn = clone.querySelector(".add");
    if (addBtn) {
        addBtn.textContent = "REMOVE";
        addBtn.classList.remove("add");
        addBtn.classList.add("remove");

        addBtn.onclick = function () {
            clone.remove();
            button.disabled = false;
            button.textContent = "ADD";
        };
    }

    document.querySelector(".playlist").appendChild(clone);

    button.disabled = true;
    button.textContent = "ADDED";
}

window.playMoonMusic = playMoonMusic;
window.playArmedMusic = playArmedMusic;
window.playHeavenMusic = playHeavenMusic;
window.playOtherSideMusic = playOtherSideMusic;
window.addToPlaylist = addToPlaylist;
window.skipCurrentSong = skipCurrentSong;