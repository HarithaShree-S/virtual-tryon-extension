# Anywear Clone - AI Virtual Try-On Browser Extension

An open-source browser extension inspired by Decart's Anywear for real-time AI-powered virtual try-on across e-commerce platforms.

## Project Structure

```text
anywear-extension/
├── manifest.json              # Extension Manifest V3 configuration
├── popup/                     # Toolbar popup UI
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── onboarding/                # Onboarding workflow & permission setup
│   ├── onboarding.html
│   ├── onboarding.css
│   └── onboarding.js
├── scripts/
│   ├── background.js          # Service worker for API calls & state
│   └── content.js             # E-commerce DOM injector & image scraper
├── assets/                    # Extension icons and UI graphics
│   └── icon128.png
└── server/                    # Local mock server for testing WebSockets/AI
    ├── app.py
    └── requirements.txt
```

---

## Quickstart Guide

### 1. Load Extension in Chrome / Edge / Brave

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/anywear-extension.git
   cd anywear-extension
   ```
2. Open your browser and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the root directory of this project (`anywear-extension`).
5. The extension will automatically launch the **Onboarding Page** on first install.

---

## Development Plan

- [x] **Phase 1:** Manifest V3 setup & Onboarding UI flow
- [x] **Phase 2:** WebRTC Camera Feed & Pose/Frame Capture logic
- [ ] **Phase 3:** Content Script E-commerce DOM Scraping & Try-On Overlay
- [ ] **Phase 4:** WebSocket Real-Time AI Generation Server integration
- [ ] **Phase 5:** Multi-platform garment extraction & production build

---

## Features

- **Automated Onboarding:** Seamlessly guides users through media permissions and feature showcase upon installation.
- **WebRTC Camera Integration:** Live video capture with real-time canvas frame extraction.
- **E-Commerce DOM Injection:** Overlays a try-on widget on detected product pages.
