
  const imagesToLoad2 = document.querySelectorAll('img[data-src]');

  const loadImages2 = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
      image.removeAttribute('data-src');
    };
  };

  if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            loadImages2(item.target);
            observer.unobserve(item.target);
          }
        });
      });
      imagesToLoad2.forEach((img) => {
        observer.observe(img);
      });
    } else {
      imagesToLoad2.forEach((img) => {
        loadImages2(img);
      });
  }

  