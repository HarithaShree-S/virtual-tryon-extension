document.addEventListener('DOMContentLoaded', () => {
  const enableCamBtn = document.getElementById('enable-camera-btn');
  const webcamVideo = document.getElementById('webcam');
  const placeholder = document.getElementById('camera-placeholder');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const finishBtn = document.getElementById('finish-btn');

  enableCamBtn.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });

      webcamVideo.srcObject = stream;
      webcamVideo.hidden = false;
      placeholder.style.display = 'none';

      // Save permission status
      chrome.runtime.sendMessage({ action: 'SAVE_PERMISSIONS', value: true });

      // Move to Step 2
      setTimeout(() => {
        step1.style.display = 'none';
        step2.style.display = 'block';
      }, 1200);

    } catch (err) {
      console.error('Camera permission denied or error:', err);
      alert('Camera access is required for real-time virtual try-on.');
    }
  });

  finishBtn.addEventListener('click', () => {
    alert('Setup complete! Go to any e-commerce product page to start trying on items.');
    window.close();
  });
});