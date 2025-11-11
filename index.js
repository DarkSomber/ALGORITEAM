// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Simple Demo Login System

// Global login state management for all pages
function initializeAllPages() {
    updateNavigation();
    
    // Setup login functionality if elements exist
    setupLoginForms();
}

function setupLoginForms() {
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername')?.value || 'Demo User';
            loginUser(username);
        });
    }
    
    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('registerUsername')?.value || 'Demo User';
            const email = document.getElementById('registerEmail')?.value || 'demo@algoriteam.com';
            
            users[username] = { email: email, password: 'demo' };
            localStorage.setItem('users', JSON.stringify(users));
            
            const registerSuccess = document.getElementById('registerSuccess');
            if (registerSuccess) {
                registerSuccess.style.display = 'block';
            }
            
            setTimeout(() => {
                loginUser(username);
            }, 1000);
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeAllPages);

let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Initialize login system when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginSystem();
});

function initializeLoginSystem() {
    // Update navigation based on login status
    updateNavigation();
    
    // Setup login form if it exists on this page
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            // Demo login - accept any credentials
            if (username && password) {
                loginUser(username);
            }
        });
    }
    
    // Setup register form if it exists on this page
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            
            // Demo registration - always succeed
            if (username && email) {
                users[username] = { email: email, password: 'demo' };
                localStorage.setItem('users', JSON.stringify(users));
                
                const registerSuccess = document.getElementById('registerSuccess');
                if (registerSuccess) {
                    registerSuccess.style.display = 'block';
                }
                
                // Auto login after registration
                setTimeout(() => {
                    loginUser(username);
                }, 1000);
            }
        });
    }
    
    // Check if we should show content section (for login page)
    if (currentUser && document.getElementById('contentSection')) {
        showContentSection();
    }
}

function loginUser(username) {
    currentUser = { username: username, email: users[username]?.email || `${username}@demo.com` };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update navigation
    updateNavigation();
    
    // If on login page, show content section
    if (document.getElementById('contentSection')) {
        showContentSection();
    }
    
    // Redirect to home page if on login page
    if (window.location.pathname.includes('login.html')) {
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 500);
    }
}

function loginWithGoogle() {
    // Demo Google login
    const username = 'Google User';
    const email = 'googleuser@demo.com';
    
    users[username] = { email: email, password: 'google' };
    localStorage.setItem('users', JSON.stringify(users));
    
    loginUser(username);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateNavigation();
    
    // If on login page, show login form
    if (document.getElementById('loginPage')) {
        showLoginPage();
    }
    
    // Redirect to home if on login page
    if (window.location.pathname.includes('login.html')) {
        window.location.href = '/index.html';
    }
}

function updateNavigation() {
    const userGreeting = document.getElementById('userGreeting');
    const loginLink = document.getElementById('loginLink');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    if (userGreeting && loginLink && usernameDisplay) {
        if (currentUser) {
            userGreeting.style.display = 'flex';
            loginLink.style.display = 'none';
            usernameDisplay.textContent = currentUser.username;
        } else {
            userGreeting.style.display = 'none';
            loginLink.style.display = 'block';
        }
    }
}

function showContentSection() {
    const loginPage = document.getElementById('loginPage');
    const registerPage = document.getElementById('registerPage');
    const contentSection = document.getElementById('contentSection');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    if (loginPage) loginPage.classList.remove('active');
    if (registerPage) registerPage.classList.remove('active');
    if (contentSection) contentSection.style.display = 'block';
    if (welcomeMessage && currentUser) {
        welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
    }
}

function showLoginPage() {
    const loginPage = document.getElementById('loginPage');
    const registerPage = document.getElementById('registerPage');
    const contentSection = document.getElementById('contentSection');
    
    if (loginPage) loginPage.classList.add('active');
    if (registerPage) registerPage.classList.remove('active');
    if (contentSection) contentSection.style.display = 'none';
}

function showRegisterPage() {
    const loginPage = document.getElementById('loginPage');
    const registerPage = document.getElementById('registerPage');
    const contentSection = document.getElementById('contentSection');
    
    if (registerPage) registerPage.classList.add('active');
    if (loginPage) loginPage.classList.remove('active');
    if (contentSection) contentSection.style.display = 'none';
}

// Carousel functionality (keep your existing carousel code)
const defaultConfig = {
  section_title: "Our Apps",
  app_1_title: "Habitory",
  app_1_tagline: "Where good habits are built.",
  app_1_description: "Habitory is your personal space for growth — track your daily routines, set achievable goals, and watch your progress rise. With smart reminders and streak tracking, Habitory makes self-improvement feel rewarding and natural.",
  app_2_title: "TimeForge",
  app_2_tagline: "Shape your time. Master your habits.",
  app_2_description: "TimeForge helps you turn minutes into milestones. Combine to-do lists, timers, and habit tracking in one sleek app that keeps you consistent and motivated. Forge stronger habits, one focused session at a time.",
  app_3_title: "RiseLoop",
  app_3_tagline: "Rise. Repeat. Improve.",
  app_3_description: "RiseLoop keeps you in rhythm with your goals through daily reminders, progress circles, and motivation boosts. Whether it's reading, exercising, or meditating — build habits that stick and rise higher every day.",
  app_4_title: "DailyRoot",
  app_4_tagline: "Master Your Digital Habits",
  app_4_description: "DailyRoot automatically tracks your screen time and application usage, transforming your digital behavior into actionable insights. Set focus timers, visualize your habits, and take control of your productivity.",
  background_color: "#667eea",
  card_background: "#ffffff",
  text_color: "#1a202c",
  accent_color: "#667eea",
  button_color: "#ffffff",
  font_family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
  font_size: 16,
};

let currentIndex = 0;
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.remove("active", "exiting");
    if (i === index) {
      card.classList.add("active");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentIndex = index;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % cards.length;
    showCard(newIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      showCard(index);
    });
  });

  setInterval(() => {
    const newIndex = (currentIndex + 1) % cards.length;
    showCard(newIndex);
  }, 5000);
}

async function onConfigChange(config) {
  // Set up font family with fallback
  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontStack =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif';
  const fontFamily = `${customFont}, ${baseFontStack}`;
  const baseSize = config.font_size || defaultConfig.font_size;

  // Apply global styles
  document.body.style.fontFamily = fontFamily;
  document.body.style.background = `linear-gradient(135deg, ${
    config.background_color || defaultConfig.background_color
  } 0%, ${config.accent_color || defaultConfig.accent_color} 100%)`;

  // Update section title
  const sectionTitle = document.getElementById("sectionTitle");
  sectionTitle.textContent =
    config.section_title || defaultConfig.section_title;
  sectionTitle.style.fontSize = `${baseSize * 2.5}px`;
  sectionTitle.style.fontFamily = fontFamily;
  sectionTitle.style.color = config.button_color || defaultConfig.button_color;

  // Update card backgrounds
  cards.forEach((card) => {
    card.style.background =
      config.card_background || defaultConfig.card_background;
  });

  // Update app titles
  const appTitles = document.querySelectorAll(".app-title");
  const titleConfigs = [
    config.app_1_title || defaultConfig.app_1_title,
    config.app_2_title || defaultConfig.app_2_title,
    config.app_3_title || defaultConfig.app_3_title,
  ];
  appTitles.forEach((title, i) => {
    title.textContent = titleConfigs[i];
    title.style.fontSize = `${baseSize * 2}px`;
    title.style.fontFamily = fontFamily;
    title.style.color = config.text_color || defaultConfig.text_color;
  });

  // Update app taglines
  const appTaglines = document.querySelectorAll(".app-tagline");
  const taglineConfigs = [
    config.app_1_tagline || defaultConfig.app_1_tagline,
    config.app_2_tagline || defaultConfig.app_2_tagline,
    config.app_3_tagline || defaultConfig.app_3_tagline,
  ];
  appTaglines.forEach((tagline, i) => {
    tagline.textContent = taglineConfigs[i];
    tagline.style.fontSize = `${baseSize * 1.1}px`;
    tagline.style.fontFamily = fontFamily;
    tagline.style.color = config.accent_color || defaultConfig.accent_color;
  });

  // Update app descriptions
  const appDescriptions = document.querySelectorAll(".app-description");
  const descConfigs = [
    config.app_1_description || defaultConfig.app_1_description,
    config.app_2_description || defaultConfig.app_2_description,
    config.app_3_description || defaultConfig.app_3_description,
    config.app_3_description || defaultConfig.app_3_description,
  ];
  appDescriptions.forEach((desc, i) => {
    desc.textContent = descConfigs[i];
    desc.style.fontSize = `${baseSize}px`;
    desc.style.fontFamily = fontFamily;
    desc.style.color = config.text_color || defaultConfig.text_color;
  });

  // Update navigation buttons
  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach((btn) => {
    btn.style.background = config.button_color || defaultConfig.button_color;
    btn.style.color = config.accent_color || defaultConfig.accent_color;
  });

  // Update app icon gradients
  const appIcons = document.querySelectorAll(".app-icon");
  appIcons.forEach((icon) => {
    icon.style.background = `linear-gradient(135deg, ${
      config.background_color || defaultConfig.background_color
    } 0%, ${config.accent_color || defaultConfig.accent_color} 100%)`;
  });

  // Update active dot color
  const activeDot = document.querySelector(".dot.active");
  if (activeDot) {
    activeDot.style.background =
      config.button_color || defaultConfig.button_color;
  }
}
