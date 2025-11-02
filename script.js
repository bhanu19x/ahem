// Basic interactivity & heart cursor
document.addEventListener('DOMContentLoaded', () => {
  // page navigation from index
  const continueBtn = document.getElementById('continueBtn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      window.location.href = 'photos.html';
    });
  }

  // audio controls
  const audio = document.getElementById('bgAudio');
  const playBtn = document.getElementById('playPause');
  if (playBtn && audio) {
    // update label based on state
    function updateLabel(){
      playBtn.textContent = audio.paused ? 'Play Music ▶️' : 'Pause Music ⏸️';
    }
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(()=>{/* autoplay may be blocked; user click triggered so ok */});
      } else audio.pause();
      updateLabel();
    });
    updateLabel();
    // try to play (autoplay often blocked so it's fine if it doesn't)
    // audio.play().catch(()=>{});
  }

  // reveal button
  const revealBtn = document.getElementById('revealBtn');
  const revealArea = document.getElementById('revealArea');
  if (revealBtn && revealArea){
    revealBtn.addEventListener('click', ()=>{
      revealArea.classList.toggle('show');
      playConfetti();
      revealBtn.style.display = 'none';
    });
  }

  // simple confetti (hearts) burst
  function playConfetti(){
    const container = document.getElementById('hearts-layer');
    for(let i=0;i<24;i++){
      const el = document.createElement('div');
      el.className = 'float-heart';
      el.style.left = (10 + Math.random()*80) + '%';
      el.style.top = (40 + Math.random()*20) + '%';
      el.style.opacity = Math.random()*0.9 + 0.1;
      el.style.transform = `translateY(${Math.random()*20}px) rotate(${Math.random()*360}deg) scale(${0.6 + Math.random()*0.9})`;
      el.innerHTML = '💗';
      container.appendChild(el);
      // animate out
      setTimeout(()=> {
        el.style.transition = 'all 1600ms ease-out';
        el.style.transform = `translateY(-300px) rotate(${Math.random()*360}deg) scale(${0.4 + Math.random()})`;
        el.style.opacity = '0';
      }, 40 + i*40);
      setTimeout(()=> container.removeChild(el), 2000 + i*40);
    }
  }

  // small floating hearts layer (gentle)
  function spawnFloatingHearts() {
    const layer = document.getElementById('hearts-layer');
    if (!layer) return;
    setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'float-heart-mini';
      heart.innerHTML = '❤';
      const x = Math.random() * 100;
      heart.style.left = x + '%';
      heart.style.bottom = '-20px';
      heart.style.opacity = (0.2 + Math.random()*0.5);
      layer.appendChild(heart);
      const rise = 3000 + Math.random()*4000;
      heart.animate([
        { transform: 'translateY(0) scale(0.6)', opacity: heart.style.opacity },
        { transform: 'translateY(-320px) scale(1)', opacity: 0 }
      ], { duration: rise, easing: 'ease-out' });
      setTimeout(()=> heart.remove(), rise);
    }, 900);
  }
  spawnFloatingHearts();

  // heart cursor following
  document.addEventListener('mousemove', e => {
    const layer = document.getElementById('hearts-layer');
    if (!layer) return;
    let d = document.createElement('div');
    d.className = 'cursor-heart';
    d.innerText = '💖';
    d.style.left = (e.clientX - 10) + 'px';
    d.style.top = (e.clientY - 10) + 'px';
    d.style.position = 'fixed';
    d.style.pointerEvents = 'none';
    d.style.fontSize = '18px';
    d.style.opacity = '0.9';
    d.style.transform = 'translate(-50%,-50%)';
    layer.appendChild(d);
    setTimeout(()=> d.style.transition = 'all 700ms ease-out', 10);
    setTimeout(()=> { d.style.opacity = '0'; d.style.transform = 'translate(-50%,-120%) scale(.6)'; }, 30);
    setTimeout(()=> layer.removeChild(d), 750);
  });
});