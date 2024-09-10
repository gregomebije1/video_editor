document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const trimButton = document.getElementById('trim');

    video.addEventListener('play', () => {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the current video frame onto the canvas
        const drawFrame = () => {
            if (video.paused || video.ended) return;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
        };
        drawFrame();
    });

    trimButton.addEventListener('click', () => {
        // Stop the video playback
        video.pause();

        // Create a new video element for the trimmed video
        const trimmedVideo = document.createElement('video');
        const trimmedSource = document.createElement('source');
        trimmedSource.src = canvas.toDataURL('video/mp4'); // Note: This will not work as expected for actual video files
        trimmedVideo.appendChild(trimmedSource);
        document.body.appendChild(trimmedVideo);
        trimmedVideo.controls = true;
        trimmedVideo.play();
    });
});
