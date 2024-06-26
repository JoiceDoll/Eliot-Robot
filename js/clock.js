export function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const clockContainer = document.querySelector(".clock-item");
  clockContainer.style.fontSize = "6rem";
  clockContainer.style.textShadow = "var(--text-shadow)";
  clockContainer.style.color = "var(--clock-primary)";
  clockContainer.innerHTML = `<p>${hours}:${minutes}</p>`;

  return {
    hours,
    minutes,
  };
}
