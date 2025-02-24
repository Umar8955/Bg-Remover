function downloadResult() {
  const resultImage = document.getElementById('resultImage').src;
  const link = document.createElement('a');
  link.href = resultImage;
  link.download = 'result.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
