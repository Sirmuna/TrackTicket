// Side panel
const openPanel = document.getElementById("open-panel");
const closePanel = document.getElementById("close-panel");
const sidePanel = document.getElementById("side-panel")
const overlay = document.getElementById("overlay");

openPanel.addEventListener("click", () => 
{
    sidePanel.style.display = "flex";
    overlay.style.display = "flex";
});

closePanel.addEventListener("click", () => 
    {
    overlay.style.display = "none";
    sidePanel.style.display = "none";
});
overlay.addEventListener("click", () => 
{
    sidePanel.style.display = "none";
    overlay.style.display = "none";
});

function toggleSection(sectionId) {
  // Get all section contents and buttons
  const allContents = document.querySelectorAll(".section-content");
  const allButtons = document.querySelectorAll(".section-button");
  const clickedContent = document.getElementById(sectionId);
  const clickedButton = clickedContent.previousElementSibling;

  // Check if the clicked section is already active
  const isActive = clickedContent.classList.contains("active");

  // Close all sections
  allContents.forEach((content) => {
    content.classList.remove("active");
  });
  allButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // If the clicked section wasn't active before, open it
  if (!isActive) {
    clickedContent.classList.add("active");
    clickedButton.classList.add("active");
  }
}