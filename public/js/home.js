// Home-specific JavaScript
async function uploadAndShowLoading() {
  const fileInput = document.getElementById('uploadImage');
  const loading = document.getElementById('loading');
  
  // Trigger file input click when Upload Image button is clicked
  fileInput.click();

  fileInput.onchange = async () => {
    if (fileInput.files.length > 0) {
      loading.style.display = 'block'; // Show loading animation
      try {
        const imageFile = fileInput.files[0];
        const processedImage = await removeBackground(imageFile); // Process image with U-Net
        // Store the processed image URL or data in sessionStorage
        sessionStorage.setItem('resultImage', processedImage);
        navigate('/result'); // Navigate to result page
      } catch (error) {
        alert('Error removing background: ' + error.message);
      } finally {
        loading.style.display = 'none'; // Hide loading animation
      }
    } else {
      alert('Please select an image.');
    }
  };
}

// Assume removeBackground is defined in app.js or another file, returning the processed image URL or data
