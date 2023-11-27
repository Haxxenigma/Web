const videoPlayer = document.getElementById('video-player');
const videoSources = ['https://cdn.pixabay.com/vimeo/183788677/test-tubes-5451.mp4?width=640&hash=f84faca526903eb9f4fced97ac4d91e48c700200', 'https://cdn.pixabay.com/vimeo/183788693/microscope-5456.mp4?width=640&hash=f1215c3122f1bc1421a065367748881d68c93fa5', 'https://cdn.pixabay.com/vimeo/454879738/computer-48702.mp4?width=1280&hash=f6e8fdc72163501b0f930c99d2991b4268a2e05c'];

let currentVideoIndex = 0;

function changeVideo(direction) {
    if (direction === 'prev') {
        currentVideoIndex = (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
    }
    else if (direction === 'next') {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    }

    videoPlayer.src = videoSources[currentVideoIndex];
    // videoPlayer.load();
    // videoPlayer.play();
}