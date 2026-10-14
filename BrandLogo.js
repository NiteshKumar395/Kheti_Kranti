(() => {
  const brandLinks = document.querySelectorAll(".logo, .site-brand");
  if (!brandLinks.length) return;

  fetch("/api/config/public", { credentials: "same-origin" })
    .then(response => {
      if (!response.ok) throw new Error("Brand settings could not be loaded.");
      return response.json();
    })
    .then(config => {
      if (!config.logoAvailable) return;
      for (const link of brandLinks) {
        let image = link.querySelector(".logo-image");
        if (!image) {
          image = document.createElement("img");
          image.className = "logo-image";
          image.alt = "";
          image.hidden = true;
          link.insertBefore(image, link.firstChild);
        }

        const fallback = link.querySelector("b, .brand-mark");
        image.onload = () => {
          image.hidden = false;
          if (fallback) fallback.hidden = true;
        };
        image.onerror = () => {
          image.hidden = true;
          if (fallback) fallback.hidden = false;
        };
        image.src = `/lobo.png?updated=${Date.now()}`;
      }
    })
    .catch(error => console.error("Could not load the site logo:", error));
})();
