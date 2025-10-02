// Toggle password visibility
function togglePassword() {
  const passInput = document.getElementById("password");
  passInput.type = passInput.type === "password" ? "text" : "password";
}

// Toggle between login and signup forms
document.getElementById("signupToggle").addEventListener("click", () => {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
});

document.getElementById("signupToggle2").addEventListener("click", () => {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
});

document.getElementById("loginToggle2").addEventListener("click", () => {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
});

// Handle login
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("emaile").value;
  const password = document.getElementById("password").value;

  // Store user info (in practice, this would involve backend validation)
  localStorage.setItem("currentUser", email.split("@")[0]);
  showDashboard();
  return false;
}

// Handle signup
function handleSignup(event) {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    document.getElementById("confirmError").textContent =
      "Passwords do not match";
    return false;
  }

  // Store user info (in practice, this would involve backend registration)
  localStorage.setItem("currentUser", firstName);
  showDashboard();
  return false;
}

// Show dashboard
function showDashboard() {
  const username = localStorage.getItem("currentUser");
  document.getElementById("userDisplay").textContent = username;
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("dashboardContainer").style.display = "block";
}

// Handle logout
function handleLogout() {
  localStorage.removeItem("currentUser");
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("dashboardContainer").style.display = "none";
  document.getElementById("login-form").reset();
}

// Check if user is already logged in
window.onload = function () {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    showDashboard();
  }
};

// Handle mobile menu tab clicks
document.querySelectorAll(".mobile-menu .tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    // Update both mobile and desktop tabs
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));

    const tabId = tab.dataset.tab;
    document
      .querySelectorAll(`[data-tab="${tabId}"]`)
      .forEach((t) => t.classList.add("active"));
    document.getElementById(tabId).classList.add("active");

    // Close mobile menu after selection
    toggleMenu();
  });
});

const openPanel = document.getElementById("open-panel");
const closePanel = document.getElementById("close-panel");
const sidePanel = document.getElementById("side-panel");
const overlay = document.getElementById("overlay");

openPanel.addEventListener("click", () => {
  sidePanel.style.display = "flex";
  overlay.style.display = "flex";
});

closePanel.addEventListener("click", () => {
  overlay.style.display = "none";
  sidePanel.style.display = "none";
});
overlay.addEventListener("click", () => {
  sidePanel.style.display = "none";
  overlay.style.display = "none";
});

// facts

const facts = [
  "The Trans-Siberian Railway is the longest railway line, stretching 9,289 km (5,772 miles).",
  "Shanghai Maglev is the world's fastest train, reaching 431 km/h (268 mph).",
  "Shinjuku Station in Tokyo is the busiest, serving 3.5 million passengers daily.",
  "TrackTicket allow users to book train tickets at ease.",
  "The first underground railway, the London Underground, opened in 1863.",
  "High-speed trains are up to 5 times more energy-efficient than cars and planes.",
  "The longest train journey without changing trains spans 18,755 km from Portugal to Singapore.",
  "Switzerland set a record with a 1.9 km (1.2 miles) long passenger train in 2022.",
  "Some unused train routes still run ‘ghost trains’ to keep tracks legally active.",
  "Luxury trains like the Venice Simplon-Orient-Express offer 5-star experiences on rails.",
];

function showRandomFact() {
  const factElement = document.getElementById("fact");
  const randomIndex = Math.floor(Math.random() * facts.length);
  factElement.textContent = facts[randomIndex];
}

// Show a random fact on page load
window.onload = showRandomFact;

function openWhatsApp() {
  const phone = "2347067752598";
  const message = "Hello, I need assistance with TrackTicket train booking.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
