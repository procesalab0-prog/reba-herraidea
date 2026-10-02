(() => {
  const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (motion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
  const navigation = document.querySelector('.navigation');
  const progress = document.querySelector('.progress');
  let scheduled = false;
  function update() {
    const height = document.documentElement.scrollHeight - innerHeight;
    navigation.classList.toggle('scrolled', scrollY > 50);
    progress.style.width = `${height > 0 ? scrollY / height * 100 : 0}%`;
    scheduled = false;
  }
  addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  addEventListener('resize', update);
  update();
})();
