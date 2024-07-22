// JavaScript
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', handleClick);
  });
  
  function handleClick(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    document.querySelector(target).scrollIntoView({ behavior: 'mooth' });
  }
  
  const images = document.querySelectorAll('.gallery-container img');
  
  images.forEach(image => {
    image.addEventListener('click', handleImageClick);
  });
  
  function handleImageClick(event) {
    const clickedImage = event.target;
    const overlay = createOverlay();
    const imageContainer = createImageContainer();
    const fullScreenImage = createFullScreenImage(clickedImage);
    imageContainer.appendChild(fullScreenImage);
    overlay.appendChild(imageContainer);
    document.body.appendChild(overlay);
    addZoomFunctionality(fullScreenImage);
    addCloseButton(overlay);
  }
  
  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    return overlay;
  }
  
  function createImageContainer() {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'fullscreen-image-container';
    return imageContainer;
  }
  
  function createFullScreenImage(image) {
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = image.src;
    fullScreenImage.alt = image.alt;
    return fullScreenImage;
  }
  
  function addZoomFunctionality(image) {
    let zoomLevel = 1;
    let startX, startY, startZoom;
  
    image.addEventListener('wheel', handleWheel);
    image.addEventListener('mousedown', handleMouseDown);
    image.addEventListener('mousemove', handleMouseMove);
  
    function handleWheel(event) {
      event.preventDefault();
      if (event.deltaY > 0) {
        zoomLevel += 0.1;
      } else {
        zoomLevel -= 0.1;
      }
      image.style.transform = `scale(${zoomLevel})`;
    }
  
    function handleMouseDown(event) {
      startX = event.clientX;
      startY = event.clientY;
      startZoom = zoomLevel;
    }
  
    function handleMouseMove(event) {
      if (event.which === 1) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        zoomLevel = startZoom + (deltaX + deltaY) / 100;
        image.style.transform = `scale(${zoomLevel})`;
      }
    }
  }
  
  function addCloseButton(overlay) {
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = 'Close';
    overlay.appendChild(closeButton);
  
    closeButton.addEventListener('click', () => {
      overlay.remove();
    });
  }