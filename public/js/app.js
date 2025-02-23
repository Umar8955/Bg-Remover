// Background Removal with TensorFlow.js (U-Net)
async function loadBackgroundRemovalModel() {
    const model = await tf.loadLayersModel('path/to/unet_model/model.json');
    return model;
}

async function removeBackground(image) {
    const model = await loadBackgroundRemovalModel();
    const tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([256, 256])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

    const prediction = model.predict(tensor);
    const mask = prediction.squeeze().dataSync();

    const canvas = document.getElementById('resultCanvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const alpha = mask[i / 4] > 0.5 ? 255 : 0; // Threshold for foreground/background
        data[i + 3] = alpha; // Set alpha channel
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

// Image Upload and Processing
document.querySelector('.upload-btn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        const img = new Image();
        const reader = new FileReader();
        
        reader.onload = (event) => {
            img.src = event.target.result;
            img.onload = async () => {
                showLoading();
                const processedImage = await removeBackground(img);
                hideLoading();
                localStorage.setItem('uploadedImage', processedImage.toDataURL());
                window.location.href = 'result.html';
            };
        };
        reader.readAsDataURL(file);
    };
    input.click();
});

// Loading Animation
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Custom Background Application
function applyBackground(bgUrl) {
    localStorage.setItem('customBackground', bgUrl);
    window.location.href = 'result.html';
}
