document.addEventListener("DOMContentLoaded", function() {
    // Get all the video elements
    const videos = document.querySelectorAll(".movie-video");

    function togglePlay(videoElement) {
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    }

    // Add event listeners to each video element
    videos.forEach(video => {
        video.muted = true; // Ensure the video is muted

        video.addEventListener("mouseover", function() {
            // Play the video when mouse is over it
            video.play();
        });

        video.addEventListener("mouseout", function() {
            // Pause the video when mouse leaves
            video.pause();
            video.currentTime = 0;
        });

        video.addEventListener("click", function(event) {
            if (!document.fullscreenElement) { // If video is not in fullscreen
                // Switch to the full movie URL
                const fullMovieURL = video.getAttribute("data-fullmovie");
                video.src = fullMovieURL;
                
                video.controls = true; // Show video controls
                video.play();

                if (video.requestFullscreen) { // Standard
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) { // IE/Edge
                    video.msRequestFullscreen();
                }
            } else {
                event.preventDefault(); // Prevent the browser's default click-to-pause behavior
                togglePlay(video); // Toggle play/pause if in fullscreen
            }
        });
    });
    
    // Pause video when exiting fullscreen mode
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            let videos = document.querySelectorAll('.movie-video');
            videos.forEach(function(video) {
                video.pause();
            });
        }
    });
});
