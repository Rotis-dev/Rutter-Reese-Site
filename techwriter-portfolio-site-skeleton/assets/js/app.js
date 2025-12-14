// Light friction only: disable right-click on embedded previews.
// NOTE: This is not security; it only reduces casual copying.
document.addEventListener("contextmenu", (e) => {
  const isEmbed = e.target.closest && e.target.closest(".embed, .no-ctx");
  if (isEmbed) e.preventDefault();
});

document.getElementById("year")?.appendChild(document.createTextNode(String(new Date().getFullYear())));
