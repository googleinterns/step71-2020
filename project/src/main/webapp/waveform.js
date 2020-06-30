window.onload = function() {

    var wavesurfer = WaveSurfer.create({
        container: document.getElementById("wave-container"),
        scrollParent: true
    });

    wavesurfer.load('gtr-jazz-3.mp3');
}
