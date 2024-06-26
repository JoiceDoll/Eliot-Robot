export function animations() {
  const robotContainer = document.querySelector(".container-robot-item");
  const weatherDisplay = document.querySelector(".weather-container");

  robotContainer.animate(
    [
      { transform: "translateX(0px)" },
      { transform: "translateX(100px)" },
      { transform: "translateX(0px)" },
    ],
    {
      duration: 2000,
      iterations: 1,
    }
  );

  weatherDisplay.animate(
    [{ transform: "translateX(-30px)" }, { transform: "translateX(0)" }],
    {
      duration: 1000,
      iterations: 1,
    }
  );
}
