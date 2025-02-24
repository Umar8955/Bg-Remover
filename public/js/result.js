// Result-specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const resultImage = document.getElementById('resultImage');
  const loading = document.getElementById('loading');
  const storedImage = sessionStorage.getItem('resultImage');

  if (storedImage) {
    loading.style.display = 'block';
    try {
      resultImage.src = storedImage;
      sessionStorage.removeItem('resultImage'); // Clear after displaying
    } catch (error) {
      alert('Error displaying result: ' + error.message);
    } finally {
      loading.style.display = 'none';
    }
  } else {
    alert('No image to display. Please upload an image from the home page.');
  }
});

let resultImageUrl = document.getElementById('resultImage').src || '';

async function showResult(imageData) {
  const resultImage = document.getElementById('resultImage');
  const loading = document.getElementById('loading');
  loading.style.display = 'block';
  try {
    resultImage.src = imageData;
    resultImageUrl = imageData;
  } catch (error) {
    alert('Error displaying result: ' + error.message);
  } finally {
    loading.style.display = 'none';
  }
}

function downloadImage() {
  const loading = document.getElementById('loading');
  loading.style.display = 'block';
  try {
    const link = document.createElement('a');
    link.href = resultImageUrl;
    link.download = 'result_standard.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    alert('Error downloading image: ' + error.message);
  } finally {
    loading.style.display = 'none';
  }
}

function downloadHDImage() {
  const loading = document.getElementById('loading');
  loading.style.display = 'block';
  try {
    const hdCanvas = document.createElement('canvas');
    const ctx = hdCanvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = resultImageUrl;
    img.onload = () => {
      hdCanvas.width = img.width * 4; // Upscale by 4x for HD
      hdCanvas.height = img.height * 4;
      ctx.drawImage(img, 0, 0, hdCanvas.width, hdCanvas.height);
      const hdUrl = hdCanvas.toDataURL('image/png', 1.0); // High quality
      const link = document.createElement('a');
      link.href = hdUrl;
      link.download = 'result_hd.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  } catch (error) {
    alert('Error downloading HD image: ' + error.message);
  } finally {
    loading.style.display = 'none';
  }
}

function applyBackground() {
  alert('Custom background applied! (Functionality to be implemented in custom-bg.js)');
  navigate('/result');
}}
