// ... (موجودہ کوڈ برقرار رکھیں)

// رزلٹ دکھانے کے بعد نیویگیشن
function displayResult(result) {
  const resultImage = document.createElement('img');
  resultImage.src = result;
  document.getElementById('resultImage')?.src = result;
  localStorage.setItem('lastResult', result); // رزلٹ محفوظ کریں
  navigate('/result'); // رزلٹ پیج پر جائیں
}

// کسٹم بیک گراونڈ سیٹ کرنے کے بعد نیویگیشن
function setCustomBackground(bgImageFile) {
  const resultImage = document.getElementById('resultImage')?.src || localStorage.getItem('lastResult');
  if (resultImage && bgImageFile) {
    const combined = combineImages(resultImage, bgImageFile);
    document.getElementById('customResultImage')?.src = combined;
    localStorage.setItem('customBackground', combined); // کسٹم بیک گراونڈ محفوظ کریں
    navigate('/custom-bg'); // کسٹم بیک گراونڈ پیج پر جائیں
  }
}
