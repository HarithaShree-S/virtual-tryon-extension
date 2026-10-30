// Open onboarding page when extension is installed
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding/onboarding.html') });
  }
});

// Open dressing room when extension toolbar icon is clicked
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('onboarding/onboarding.html') });
});

// Listen for messages from content.js
chrome.runtime.onMessage.addListener((request) => {
  // Option 1: Open dressing room directly
  if (request.action === 'OPEN_DRESSING_ROOM') {
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding/onboarding.html') });
  }

  // Option 2: Open dressing room with chosen garment image URL
  if (request.action === 'START_TRYON' && request.garmentUrl) {
    const targetUrl = chrome.runtime.getURL(
      `onboarding/onboarding.html?garment=${encodeURIComponent(request.garmentUrl)}`
    );
    chrome.tabs.create({ url: targetUrl });
  }
});