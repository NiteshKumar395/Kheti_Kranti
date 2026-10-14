(() => {
  "use strict";

  document.querySelectorAll(".about-faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.closest(".about-faq-item").querySelector(".about-faq-answer");
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      answer.hidden = expanded;
    });
  });
})();
