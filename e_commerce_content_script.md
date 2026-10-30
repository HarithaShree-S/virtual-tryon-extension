// Inject floating Anywear action button on web pages
(function initAnywearOverlay() {
  const button = document.createElement('div');
  button.id = 'anywear-floating-btn';
  button.innerText = '✨ Try On with Anywear';

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
    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
    cursor: 'pointer',
    fontFamily: 'sans-serif'
  });

  button.addEventListener('click', () => {
    // Basic image extraction logic
    const images = Array.from(document.querySelectorAll('img')).map(img => img.src);
    console.log('Extracted page images for virtual try-on processing:', images);
    alert('Anywear AI initialized! Extracted ' + images.length + ' image resources from page.');
  });

  document.body.appendChild(button);
})();