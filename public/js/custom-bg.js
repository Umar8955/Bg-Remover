let selectedBackground = null;

function applyBackground(bgUrl) {
  selectedBackground = bgUrl;
  document.querySelectorAll('.background-item').forEach(item => {
    item.style.borderColor = '#e8e8e8';
  });
  event.target.closest('.background-item').style.borderColor = '#1a73e8';
}

function saveCustomBackground() {
  if (selectedBackground) {
    const resultImage = document.getElementById('resultImage'); // Assume this is from result page
    if (resultImage) {
      resultImage.style.backgroundImage = `url(${selectedBackground})`;
      resultImage.style.backgroundSize = 'cover';
      resultImage.style.backgroundPosition = 'center';
      alert('Custom background applied!');
      navigate('/result');
    } else {
      alert('No result image found. Please go back to the result page.');
    }
  } else {
    alert('Please select a background first.');
  }
}
