// Listener for extension installation to launch the onboarding page
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('onboarding/onboarding.html')
    });
  }
});

// Listener for communication between content scripts, onboarding, and background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'GET_USER_STATUS') {
    chrome.storage.local.get(['permissionsGranted', 'userPreferences'], (result) => {
      sendResponse({ status: result });
    });
    return true; // Keep channel open for async response
  }

  if (request.action === 'SAVE_PERMISSIONS') {
    chrome.storage.local.set({ permissionsGranted: request.value }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});