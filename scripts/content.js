(function initAnywearPicker() {
  if (document.getElementById('anywear-floating-btn')) return;

  const button = document.createElement('div');
  button.id = 'anywear-floating-btn';
  button.innerText = '✨ Select Item to Try On';

  Object.assign(button.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: '999999',
    padding: '12px 20px',
    backgroundColor: '#6366f1',
    color: '#ffffff',
    fontWeight: 'bold',
    borderRadius: '30px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    fontFamily: 'sans-serif'
  });

  let pickerActive = false;

  button.addEventListener('click', () => {
    if (pickerActive) return;
    pickerActive = true;
    button.innerText = '👇 Click any photo on the page...';
    button.style.backgroundColor = '#ef4444';

    const handleMouseOver = (e) => {
      if (e.target && e.target.tagName === 'IMG') {
        e.target.style.outline = '4px solid #6366f1';
        e.target.style.cursor = 'pointer';
      }
    };

    const handleMouseOut = (e) => {
      if (e.target && e.target.tagName === 'IMG') {
        e.target.style.outline = 'none';
      }
    };

    const handleImageClick = (e) => {
      if (e.target && e.target.tagName === 'IMG' && e.target.src) {
        e.preventDefault();
        e.stopPropagation();

        const garmentUrl = e.target.src;

        document.removeEventListener('mouseover', handleMouseOver, true);
        document.removeEventListener('mouseout', handleMouseOut, true);
        document.removeEventListener('click', handleImageClick, true);
        e.target.style.outline = 'none';

        button.innerText = '✨ Select Item to Try On';
        button.style.backgroundColor = '#6366f1';
        pickerActive = false;

        // Safely check runtime connection before sending
        try {
          if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
            chrome.runtime.sendMessage({
              action: 'START_TRYON',
              garmentUrl: garmentUrl
            }, () => {
              if (chrome.runtime.lastError) {
                alert('Connection lost. Please refresh this webpage and try again.');
              }
            });
          } else {
            alert('Extension reloaded. Please refresh this webpage!');
          }
        } catch (err) {
          alert('Please refresh this webpage to reconnect to the extension.');
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    document.addEventListener('click', handleImageClick, true);
  });

  document.body.appendChild(button);
})();