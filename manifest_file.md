{
  "manifest_version": 3,
  "name": "Anywear AI - Virtual Try-On",
  "version": "1.0.0",
  "description": "Real-time AI virtual try-on browser extension for e-commerce shopping.",
  "permissions": [
    "activeTab",
    "storage",
    "scripting"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "background": {
    "service_worker": "scripts/background.js"
  },
  "action": {
    "default_popup": "popup/popup.html",
    "default_title": "Anywear AI Try-On"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["scripts/content.js"],
      "run_at": "document_idle"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": [
        "onboarding/onboarding.html",
        "assets/*"
      ],
      "matches": ["<all_urls>"]
    }
  ]
}