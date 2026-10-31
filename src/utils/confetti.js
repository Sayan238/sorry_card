// Particle & celebration effects
export function launchHearts(count = 30) {
  const emojis = ["💗", "✨", "🌸", "💕", "🥹", "🤍", "💖", "🌷", "🍫"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = `${Math.random() * 95 + 2.5}vw`;
    el.style.animationDelay = `${Math.random() * 0.6}s`;
    el.style.animationDuration = `${2.4 + Math.random() * 1.5}s`;
    el.style.fontSize = `${16 + Math.random() * 18}px`;
    document.body.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 4000);
  }
}
