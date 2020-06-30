window.onload = function() {

    var wavesurfer = WaveSurfer.create({
        container: document.getElementById("wave-container"),
        scrollParent: true
    });

    wavesurfer.load('audio.wav');
}
