document.addEventListener('DOMContentLoaded', () => {
  const cameraVideo = document.getElementById('webcam-feed');
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

  if (enableCamBtn) {
    enableCamBtn.addEventListener('click', async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (cameraVideo) {
          cameraVideo.srcObject = stream;
        }
        if (statusOverlay) {
          statusOverlay.style.display = 'none';
        }

        startInteractiveTryOn(cameraVideo, garmentImg);
      } catch (err) {
        alert('Camera access failed: ' + err.message);
      }
    });
  }
});

function startInteractiveTryOn(videoElement, garmentImage) {
  let container = videoElement.parentElement;
  container.style.position = 'relative';

  let garmentOverlay = document.getElementById('garment-overlay-img');
  if (!garmentOverlay && garmentImage) {
    garmentOverlay = document.createElement('img');
    garmentOverlay.id = 'garment-overlay-img';
    garmentOverlay.src = garmentImage.src;

    // Solid rendering styling
    Object.assign(garmentOverlay.style, {
      position: 'absolute',
      top: '40%',
      left: '25%',
      width: '50%',
      cursor: 'grab',
      opacity: '1',            // 100% solid opacity
      mixBlendMode: 'normal',   // Disables any transparency blending
      filter: 'none',           // Clears any filters
      border: 'none',
      zIndex: '10'
    });

    // Dragging logic
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    garmentOverlay.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = garmentOverlay.offsetLeft;
      initialTop = garmentOverlay.offsetTop;
      garmentOverlay.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      garmentOverlay.style.left = `${initialLeft + dx}px`;
      garmentOverlay.style.top = `${initialTop + dy}px`;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      if (garmentOverlay) garmentOverlay.style.cursor = 'grab';
    });

    // Scroll wheel resizing
    container.addEventListener('wheel', (e) => {
      if (e.target === garmentOverlay) {
        e.preventDefault();
        let currentWidth = parseFloat(garmentOverlay.style.width) || 50;
        let newWidth = e.deltaY < 0 ? currentWidth + 3 : currentWidth - 3;
        if (newWidth > 20 && newWidth < 90) {
          garmentOverlay.style.width = `${newWidth}%`;
        }
      }
    }, { passive: false });

    container.appendChild(garmentOverlay);
  }
}