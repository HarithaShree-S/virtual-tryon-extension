:root {
  --bg-color: #0f172a;
  --card-bg: #1e293b;
  --accent-color: #6366f1;
  --accent-hover: #4f46e5;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-main);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 540px;
  padding: 24px;
}

header {
  text-align: center;
  margin-bottom: 24px;
}

header h1 span {
  color: var(--accent-color);
}

.card {
  background-color: var(--card-bg);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.camera-preview-container {
  width: 100%;
  height: 280px;
  background: #020617;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  border: 2px dashed #334155;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  color: var(--text-muted);
}

.btn {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn.primary {
  background-color: var(--accent-color);
  color: white;
}

.btn.primary:hover {
  background-color: var(--accent-hover);
}

.style-options {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}

.style-card {
  flex: 1;
  padding: 12px;
  background: #334155;
  border: 1px solid #475569;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.style-card.active {
  border-color: var(--accent-color);
  background: rgba(99, 102, 241, 0.2);
}