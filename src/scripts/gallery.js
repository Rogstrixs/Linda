document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const target = event.target.getAttribute('href');
        document.querySelector(target).scrollIntoView({ behavior: 'mooth' });
    });
});


// Get all the images in the gallery
const images = document.querySelectorAll('.gallery-container img');

// Add an event listener to each image
images.forEach(image => {
  image.addEventListener('click', event => {
    // Get the clicked image
    const clickedImage = event.target;

    // Create a full-screen overlay
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    document.body.appendChild(overlay);

    // Create a full-screen image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'fullscreen-image-container';
    overlay.appendChild(imageContainer);

    // Create a full-screen image
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = clickedImage.src;
    fullScreenImage.alt = clickedImage.alt;
    imageContainer.appendChild(fullScreenImage);

    // Add zoom functionality
    let zoomLevel = 1;
    let startX, startY, startZoom;

    fullScreenImage.addEventListener('wheel', event => {
      event.preventDefault();
      if (event.deltaY > 0) {
        zoomLevel += 0.1;
      } else {
        zoomLevel -= 0.1;
      }
      fullScreenImage.style.transform = `scale(${zoomLevel})`;
    });

    fullScreenImage.addEventListener('mousedown', event => {
      startX = event.clientX;
      startY = event.clientY;
      startZoom = zoomLevel;
    });

    fullScreenImage.addEventListener('mousemove', event => {
      if (event.buttons === 1) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        zoomLevel = startZoom + (deltaX + deltaY) / 100;
        fullScreenImage.style.transform = `scale(${zoomLevel})`;
      }
    });

    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = 'Close';
    overlay.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
      overlay.remove();
    });
  });
});