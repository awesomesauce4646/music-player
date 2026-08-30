var moonSong = document.getElementById("moonSong");
var armedSong = document.getElementById("armedSong");

function playMoonMusic() {
    var buttons = document.querySelectorAll(".moonPlayBtn");

    if (moonSong.paused) {
        moonSong.play();
        armedSong.pause();
        armedSong.currentTime = 0;
        buttons.forEach(function (btn) {
            btn.textContent = "PAUSE";
        });
    } else {
        moonSong.pause();
        buttons.forEach(function (btn) {
            btn.textContent = "PLAY";
        });
    }
}

function playArmedMusic() {
    var buttons = document.querySelectorAll(".armedPlayBtn");

    if (armedSong.paused) {
        armedSong.play();
        moonSong.pause();
        moonSong.currentTime = 0;
        buttons.forEach(function (btn) {
            btn.textContent = "PAUSE";
        });
    } else {
        armedSong.pause();
        buttons.forEach(function (btn) {
            btn.textContent = "PLAY";
        });
    }
}
function addToPlaylist(button) {
    var row = button.closest(".song-row");
    var clone = row.cloneNode(true);

    var addBtn = clone.querySelector(".add");
    if (addBtn) {
        addBtn.textContent = "REMOVE";
        addBtn.classList.remove("add");
        addBtn.classList.add("remove");

        addBtn.onclick = function () {
            clone.remove();

            // reset the original song list button back to ADD
            button.disabled = false;
            button.textContent = "ADD";
        };
    }

    document.querySelector(".playlist").appendChild(clone);

    // disable the original button so it can't be clicked again
    button.disabled = true;
    button.textContent = "ADDED";
}

window.playMoonMusic = playMoonMusic;
window.playArmedMusic = playArmedMusic;
window.addToPlaylist = addToPlaylist;