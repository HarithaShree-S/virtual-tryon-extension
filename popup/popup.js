document.addEventListener('DOMContentLoaded', () => {
  const statusBadge = document.getElementById('status-badge');
  const cameraStatus = document.getElementById('camera-status');
  const openOnboardingBtn = document.getElementById('open-onboarding-btn');
  const triggerTryonBtn = document.getElementById('trigger-tryon-btn');
  const helpLink = document.getElementById('help-link');

  // Check current permission & user status from storage via background worker
  chrome.runtime.sendMessage({ action: 'GET_USER_STATUS' }, (response) => {
    if (chrome.runtime.lastError) {
      // Fallback directly to storage if background script didn't respond
      chrome.storage.local.get(['permissionsGranted'], (res) => {
        updateUI(res && res.permissionsGranted);
      });
      return;
    }

    const isGranted = response && response.status && response.status.permissionsGranted;
    updateUI(isGranted);
  });

  function updateUI(granted) {
    if (granted) {
      statusBadge.textContent = 'Active';
      statusBadge.classList.add('ready');
      cameraStatus.textContent = 'Ready (Calibrated)';
      cameraStatus.style.color = '#10b981';
    } else {
      statusBadge.textContent = 'Setup Needed';
      statusBadge.classList.remove('ready');
      cameraStatus.textContent = 'Needs Calibration';
      cameraStatus.style.color = '#f59e0b';
    }
  }

  // Open the onboarding page
  openOnboardingBtn.addEventListener('click', () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('onboarding/onboarding.html')
    });
  });

  // Trigger scan on current page
  triggerTryonBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.id) return;

      // Execute scan action directly in the active tab
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const btn = document.getElementById('anywear-floating-btn');
          if (btn) {
            btn.click();
          } else {
            const images = Array.from(document.querySelectorAll('img')).map(img => img.src);
            alert(`Anywear AI: Found ${images.length} images on this page.`);
          }
        }
      });
    } catch (err) {
      console.error('Failed to trigger scan on active tab:', err);
    }
  });

  helpLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({
      url: chrome.runtime.getURL('onboarding/onboarding.html')
    });
  });
});
