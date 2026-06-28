// Optional JS for any dynamic behaviour.
// CSS Scroll Snapping handles the core swipe experience natively.

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.slide');
  
  // Example: Track which slide is active via IntersectionObserver
  const observerOptions = {
    root: container,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when a slide is 50% visible
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const content = entry.target.querySelector('.content');
      if (entry.isIntersecting) {
        // Apply animation only when entering view
        content.style.animation = 'fadeIn 0.8s ease-out forwards';
      } else {
        // Reset animation when out of view
        content.style.animation = 'none';
        content.style.opacity = '0';
      }
    });
  }, observerOptions);
  
  slides.forEach(slide => observer.observe(slide));
  
  // Interactive button on last slide
  const button = document.querySelector('.cta-button');
  if (button) {
    button.addEventListener('click', () => {
      alert('Get Started clicked!');
      // Could also reset carousel back to start:
      // container.scrollTo({ left: 0, behavior: 'smooth' });
    });
  }
});
