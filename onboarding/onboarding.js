document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.getElementById('webcam-feed');
  const canvasElement = document.getElementById('pose-canvas');
  const canvasCtx = canvasElement.getContext('2d');
  const enableCamBtn = document.getElementById('enable-cam-btn');
  const statusOverlay = document.getElementById('camera-status-overlay');

  const urlParams = new URLSearchParams(window.location.search);
  const garmentUrl = urlParams.get('garment');

  let garmentImg = null;
  if (garmentUrl) {
    garmentImg = new Image();
    garmentImg.crossOrigin = 'anonymous';
    garmentImg.src = decodeURIComponent(garmentUrl);
  }

  // Initialize MediaPipe Pose Engine
  const pose = new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  pose.onResults((results) => {
    // Hide overlay status once tracking starts
    if (statusOverlay) statusOverlay.style.display = 'none';

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Draw raw video frame onto canvas
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // Track shoulder and hip landmarks if body detected
    if (results.poseLandmarks && garmentImg && garmentImg.complete) {
      const leftShoulder = results.poseLandmarks[11];  // Landmark 11
      const rightShoulder = results.poseLandmarks[12]; // Landmark 12
      const leftHip = results.poseLandmarks[23];      // Landmark 23

      if (leftShoulder && rightShoulder) {
        // Calculate dynamic shoulder coordinates on screen
        const lsX = leftShoulder.x * canvasElement.width;
        const lsY = leftShoulder.y * canvasElement.height;
        const rsX = rightShoulder.x * canvasElement.width;
        const rsY = rightShoulder.y * canvasElement.height;

        // Calculate body width and tilt angle
        const shoulderWidth = Math.hypot(rsX - lsX, rsY - lsY);
        const garmentWidth = shoulderWidth * 1.8;
        const garmentHeight = garmentWidth * (garmentImg.naturalHeight / garmentImg.naturalWidth);

        const centerX = (lsX + rsX) / 2;
        const centerY = (lsY + rsY) / 2;
        const angle = Math.atan2(rsY - lsY, rsX - lsX);

        // Render garment pinned dynamically to body center
        canvasCtx.translate(centerX, centerY);
        canvasCtx.rotate(angle);
        canvasCtx.drawImage(
          garmentImg,
          -garmentWidth / 2,
          -garmentHeight * 0.15,
          garmentWidth,
          garmentHeight
        );
        canvasCtx.restore();
      }
    } else {
      canvasCtx.restore();
    }
  });

  // Start Camera Stream
  if (enableCamBtn) {
    enableCamBtn.addEventListener('click', async () => {
      try {
        const camera = new Camera(videoElement, {
          onFrame: async () => {
            await pose.send({ image: videoElement });
          },
          width: 640,
          height: 480
        });
        camera.start();
      } catch (err) {
        alert('Camera tracking initialization failed: ' + err.message);
      }
    });
  }
});