// Check if user is logged in when page loads
document.addEventListener("DOMContentLoaded", function () {
  checkUserLoggedIn();
});

// Function to check if user is logged in
function checkUserLoggedIn() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    // If on home page and user is logged in, show dashboard
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html" ||
      window.location.pathname.endsWith("/index.html")
    ) {
      showDashboard(JSON.parse(loggedInUser));
    }
  } else {
    // If user is not logged in and trying to access pages that require login
    if (window.location.pathname.includes("/booking.html")) {
      window.location.href = "./index.html";
    }
  }
}

// Toggle password visibility
function togglePassword() {
  const passwordField = document.getElementById("password");
  if (passwordField) {
    passwordField.type =
      passwordField.type === "password" ? "text" : "password";
  }

  const signupPasswordField = document.getElementById("signupPassword");
  if (signupPasswordField) {
    signupPasswordField.type =
      signupPasswordField.type === "password" ? "text" : "password";
  }

  const confirmPasswordField = document.getElementById("confirmPassword");
  if (confirmPasswordField) {
    confirmPasswordField.type =
      confirmPasswordField.type === "password" ? "text" : "password";
  }
}

// Handle Login Form
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("emaile").value;
  const password = document.getElementById("password").value;

  // Check if credentials match stored user data
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    // Store logged in status
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    showDashboard(user);
  } else {
    alert("Invalid email or password. Please try again.");
  }

  return false;
}

// Handle Signup Form
function handleSignup(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("tel").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("DOB").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmError");

  let isValid = true;

  // Password Length
  if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters long";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  // Alpha-numeric Check
  if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    if (passwordError.textContent) {
      passwordError.textContent +=
        ". Password must contain both letters and numbers";
    } else {
      passwordError.textContent =
        "Password must contain both letters and numbers";
    }
    isValid = false;
  }

  // Confirm Password Check
  if (password !== confirmPassword) {
    confirmError.textContent = "Passwords do not match";
    isValid = false;
  } else {
    confirmError.textContent = "";
  }

  // If all conditions are met, register the user
  if (isValid) {
    // Get existing users or initialize empty array
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (storedUsers.some((user) => user.email === email)) {
      alert(
        "This email is already registered. Please use a different email or log in."
      );
      return false;
    }

    // Create new user object
    const newUser = {
      firstName,
      lastName,
      phone,
      email,
      dob,
      password,
      wallet: 0,
      transactions: [],
      tickets: [],
    };

    // Add user to storage
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Also log the user in
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    alert("Signup Successful! You are now logged in.");
    showDashboard(newUser);
  }

  return false;
}

// Show dashboard after login/signup
function showDashboard(user) {
  // Hide login and signup forms
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const dashboardContainer = document.getElementById("dashboardContainer");

  if (loginForm) loginForm.style.display = "none";
  if (signupForm) signupForm.style.display = "none";
  if (dashboardContainer) {
    dashboardContainer.style.display = "block";
    // Update user info in dashboard
    const userDisplay = document.getElementById("userDisplay");
    if (userDisplay) {
      userDisplay.textContent = user.firstName;
    }

    // Load user tickets
    loadUserTickets();

    // Load random train fact
    showRandomFact();
  }
}

// Handle logout
function handleLogout() {
  localStorage.removeItem("loggedInUser");

  // Reload the page to show login form
  window.location.reload();
}

// Toggle between login and signup forms
document.addEventListener("DOMContentLoaded", function () {
  // Login to Signup toggle
  const signupToggle = document.getElementById("signupToggle");
  const signupToggle2 = document.getElementById("signupToggle2");
  const loginToggle = document.getElementById("loginToggle");
  const loginToggle2 = document.getElementById("loginToggle2");

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (signupToggle) {
    signupToggle.addEventListener("click", function (e) {
      e.preventDefault();
      if (loginForm) loginForm.style.display = "none";
      if (signupForm) signupForm.style.display = "block";
    });
  }

  if (signupToggle2) {
    signupToggle2.addEventListener("click", function (e) {
      e.preventDefault();
      if (loginForm) loginForm.style.display = "none";
      if (signupForm) signupForm.style.display = "block";
    });
  }

  if (loginToggle) {
    loginToggle.addEventListener("click", function (e) {
      e.preventDefault();
      if (signupForm) signupForm.style.display = "none";
      if (loginForm) loginForm.style.display = "block";
    });
  }

  if (loginToggle2) {
    loginToggle2.addEventListener("click", function (e) {
      e.preventDefault();
      if (signupForm) signupForm.style.display = "none";
      if (loginForm) loginForm.style.display = "block";
    });
  }

  // Mobile menu functionality
  const openPanel = document.getElementById("open-panel");
  const closePanel = document.getElementById("close-panel");
  const sidePanel = document.getElementById("side-panel");
  const overlay = document.getElementById("overlay");

  if (openPanel) {
    openPanel.addEventListener("click", function () {
      if (sidePanel) sidePanel.style.width = "250px";
      if (overlay) overlay.style.display = "block";
    });
  }

  if (closePanel) {
    closePanel.addEventListener("click", function () {
      if (sidePanel) sidePanel.style.width = "0";
      if (overlay) overlay.style.display = "none";
    });
  }

  if (overlay) {
    overlay.addEventListener("click", function () {
      if (sidePanel) sidePanel.style.width = "0";
      overlay.style.display = "none";
    });
  }
});

// Random train facts for the dashboard
function showRandomFact() {
  const facts = [
    "The world's first passenger train began operating in 1825, running on the Stockton and Darlington Railway in England.",
    "Japan's bullet trains (Shinkansen) have a top speed of over 320 km/h (200 mph).",
    "The Trans-Siberian Railway spans almost 9,300 kilometers, making it the longest railway line in the world.",
    "The Channel Tunnel, connecting England and France, is 50.5 km long with 38 km under the English Channel.",
    "The fastest train in the world is the Shanghai Maglev, which can reach speeds of up to 431 km/h (268 mph).",
    "India Railways is one of the largest employers in the world with over 1.3 million employees.",
    "The Swiss railway system is considered the most punctual in the world, with 90% of trains arriving within 3 minutes of schedule.",
  ];

  const factElement = document.getElementById("fact");
  if (factElement) {
    const randomIndex = Math.floor(Math.random() * facts.length);
    factElement.textContent = facts[randomIndex];
  }
}

// Load user tickets
function loadUserTickets() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const ticketContainer = document.querySelector(".dash-ticket");

  if (loggedInUser && ticketContainer) {
    // Update all users data to get latest tickets
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUser = allUsers.find(
      (user) => user.email === loggedInUser.email
    );

    if (updatedUser && updatedUser.tickets && updatedUser.tickets.length > 0) {
      // Clear loading message
      ticketContainer.innerHTML = `
        <div style="width: 100%; border-bottom:2px solid grey; padding-left:10px;">
          <p style="color: black; font-weight:700;">Tickets</p>
          <p>History of tickets purchased</p>
        </div>
        <div class="ticket-list"></div>
      `;

      const ticketList = ticketContainer.querySelector(".ticket-list");

      updatedUser.tickets.forEach((ticket) => {
        const ticketCard = document.createElement("div");
        ticketCard.className = "ticket-card";
        ticketCard.innerHTML = `
          <div class="ticket-header">
            <span class="ticket-id">Ticket #${ticket.id}</span>
            <span class="ticket-date">${ticket.date}</span>
          </div>
          <div class="ticket-details">
            <p><strong>From:</strong> ${ticket.from}</p>
            <p><strong>To:</strong> ${ticket.to}</p>
            <p><strong>Departure:</strong> ${ticket.departureTime}</p>
            <p><strong>Price:</strong> ₦${ticket.price}</p>
          </div>
        `;
        ticketList.appendChild(ticketCard);
      });
    } else {
      ticketContainer.innerHTML = `
        <div style="width: 100%; border-bottom:2px solid grey; padding-left:10px;">
          <p style="color: black; font-weight:700;">Tickets</p>
          <p>History of tickets purchased</p>
        </div>
        <div class="empty-tickets" style="text-align: center; padding: 20px;">
          <h3>No tickets yet</h3>
          <p>You haven't purchased any tickets yet. Click "BUY TICKET" to get started!</p>
        </div>
      `;
    }
  }
}

// FAQ Section - Toggle sections
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.toggle("active");

    // Update arrow direction for this section
    const button = document.querySelector(
      `[onclick="toggleSection('${sectionId}')"]`
    );
    if (button) {
      const arrow = button.querySelector(".arrow");
      if (arrow) {
        arrow.classList.toggle("down");
      }
    }

    // Close other sections
    document.querySelectorAll(".section-content").forEach((content) => {
      if (content.id !== sectionId && content.classList.contains("active")) {
        content.classList.remove("active");

        // Update other arrows
        const otherButton = document.querySelector(
          `[onclick="toggleSection('${content.id}')"]`
        );
        if (otherButton) {
          const otherArrow = otherButton.querySelector(".arrow");
          if (otherArrow) {
            otherArrow.classList.remove("down");
          }
        }
      }
    });
  }
}
