document.addEventListener('DOMContentLoaded', () => {
    const sideMenu = document.getElementById('sideMenu');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeBtn = sideMenu.querySelector('.close-btn');
    const uploadBtn = document.querySelector('.enhanced-upload-btn');
    const fileInput = document.getElementById('uploadImage');
    const sampleImages = document.querySelectorAll('.sample-image');
    const menuLinks = sideMenu.querySelectorAll('.list-group-item a');

    // Hamburger toggle
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        sideMenu.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        sideMenu.classList.remove('open');
    });

    // Upload handler
    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async () => {
        try {
            if (!fileInput.files.length) return;
            const file = fileInput.files[0];
            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image');
                return;
            }
            uploadBtn.textContent = 'Processing...';
            uploadBtn.disabled = true;
            const reader = new FileReader();
            reader.onload = (event) => {
                window.location.href = `/result?image=${encodeURIComponent(event.target.result)}`;
            };
            reader.onerror = () => {
                alert('Error reading file');
                uploadBtn.textContent = '+ Upload Image';
                uploadBtn.disabled = false;
            };
            reader.readAsDataURL(file);
        } catch (error) {
            alert('An error occurred');
            uploadBtn.textContent = '+ Upload Image';
            uploadBtn.disabled = false;
        }
    });

    // Sample images
    sampleImages.forEach(img => {
        img.addEventListener('click', () => {
            const filename = img.dataset.sample;
            img.style.opacity = '0.7';
            setTimeout(() => {
                window.location.href = `/result?image=${filename}`;
            }, 200);
        });
    });

    // Sidebar navigation
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            link.parentElement.style.background = '#ced4da';
            setTimeout(() => {
                alert(`Navigating to ${page}`); // Replace with window.location.href = page;
                link.parentElement.style.background = '';
                hamburgerBtn.classList.remove('active');
                sideMenu.classList.remove('open');
            }, 400);
        });
    });

    // Click outside
    document.addEventListener('click', (e) => {
        if (!sideMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && sideMenu.classList.contains('open')) {
            hamburgerBtn.classList.remove('active');
            sideMenu.classList.remove('open');
        }
    });
});
