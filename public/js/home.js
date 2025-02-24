// Home-specific JavaScript
async function uploadAndNavigate() {
  const fileInput = document.getElementById('uploadImage');
  if (fileInput?.files.length > 0) {
    await removeBackground(fileInput.files[0]);
    navigate('/result');
  } else {
    alert('Please select an image.');
  }
}

// Assume removeBackground is defined in app.js or another file
