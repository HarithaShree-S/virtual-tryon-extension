<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Anywear AI</title>
  <link rel="stylesheet" href="onboarding.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Welcome to <span>Anywear AI</span></h1>
      <p>Try on clothes from any website in real time using AI</p>
    </header>

    <main class="card">
      <div class="step step-1 active" id="step1">
        <h2>Step 1: Camera Access</h2>
        <p>To render clothing live on your body, Anywear needs temporary access to your camera.</p>
        <div class="camera-preview-container">
          <video id="webcam" autoplay playsinline muted hidden></video>
          <div id="camera-placeholder" class="placeholder">
            <span>Camera Inactive</span>
          </div>
        </div>
        <button id="enable-camera-btn" class="btn primary">Enable Camera Access</button>
      </div>

      <div class="step step-2" id="step2" style="display: none;">
        <h2>Step 2: Try It Out!</h2>
        <p>Your camera feed is live. Select a style to test virtual try-on frame capture:</p>
        <div class="style-options">
          <button class="style-card active">Denim Jacket</button>
          <button class="style-card">Summer Dress</button>
          <button class="style-card">Streetwear Hoodie</button>
        </div>
        <button id="finish-btn" class="btn primary">Start Shopping with Anywear</button>
      </div>
    </main>
  </div>
  <script src="onboarding.js"></script>
</body>
</html>