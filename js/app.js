(function () {
  "use strict";

  // --- DOM ---
  const introScreen = document.getElementById("intro");
  const resultScreen = document.getElementById("result");
  const btnEstimate = document.getElementById("btn-estimate");
  const btnBack = document.getElementById("btn-back");
  const countdown = document.getElementById("countdown");
  const funFacts = document.getElementById("fun-facts");
  const toggleOptions = document.querySelectorAll(".toggle-option");

  let timer = null;

  // --- Toggle options ---
  toggleOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      toggleOptions.forEach((o) => o.classList.remove("toggle-option--active"));
      opt.classList.add("toggle-option--active");
      opt.querySelector("input").checked = true;
    });
  });

  // --- Random date generator ---
  function randomFutureDate(type) {
    const now = new Date();
    let maxMs;

    if (type === "startup") {
      // 1-2 months ahead
      const minDays = 15;
      const maxDays = 75;
      const days = minDays + Math.random() * (maxDays - minDays);
      maxMs = now.getTime() + days * 86400000;
    } else {
      // 6 months to 2 years ahead
      const minDays = 180;
      const maxDays = 730;
      const days = minDays + Math.random() * (maxDays - minDays);
      maxMs = now.getTime() + days * 86400000;
    }

    return new Date(now.getTime() + Math.random() * (maxMs - now.getTime()));
  }

  // --- Fun facts ---
  const facts = [
    "Dica: adicione 3x ao tempo estimado para chegar perto da realidade.",
    "Sabia que 67% dos projetos de software atrasam?",
    "A estimativa mais precisa e a que ninguem faz: nao estimar.",
    "Hofstadter: sempre demora mais do que voce espera, mesmo considerando a Lei de Hofstadter.",
    "No-estimate: a arte de entregar sem prometer datas.",
    "Se funcionou na primeira estimativa, provavelmente voce esqueceu algo.",
    "Planning poker: onde todo mundo discorda e no final chuta o meio.",
    "Estimativa de projeto: a unica ficcao cientifica que os gestores acreditam.",
  ];

  function showRandomFact() {
    funFacts.textContent = facts[Math.floor(Math.random() * facts.length)];
  }

  // --- Countdown ---
  function updateCountdown(targetDate) {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      clearInterval(timer);
      setUnit("days", "00");
      setUnit("hours", "00");
      setUnit("minutes", "00");
      setUnit("seconds", "00");
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    setUnit("days", pad(days));
    setUnit("hours", pad(hours));
    setUnit("minutes", pad(minutes));
    setUnit("seconds", pad(seconds));
  }

  function setUnit(unit, value) {
    const el = countdown.querySelector(`[data-unit="${unit}"]`);
    if (el && el.textContent !== value) {
      el.textContent = value;
    }
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  // --- Navigation ---
  function showScreen(screen) {
    introScreen.classList.remove("screen--visible");
    resultScreen.classList.remove("screen--visible");
    screen.classList.add("screen--visible");
  }

  // --- Estimate ---
  btnEstimate.addEventListener("click", () => {
    const company = document.querySelector('input[name="company"]:checked').value;

    // Brief loading animation
    btnEstimate.classList.add("btn-primary--loading");
    btnEstimate.querySelector(".btn-primary__text").textContent = "Calculando...";

    setTimeout(() => {
      btnEstimate.classList.remove("btn-primary--loading");
      btnEstimate.querySelector(".btn-primary__text").textContent = "Estimar!";

      const target = randomFutureDate(company);

      if (timer) clearInterval(timer);
      updateCountdown(target);
      timer = setInterval(() => updateCountdown(target), 1000);

      showRandomFact();
      showScreen(resultScreen);
    }, 1200);
  });

  // --- Back ---
  btnBack.addEventListener("click", () => {
    if (timer) clearInterval(timer);
    showScreen(introScreen);
  });
})();
