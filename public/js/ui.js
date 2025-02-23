// Canvas for Manual Editing
const canvas = document.getElementById('resultCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// OpenCV.js for Image Processing
cv['onRuntimeInitialized'] = () => {
    console.log('OpenCV.js loaded');
};

// Navigation Bar Button Drag and Drop
let draggedBtn = null;
const buttons = document.querySelectorAll('.button');

buttons.forEach(btn => {
    btn.addEventListener('dragstart', (e) => {
        draggedBtn = e.target;
        e.dataTransfer.setData('text/plain', '');
    });

    btn.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    btn.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedBtn !== e.target) {
            const btnContainer = document.getElementById('buttonContainer');
            const draggedIndex = Array.from(btnContainer.children).indexOf(draggedBtn);
            const droppedIndex = Array.from(btnContainer.children).indexOf(e.target);
            if (draggedIndex !== -1 && droppedIndex !== -1) {
                if (draggedIndex < droppedIndex) {
                    e.target.parentNode.insertBefore(draggedBtn, e.target.nextSibling);
                } else {
                    e.target.parentNode.insertBefore(draggedBtn, e.target);
                }
            }
        }
    });
});

// Download Functions
function downloadImage() {
    const canvas = document.getElementById('resultCanvas');
    const link = document.createElement('a');
    link.download = 'background-removed.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function downloadHD() {
    const canvas = document.getElementById('resultCanvas');
    canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.download = 'background-removed-hd.png';
        link.href = URL.createObjectURL(blob);
        link.click();
    }, 'image/png', 1.0); // High quality
}

// Load Custom Background
window.onload = function() {
    const customBg = localStorage.getItem('customBackground');
    if (customBg) {
        document.getElementById('customBackground').src = customBg;
        document.getElementById('customBackground').style.display = 'block';
    }
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        const img = new Image();
        img.src = uploadedImage;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }
    showLoading();
    setTimeout(hideLoading, 2000); // Simulate processing
};

// Dummy Extra Actions
function extraAction1() {
    alert("Extra Action 1 triggered!");
}

function extraAction2() {
    alert("Extra Action 2 triggered!");
}
