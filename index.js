// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Default configuration for the app carousel section
const defaultConfig = {
  section_title: "Featured Apps",
  app_1_title: "Habitory",
  app_1_tagline: "Where good habits are built.",
  app_1_description:
    "Habitory is your personal space for growth — track your daily routines, set achievable goals, and watch your progress rise. With smart reminders and streak tracking, Habitory makes self-improvement feel rewarding and natural.",
  app_2_title: "TimeForge",
  app_2_tagline: "Shape your time. Master your habits.",
  app_2_description:
    "TimeForge helps you turn minutes into milestones. Combine to-do lists, timers, and habit tracking in one sleek app that keeps you consistent and motivated. Forge stronger habits, one focused session at a time.",
  app_3_title: "RiseLoop",
  app_3_tagline: "Rise. Repeat. Improve.",
  app_3_description:
    "RiseLoop keeps you in rhythm with your goals through daily reminders, progress circles, and motivation boosts. Whether it's reading, exercising, or meditating — build habits that stick and rise higher every day.",
  background_color: "#667eea",
  card_background: "#ffffff",
  text_color: "#1a202c",
  accent_color: "#667eea",
  button_color: "#ffffff",
  font_family:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
  font_size: 16,
};

// Track which card is currently displayed
let currentIndex = 0;

// Get all DOM elements needed for the carousel
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

/**
 * Display a specific card and update navigation dots
 * @param {number} index - The index of the card to show (0-2)
 */
function showCard(index) {
  // Remove active class from all cards and add it to the selected one
  cards.forEach((card, i) => {
    card.classList.remove("active", "exiting");
    if (i === index) {
      card.classList.add("active");
    }
  });

  // Update active dot indicator
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  // Update the current index tracker
  currentIndex = index;
}

// Previous button: go to the previous card (wraps around to last card)
prevBtn.addEventListener("click", () => {
  const newIndex = (currentIndex - 1 + cards.length) % cards.length;
  showCard(newIndex);
});

// Next button: go to the next card (wraps around to first card)
nextBtn.addEventListener("click", () => {
  const newIndex = (currentIndex + 1) % cards.length;
  showCard(newIndex);
});

// Dot navigation: click any dot to jump to that card
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.index);
    showCard(index);
  });
});

// Auto-rotate carousel: advance to next card every 5 seconds
setInterval(() => {
  const newIndex = (currentIndex + 1) % cards.length;
  showCard(newIndex);
}, 5000);

/**
 * Apply configuration changes to update the page styling and content
 * This function is called when the Element SDK config changes
 * @param {Object} config - Configuration object with styling and content options
 */
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

// Initialize Element SDK if available (for custom editing capabilities)
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    // Map configuration to recolorable elements
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => {
            config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          },
        },
        {
          get: () => config.card_background || defaultConfig.card_background,
          set: (value) => {
            config.card_background = value;
            window.elementSdk.setConfig({ card_background: value });
          },
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (value) => {
            config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          },
        },
        {
          get: () => config.accent_color || defaultConfig.accent_color,
          set: (value) => {
            config.accent_color = value;
            window.elementSdk.setConfig({ accent_color: value });
          },
        },
        {
          get: () => config.button_color || defaultConfig.button_color,
          set: (value) => {
            config.button_color = value;
            window.elementSdk.setConfig({ button_color: value });
          },
        },
      ],
      borderables: [],
      // Font family editing capability
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (value) => {
          config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        },
      },
      // Font size editing capability
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (value) => {
          config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        },
      },
    }),
    // Map configuration to edit panel values
    mapToEditPanelValues: (config) =>
      new Map([
        ["section_title", config.section_title || defaultConfig.section_title],
        ["app_1_title", config.app_1_title || defaultConfig.app_1_title],
        ["app_1_tagline", config.app_1_tagline || defaultConfig.app_1_tagline],
        [
          "app_1_description",
          config.app_1_description || defaultConfig.app_1_description,
        ],
        ["app_2_title", config.app_2_title || defaultConfig.app_2_title],
        ["app_2_tagline", config.app_2_tagline || defaultConfig.app_2_tagline],
        [
          "app_2_description",
          config.app_2_description || defaultConfig.app_2_description,
        ],
        ["app_3_title", config.app_3_title || defaultConfig.app_3_title],
        ["app_3_tagline", config.app_3_tagline || defaultConfig.app_3_tagline],
        [
          "app_3_description",
          config.app_3_description || defaultConfig.app_3_description,
        ],
      ]),
  });
}
