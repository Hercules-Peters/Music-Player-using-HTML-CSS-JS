let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'assest/image/music12.jpg',
        name: 'somewhere only we know rhianne cover_720pHF',
        artist: 'by Rhianne',
        music: 'assest/music/y2mate.com - somewhere only we know rhianne cover_720pHF.mp3'
    },
    {
        img: 'assest/image/music12.jpg',
        name: 'So Much Pain Remix',
        artist: 'Eminem, Halsey',
        music: 'assest/music/y2mate.com - Eminem Halsey So Much Pain Remix by Liam_480p.mp3'
    },
    {
        img: 'assest/image/music12.jpg',
        name: 'Search Rescue Official Visualizer',
        artist: 'Drake',
        music: 'assest/music/y2mate.com - Drake Search Rescue Official Visualizer_720pFH.mp3'
    },
    {
        img: 'assest/image/music12.jpg',
        name: 'Careless Whisper Magic Cover',
        artist: 'Besomage',
        music: 'assest/music/y2mate.com - Besomage Careless Whisper Magic Cover Release_720pFHR.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }

    let Color1 = populate('#');
    let Color2 = populate('#');
    let angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ',' + Color2 + ")";
    document.body.style.background = gradient;
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (isRandom) {
        track_index = Math.floor(Math.random() * music_list.length);
    } else {
        if (track_index < music_list.length - 1) {
            track_index += 1;
        } else {
            track_index = 0;
        }
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (isRandom) {
        track_index = Math.floor(Math.random() * music_list.length);
    } else {
        if (track_index > 0) {
            track_index -= 1;
        } else {
            track_index = music_list.length - 1;
        }
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const volumeToggle = document.getElementById('volume-toggle');
    const volumeSlider = document.querySelector('.volume_slider');

    // Toggle volume slider visibility
    volumeToggle.addEventListener('click', () => {
        if (volumeSlider.style.display === 'none' || volumeSlider.style.display === '') {
            volumeSlider.style.display = 'block';
        } else {
            volumeSlider.style.display = 'none';
        }
    });

    // Event listeners for controls
    playpause_btn.addEventListener('click', playpauseTrack);
    next_btn.addEventListener('click', nextTrack);
    prev_btn.addEventListener('click', prevTrack);
    seek_slider.addEventListener('input', seekTo);
    volume_slider.addEventListener('input', setVolume);
    randomIcon.addEventListener('click', randomTrack);
});
