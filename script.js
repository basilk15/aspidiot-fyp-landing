const reveals = document.querySelectorAll(".reveal");

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-loaded");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay || 0);
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

reveals.forEach((element) => observer.observe(element));

const heroBg = document.querySelector(".hero-bg");
const storyLines = document.querySelectorAll(".story-line");

const activateStoryLine = () => {
  if (storyLines.length === 0) {
    return;
  }

  const viewportCenter = window.innerHeight / 2;
  const maxDistance = window.innerHeight * 0.65;

  storyLines.forEach((line) => {
    const rect = line.getBoundingClientRect();
    const lineCenter = rect.top + rect.height / 2;
    const distance = lineCenter - viewportCenter;
    const normalized = Math.min(Math.abs(distance) / maxDistance, 1);
    const opacity = 1 - normalized * 0.75;
    const shift = distance * 0.08;
    const rotate = (distance / maxDistance) * 6;
    const scale = 1 - normalized * 0.04;
    const depth = -normalized * 40;

    line.style.setProperty("--line-opacity", opacity.toFixed(3));
    line.style.setProperty("--line-shift", `${shift.toFixed(2)}px`);
    line.style.setProperty("--line-rotate", `${rotate.toFixed(2)}deg`);
    line.style.setProperty("--line-scale", scale.toFixed(3));
    line.style.setProperty("--line-depth", `${depth.toFixed(2)}px`);
  });
};

const handleScroll = () => {
  const offset = window.scrollY * 0.12;
  if (heroBg) {
    heroBg.style.transform = `translateY(${offset}px)`;
  }
  activateStoryLine();
};

let isTicking = false;

const onScroll = () => {
  if (isTicking) {
    return;
  }
  isTicking = true;
  window.requestAnimationFrame(() => {
    handleScroll();
    isTicking = false;
  });
};

window.addEventListener("scroll", onScroll, { passive: true });

handleScroll();
