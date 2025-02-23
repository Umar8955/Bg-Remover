function navigate(path) {
  window.location.href = `https://umar-e792c.web.app${path}`;
  // یا لوکل ٹیسٹنگ کے لیے:
  // window.location.href = `http://localhost:5000${path}`;
}

function uploadAndNavigate() {
  const fileInput = document.getElementById('uploadImage');
  if (fileInput?.files.length > 0) {
    removeBackground(fileInput.files[0]).then(() => {
      navigate('/result'); // رزلٹ پیج پر جائیں
    });
  } else {
    alert('Please select an image.');
  }
}

function setCustomBackgroundAndNavigate() {
  const fileInput = document.getElementById('customBgImage');
  if (fileInput?.files.length > 0) {
    setCustomBackground(fileInput.files[0]);
    navigate('/custom-bg'); // کسٹم بیک گراونڈ پیج پر جائیں
  } else {
    alert('Please select a background image.');
  }
}

function logoutAndNavigate() {
  logout();
  navigate('/'); // ہوم پیج پر واپس جائیں
}

function loadResultImage() {
  const result = localStorage.getItem('lastResult');
  if (result) {
    document.getElementById('resultImage')?.src = result;
  }
}

function loadCustomBackground() {
  const customBg = localStorage.getItem('customBackground');
  if (customBg) {
    document.getElementById('customResultImage')?.src = customBg;
  }
}
