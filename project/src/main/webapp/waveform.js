var wavesurfer;

window.onload = function() {

    wavesurfer = WaveSurfer.create({
        container: document.getElementById("wave-container"),
        scrollParent: true,
        waveColor : 'red',
        progressColor: 'purple',
    });

    wavesurfer.load('gtr-jazz-3.mp3');
}

function playPause() {
    wavesurfer.playPause();
}
