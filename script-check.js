  let expandedGrayPart = false;
  let grayHidden = false;
  let verificationCountdown = 60;
  let verificationInterval = null;

  // ============= INITIALIZE SUMMARY PANEL =============
  function initializeSummaryPanel() {
    function updateDateTime() {
      const now = new Date();
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const dateText = now.toLocaleDateString('en-US', dateOptions);
      const timeText = now.toLocaleTimeString('en-US', timeOptions);
      const dateElement = document.querySelector('.summary-date-text');
      const timeElement = document.querySelector('.summary-time-text');
      if (dateElement) dateElement.textContent = dateText;
      if (timeElement) timeElement.textContent = timeText;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
  }

  // ============= EXPAND/COLLAPSE GRAY PART =============
  const grayRightPart = document.getElementById('grayRightPart');
  const whiteLeftPart = document.getElementById('whiteLeftPart');
  const dragHandle = document.getElementById('dragHandle');
  const grayToggleBtn = document.getElementById('grayToggleBtn');
  const expandLabel = document.getElementById('expandLabel');
  const grayPlaceholder = document.getElementById('grayPlaceholder');
  const scheduleOption = document.getElementById('scheduleOption');

  function setGrayToggleArrow(symbol) {
    if (grayToggleBtn) {
      grayToggleBtn.textContent = symbol;
      grayToggleBtn.classList.remove('hidden');
      grayToggleBtn.title = grayHidden ? 'Tap to unhide' : 'Hide panel';
    }
  }

  dragHandle.addEventListener('click', () => {
    if (grayHidden) {
      showGrayPanel();
    } else if (expandedGrayPart) {
      collapseGrayPart();
    } else {
      openSchedulePanel();
    }
  });

  scheduleOption.addEventListener('click', () => {
    if (grayHidden) {
      showGrayPanel();
    } else if (expandedGrayPart) {
      collapseGrayPart();
    } else {
      openSchedulePanel();
    }
  });

  grayToggleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (grayHidden) {
      showGrayPanel();
    } else {
      hideGrayPanel();
    }
  });

  function expandGrayPart(htmlContent) {
    clearGrayPart();
    grayRightPart.style.flex = 5;
    whiteLeftPart.style.flex = 0;
    expandLabel.textContent = "Click to hide";
    grayPlaceholder.style.display = 'none';
    scheduleOption.style.display = 'none';
    grayToggleBtn.style.display = 'none';
    grayPlaceholder.insertAdjacentHTML('afterend', `<div class='gray-part-content' id='grayContent'>${htmlContent}</div>`);
    document.getElementById('grayContent').style.display = 'block';
    expandedGrayPart = true;
  }

  function collapseGrayPart() {
    clearGrayPart();
    grayRightPart.style.flex = 1.2;
    whiteLeftPart.style.flex = 3.8;
    expandLabel.textContent = "Click to expand";
    grayPlaceholder.style.display = 'flex';
    scheduleOption.style.display = 'block';
    grayToggleBtn.style.display = 'block';
    grayHidden = false;
    expandedGrayPart = false;
    setGrayToggleArrow('>');
  }

  function hideGrayPanel() {
    clearGrayPart();
    grayRightPart.style.flex = 0.4;
    whiteLeftPart.style.flex = 4.6;
    expandLabel.textContent = "Click to unhide";
    grayPlaceholder.style.display = 'none';
    grayHidden = true;
    expandedGrayPart = false;
    setGrayToggleArrow('<');
  }

  function showGrayPanel() {
    clearGrayPart();
    grayRightPart.style.flex = 1.2;
    whiteLeftPart.style.flex = 3.8;
    expandLabel.textContent = "Click to expand";
    grayPlaceholder.style.display = 'flex';
    grayToggleBtn.style.display = 'block';
    scheduleOption.style.display = 'block';
    grayHidden = false;
    expandedGrayPart = false;
    setGrayToggleArrow('>');
    dragHandle.title = 'Expand';
  }

  function clearGrayPart() {
    const grayContent = document.getElementById('grayContent');
    if (grayContent) grayContent.remove();
  }

  function openSchedulePanel() {
    const html = `
      <h3 style='margin-bottom:16px;'>📅 Project Schedule</h3>
      <div style='margin-bottom:16px; padding:12px; background:rgba(255,255,255,0.9); border-radius:8px; border-left:4px solid #007B8A;'>
        <div style='font-weight:bold; color:#333; margin-bottom:8px;'>Upcoming Milestones</div>
        <div style='font-size:13px; color:#666; margin-bottom:6px;'>• Foundation slab - Jan 15, 2026</div>
        <div style='font-size:13px; color:#666; margin-bottom:6px;'>• Concrete pouring - Jan 18, 2026</div>
        <div style='font-size:13px; color:#666;'>• Structural work - Jan 22, 2026</div>
      </div>
      <div style='margin-bottom:16px; padding:12px; background:rgba(255,255,255,0.9); border-radius:8px; border-left:4px solid #28a745;'>
        <div style='font-weight:bold; color:#333; margin-bottom:8px;'>Scheduled Meetings</div>
        <div style='font-size:13px; color:#666; margin-bottom:6px;'>• Site Meeting - Jan 14, 10:00 AM</div>
        <div style='font-size:13px; color:#666;'>• Progress Review - Jan 16, 2:00 PM</div>
      </div>
      <div style='margin-top:16px;'><button class='btn primary' style='width:100%;' onclick='collapseGrayPart()'>Back</button></div>
    `;
    expandGrayPart(html);
  }

  // ============= NOTIFICATION =============
  const notificationIcon = document.getElementById('notificationIcon');
  notificationIcon.addEventListener('click', () => {
    const html = `<h3 style='margin-bottom:16px;'>Notifications</h3><p>No new notifications.</p><div style='margin-top:16px;'><button class='btn primary' style='width:100%;' onclick='collapseGrayPart()'>Back</button></div>`;
    expandGrayPart(html);
  });

// =========================
// Decode JWT helper
// =========================
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    console.error("JWT parse error:", e);
    return null;
  }
}

// =========================
// API request wrapper with auto-refresh
// =========================
async function apiRequest(url, options = {}) {
  let token = localStorage.getItem("authToken");
  options.headers = { ...options.headers, Authorization: `Bearer ${token}` };

  let res = await fetch(url, options);

  if (res.status === 401 || res.status === 403) {
    // Access token expired → try refresh
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      options.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
      res = await fetch(url, options); // retry original request
    } else {
      // Refresh failed → logout
      localStorage.clear();
      window.location.href = "home.html";
      return;
    }
  }

  return res.json();
}

// =========================
// Refresh access token using refresh route
// =========================
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  try {
    const res = await fetch("https://oneprojectapp-backend.onrender.com/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    });
    const data = await res.json();

    if (data.success && data.accessToken) {
      localStorage.setItem("authToken", data.accessToken);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Refresh token error:", err);
    return false;
  }
}

// =========================
// Profile + Project Selector Logic
// =========================
const token = localStorage.getItem("authToken");
if (!token) {
  console.error("No authToken found in localStorage");
}

const decoded = parseJwt(token);
console.log("Decoded JWT:", decoded);

// ✅ Identity from JWT (aligned with backend payload)
const clientId = decoded?.sub;
const clientEmail = decoded?.companyEmail || decoded?.email;
const clientRole = decoded?.role;

// DOM elements
const profileIcon = document.getElementById('profileIcon');
const profileDialog = document.getElementById('profileDialog');
const editProfileBtn = document.getElementById('editProfileBtn');
const editProfileOptions = document.getElementById('editProfileOptions');
const changePictureBtn = document.getElementById('changePictureBtn');
const deletePictureBtn = document.getElementById('deletePictureBtn');
const profileUpload = document.getElementById('profileUpload');
const profileIconLarge = document.getElementById('profileIconLarge');
const profileEmail = document.getElementById('profileEmail');
const profileRole = document.getElementById('profileRole');
const projectSelector = document.getElementById("projectSelector");
const projectDialog = document.getElementById("projectDialog");
const activeProject = document.getElementById("activeProject");

// MAIN LOAD LOGIC
document.addEventListener("DOMContentLoaded", async () => {
  // Display email + role from JWT
  if (profileEmail) profileEmail.textContent = clientEmail;
  if (profileRole) profileRole.textContent = `Role: ${clientRole}`;

  // ✅ Fetch profile with apiRequest
  try {
    const client = await apiRequest("https://oneprojectapp-backend.onrender.com/client/profile", {
      method: "GET"
    });

    if (client.profile_picture && client.profile_picture.trim() !== "") {
      profileIcon.style.backgroundImage = `url("${client.profile_picture}")`;
      profileIconLarge.style.backgroundImage = `url("${client.profile_picture}")`;
      profileIcon.textContent = "";
      profileIconLarge.textContent = "";
    } else {
      const emailChar = (clientEmail || "?").charAt(0).toUpperCase();
      profileIcon.textContent = emailChar;
      profileIconLarge.textContent = emailChar;
    }
  } catch (err) {
    console.error("Profile picture fetch error:", err);
  }

  // ✅ Fetch projects with apiRequest
  try {
    const data = await apiRequest("https://oneprojectapp-backend.onrender.com/client/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId })
    });

    const projects = data.projects || [];

    if (projects.length > 0) {
  projectDialog.innerHTML = ""; // clear static items

  // Check if we already have an active project saved
  const savedProjectId = ProjectContext.getId();
  let activeProjectObj = projects.find(p => String(p.id) === String(savedProjectId));

  if (!activeProjectObj) {
    // No saved project → fallback to first
    activeProjectObj = projects[0];
    ProjectContext.set(activeProjectObj); // ensures session is set
  }

  // ✅ Update DOM from the chosen project (saved or first)
  activeProject.textContent = activeProjectObj.name;

  // Build project selector list
  projects.forEach(project => {
    const item = document.createElement("div");
    item.className = "project-item";
    item.textContent = `${project.name} (${project.location})`;
    projectDialog.appendChild(item);

    item.addEventListener("click", () => {
      ProjectContext.set(project);        // saves globally
      activeProject.textContent = project.name; // ✅ update DOM immediately
      projectDialog.style.display = "none";
      fetchProjectDetails(project.id);    // reload dashboard data
    });
  });
} else {
  activeProject.textContent = "No projects assigned";
}

  } catch (err) {
    console.error("Projects fetch error:", err);
    activeProject.textContent = "Error loading projects";
  }
});

// ✅ Helper to refresh project details with apiRequest
async function fetchProjectDetails(projectId) {
  try {
    const data = await apiRequest("https://oneprojectapp-backend.onrender.com/client/project-details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId })
    });

    activeProject.textContent = data.project.name;
  } catch (err) {
    console.error("Project details fetch error:", err);
  }
}

// PROJECT SELECTOR TOGGLE
projectSelector.addEventListener("click", (e) => {
  e.stopPropagation();
  const rect = projectSelector.getBoundingClientRect();
  projectDialog.style.display = "block";
  projectDialog.style.top = rect.bottom + "px";
  projectDialog.style.left = rect.left + "px";
});

// PROFILE LOGIC
const profileOverlay = document.getElementById('profileOverlay');
const profileDefault = document.getElementById('profileDefault'); // ✅ new wrapper for default content
const profilePreview = document.getElementById('profilePreview'); // ✅ new container for preview

function openProfileDialog() {
  profileDialog.style.display = "block"; // ensure visible before animation
  profileDialog.classList.add("active");
  profileOverlay.classList.add("active");

  // Always start with default view visible
  if (profileDefault) profileDefault.style.display = "block";
  if (profilePreview) {
    profilePreview.style.display = "none";
    profilePreview.innerHTML = "";
  }
}

function closeProfileDialog() {
  profileDialog.classList.add("closing");

  setTimeout(() => {
    profileDialog.classList.remove("active", "closing");
    profileDialog.style.display = "none"; // ✅ reset state

    // Reset to default view
    if (profileDefault) profileDefault.style.display = "block";
    if (profilePreview) {
      profilePreview.style.display = "none";
      profilePreview.innerHTML = "";
    }
  }, 300); // match CSS transition duration
}

// Toggle dialog on icon click
profileIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  const isActive = profileDialog.classList.contains("active");
  if (isActive) {
    closeProfileDialog();
  } else {
    openProfileDialog();
  }
});

// ESC key closes dialog
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProfileDialog();
  }
});

// Edit button toggle
editProfileBtn.addEventListener('click', () => {
  editProfileOptions.style.display =
    editProfileOptions.style.display === 'block' ? 'none' : 'block';
});

// Upload picture
changePictureBtn.addEventListener('click', () => profileUpload.click());
profileUpload.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) return alert("Only image files allowed.");
  if (file.size > 512 * 1024) return alert("Profile picture must not exceed 512KB.");

  const formData = new FormData();
  formData.append("profile_picture", file);

  try {
    const data = await apiRequest("https://oneprojectapp-backend.onrender.com/client/upload-picture", {
      method: "POST",
      body: formData
    });
    profileIcon.style.backgroundImage = `url("${data.url}")`;
    profileIconLarge.style.backgroundImage = `url("${data.url}")`;
    profileIcon.textContent = "";
    profileIconLarge.textContent = "";
  } catch (err) {
    console.error("Upload error:", err);
    alert("Failed to upload profile picture.");
  }
});

// Delete picture
deletePictureBtn.addEventListener('click', async () => {
  try {
    await apiRequest("https://oneprojectapp-backend.onrender.com/client/delete-picture", {
      method: "POST"
    });
    const emailChar = clientEmail.charAt(0).toUpperCase();
    profileIcon.style.backgroundImage = "";
    profileIcon.textContent = emailChar;
    profileIconLarge.style.backgroundImage = "";
    profileIconLarge.textContent = emailChar;
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete profile picture.");
  }
});

// Profile picture preview (switch view)
profileIconLarge.addEventListener("click", () => {
  const pictureUrl = profileIconLarge.style.backgroundImage
    .replace(/^url\(["']?/, "")
    .replace(/["']?\)$/, "");
  if (!pictureUrl) return;

  // Hide default, show preview
  if (profileDefault) profileDefault.style.display = "none";
  if (profilePreview) {
    profilePreview.style.display = "block";
    profilePreview.innerHTML = "";
  }

  // Build preview box
  let previewBox = document.createElement("div");
  previewBox.style.width = "120px";
  previewBox.style.height = "160px";
  previewBox.style.margin = "10px auto";
  previewBox.style.border = "1px solid #ccc";
  previewBox.style.borderRadius = "4px";
  previewBox.style.backgroundImage = `url("${pictureUrl}")`;
  previewBox.style.backgroundSize = "contain";
  previewBox.style.backgroundRepeat = "no-repeat";
  previewBox.style.backgroundPosition = "center";
  previewBox.style.position = "relative";

  // Close icon
  const closeIcon = document.createElement("span");
  closeIcon.textContent = "✖";
  closeIcon.style.position = "absolute";
  closeIcon.style.top = "2px";
  closeIcon.style.right = "6px";
  closeIcon.style.cursor = "pointer";
  closeIcon.style.color = "#333";
  closeIcon.style.fontWeight = "bold";
  closeIcon.addEventListener("click", () => {
    if (profilePreview) {
      profilePreview.style.display = "none";
      profilePreview.innerHTML = "";
    }
    if (profileDefault) profileDefault.style.display = "block"; // restore default view
  });

  previewBox.appendChild(closeIcon);
  profilePreview.appendChild(previewBox);
});

// =========================
// Global Active Project Manager
// =========================
window.ProjectContext = {
  // Save active project globally
  set(project) {
    localStorage.setItem("activeProjectId", project.id);
    localStorage.setItem("activeProjectName", project.name);

    // Update UI if element exists
    const activeProjectElement = document.getElementById("activeProject");
    if (activeProjectElement) {
      activeProjectElement.textContent = project.name;
    }
  },

  // Get active project ID
  getId() {
    return localStorage.getItem("activeProjectId");
  },

  // Get active project name
  getName() {
    return localStorage.getItem("activeProjectName");
  },

  // Clear project context (e.g. on logout)
  clear() {
    localStorage.removeItem("activeProjectId");
    localStorage.removeItem("activeProjectName");
  }
};

// =========================
// Global Assign Team Route (redirect only)
// =========================
function openAssignTeam(source) {
  const token = localStorage.getItem("authToken");

  // ✅ Check for token
  if (!token) {
    alert("No token found. Please log in again.");
    window.location.href = "home.html";
    return;
  }

  // ✅ Guard against missing source
  if (!source) {
    console.error("openAssignTeam called without a valid source");
    alert("Dashboard source missing. Redirecting to home.");
    window.location.href = "home.html";
    return;
  }

  // ✅ Save the dashboard source in sessionStorage
  sessionStorage.setItem("redirectSource", source);

  // ✅ Redirect to assign-team.html
  window.location.href = "assign-team.html";
}

  // ============= SETTINGS DIALOG =============
  const settingsToggle = document.getElementById('settingsToggle');
  const settingsDialog = document.getElementById('settingsDialog');
  const resetPasswordBtn = document.getElementById('resetPasswordBtn');
  const changeLanguageBtn = document.getElementById('changeLanguageBtn');
  const exitProjectBtn = document.getElementById('exitProjectBtn');

  settingsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsDialog.classList.add('active');
  });

  resetPasswordBtn.addEventListener('click', () => {
    settingsDialog.classList.remove('active');
    window.location.href = 'reset-password.html';
  });

  changeLanguageBtn.addEventListener('click', () => {
    settingsDialog.classList.remove('active');
    document.getElementById('languageDialog').classList.add('active');
  });

  exitProjectBtn.addEventListener('click', () => {
    settingsDialog.classList.remove('active');
    document.getElementById('exitProjectDialog').classList.add('active');
  });

  // ============= TRANSLATION DICTIONARY =============
  const translationDictionary = {
    'English': {
      'home': 'Home',
      'reports': 'Reports',
      'assign-team-members': 'Assign Team Members',
      'edit-information': 'Edit Information',
      'chat': 'Chat',
      'settings': 'Settings',
      'support': 'Support / Help',
      'logout': 'Logout',
      'dashboard-label': 'TM Dashboard',
      'edit-profile': 'Edit Profile',
      'change-picture': 'Change Picture',
      'delete-picture': 'Delete Picture',
      'switch-project': 'Switch Project',
      'search': 'Search...',
      'notifications': 'Notifications',
      'no-notifications': 'No new notifications.',
      'reset-password': 'Reset Password',
      'change-language': 'Change Language',
      'exit-project': 'Exit Project',
      'project-overview': 'Project Overview',
      'daily-report': 'Daily Report',
      'meeting': 'Meeting',
      'view-schedule': 'Schedule',
      'confirm-close': 'Close'
    },
    'French': {
      'home': 'Accueil',
      'reports': 'Rapports',
      'assign-team-members': 'Assigner les Membres de l\'Équipe',
      'edit-information': 'Modifier les Informations',
      'chat': 'Chat',
      'settings': 'Paramètres',
      'support': 'Support / Aide',
      'logout': 'Déconnexion',
      'dashboard-label': 'Tableau de Bord TM',
      'edit-profile': 'Modifier le Profil',
      'change-picture': 'Changer la Photo',
      'delete-picture': 'Supprimer la Photo',
      'switch-project': 'Changer de Projet',
      'search': 'Chercher...',
      'notifications': 'Notifications',
      'no-notifications': 'Aucune nouvelle notification.',
      'reset-password': 'Réinitialiser le Mot de Passe',
      'change-language': 'Changer la Langue',
      'exit-project': 'Quitter le Projet',
      'project-overview': 'Aperçu du Projet',
      'daily-report': 'Rapport Quotidien',
      'meeting': 'Réunion',
      'view-schedule': 'Appuyez pour Voir l\'Horaire',
      'confirm-close': 'Fermer'
    },
    'Kinyarwanda': {
      'home': 'Ahabanza',
      'reports': 'Raporo',
      'assign-team-members': 'Aterana Abagize Inzira',
      'edit-information': 'Hindura Amakuru',
      'chat': 'Imigamire',
      'settings': 'Igenamigambi',
      'support': 'Ubufatanye / Ubwiyunge',
      'logout': 'Porosita',
      'dashboard-label': 'Paneli ya TM',
      'edit-profile': 'Hindura Inyandiko y\'Indangamuntu',
      'change-picture': 'Hindura Ifoto',
      'delete-picture': 'Siba Ifoto',
      'switch-project': 'Hindura Intego',
      'search': 'Shakisha...',
      'notifications': 'Iyifatazo',
      'no-notifications': 'Nta mashya mayifazo.',
      'reset-password': 'Ongera Kugenera Ijambo Ryibanga',
      'change-language': 'Hindura Ururimi',
      'exit-project': 'Sohoka mu Ntego',
      'project-overview': 'Incamake y\'Intego',
      'daily-report': 'Raporo y\'Ubuzima',
      'meeting': 'Inganiro',
      'view-schedule': 'Suuza Kugarageza Igishushanyo',
      'confirm-close': 'Funga'
    }
  };

  // ============= LANGUAGE DIALOG =============
  const languageDialog = document.getElementById('languageDialog');
  const applyLanguageBtn = document.getElementById('applyLanguageBtn');
  let currentLanguage = 'English';

  applyLanguageBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="language"]:checked').value;
    currentLanguage = selected;
    changeLanguageBtn.textContent = `🌐 Change Language (${selected})`;
    languageDialog.classList.remove('active');
    applyLanguageTranslation(selected);
    alert(`Language successfully changed to ${selected}`);
  });

  function applyLanguageTranslation(lang) {
    const translations = translationDictionary[lang];
    if (!translations) return;

    // Translate all elements with data-translate attribute
    const translatableElements = document.querySelectorAll('[data-translate]');
    translatableElements.forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Update placeholders
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
      searchBox.placeholder = translations['search'] || 'Search...';
    }
  }

  // ============= RESET PASSWORD DIALOG =============
  const resetPasswordDialog = document.getElementById('resetPasswordDialog');
  const confirmResetBtn = document.getElementById('confirmResetBtn');

  confirmResetBtn.addEventListener('click', () => {
    resetPasswordDialog.classList.remove('active');
    window.location.href = 'reset-password.html';
  });

  // ============= EXIT PROJECT DIALOG WITH TWO-STEP CONFIRMATION =============
  const exitProjectDialog = document.getElementById('exitProjectDialog');
  const verificationDialog = document.getElementById('verificationDialog');
  const confirmExitBtn = document.getElementById('confirmExitBtn');
  const cancelVerificationBtn = document.getElementById('cancelVerificationBtn');
  const resendVerificationBtn = document.getElementById('resendVerificationBtn');
  const verifyEmailBtn = document.getElementById('verifyEmailBtn');
  let verificationCompleted = false;
  let exitConfirmationStep = 1;

  confirmExitBtn.addEventListener('click', () => {
    if (exitConfirmationStep === 1) {
      exitConfirmationStep = 2;
      exitProjectDialog.classList.remove('active');
      startEmailVerification();
    }
  });

  document.getElementById('exitProjectBtn').addEventListener('click', () => {
    exitConfirmationStep = 1;
    confirmExitBtn.textContent = 'Yes';
    const exitDialog = document.getElementById('exitProjectDialog');
    const content = exitDialog.querySelector('.modal-content');
    content.querySelector('h3').textContent = 'Exit Project';
    content.querySelector('p').textContent = 'Are you sure you want to exit project?';
  });

  function startEmailVerification() {
    verificationCountdown = 60;
    verificationCompleted = false;
    verificationDialog.classList.add('active');
    verifyEmailBtn.disabled = false;
    verifyEmailBtn.style.opacity = '1';
    verifyEmailBtn.style.cursor = 'pointer';
    document.getElementById('verificationStatus').textContent = 'Waiting for email verification...';
    document.getElementById('verificationStatus').style.color = '#666';

    if (verificationInterval) clearInterval(verificationInterval);
    verificationInterval = setInterval(() => {
      verificationCountdown--;
      document.getElementById('countdownTimer').textContent = verificationCountdown;

      if (verificationCountdown <= 0) {
        clearInterval(verificationInterval);
        document.getElementById('verificationStatus').textContent = '❌ Verification link expired. Please try again.';
        document.getElementById('verificationStatus').style.color = 'red';
        verifyEmailBtn.disabled = true;
        verifyEmailBtn.style.opacity = '0.5';
        verifyEmailBtn.style.cursor = 'not-allowed';
      }
    }, 1000);
  }

  verifyEmailBtn.addEventListener('click', () => {
    if (verificationCountdown > 0) {
      verificationCompleted = true;
      clearInterval(verificationInterval);
      document.getElementById('verificationStatus').textContent = '✅ Email verified successfully! Exiting project...';
      document.getElementById('verificationStatus').style.color = 'green';
      verifyEmailBtn.disabled = true;
      resendVerificationBtn.disabled = true;
      cancelVerificationBtn.disabled = true;
      
      setTimeout(() => {
        verificationDialog.classList.remove('active');
        alert('You have successfully exited the project.');
        window.location.href = 'home.html';
      }, 1500);
    }
  });

  resendVerificationBtn.addEventListener('click', () => {
    alert('Verification email has been resent to your email address.');
    startEmailVerification();
  });

  cancelVerificationBtn.addEventListener('click', () => {
    verificationDialog.classList.remove('active');
    if (verificationInterval) clearInterval(verificationInterval);
    alert('Project exit cancelled.');
  });

  // ============= LOGOUT DIALOG =============
const logoutBtn = document.getElementById('logoutBtn');
const logoutDialog = document.getElementById('logoutDialog');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

logoutBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  logoutDialog.classList.add('active');
});

cancelLogout.addEventListener('click', () => { 
  logoutDialog.classList.remove('active'); 
});

confirmLogout.addEventListener('click', async () => { 
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    if (refreshToken) {
      await fetch("https://oneprojectapp-backend.onrender.com/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken })
      });
    }
  } catch (err) {
    console.error("Logout error:", err);
  }

  // Clear tokens locally
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");

  // Redirect to home
  window.location.href = "home.html"; 
});

  // ============= SIDEBAR NAV =============
  const sidebarItems = document.querySelectorAll('.nav-item[data-nav]');
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ============= TABS MANAGEMENT =============
  const navTabs = document.getElementById('navTabs');
  const bottomContent = document.getElementById('bottomContent');

  function loadHomeTabs() {
    navTabs.innerHTML = `
      <li data-tab="contractual-legal" class="active">Contractual & Legal</li>
      <li data-tab="administrative-instructional">Administrative & Instructional</li>
      <li data-tab="safety-compliance">Safety & Compliance</li>
      <li data-tab="operational-performance">Operational & Performance</li>
      <li data-tab="financial">Financial</li>
      <li data-tab="meeting">Meeting</li>
    `;
    setTabContent('contractual-legal');
    attachTabEvents();
  }

  function loadReportTabs() {
    navTabs.innerHTML = `
      <li data-tab="planning-execution" class="active">Planning & Execution</li>
      <li data-tab="design-technical">Design & Technical</li>
      <li data-tab="quality-safety">Quality & Safety</li>
      <li data-tab="financial-cost">Financial & Cost</li>
      <li data-tab="compliance-risk">Compliance & Risk</li>
      <li data-tab="communication-meetings">Communication & Meetings</li>
    `;
    setTabContent('planning-execution');
    attachTabEvents();
  }

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-nav');
      if (key === 'Project-Records') loadHomeTabs();
      if (key === 'workspace') loadReportTabs();
    });
  });

  // ============= SET TAB CONTENT =============
  function renderBottomContent(description, placeholder) {
    bottomContent.innerHTML = `
      <div class="bottom-fixed-header">
        <button class="btn primary add-doc-btn" type="button" onclick="openAddDialog()">➕ Add</button>
        <div class="bottom-description">
          <p>${description}</p>
        </div>
      </div>
      <div class="bottom-scroll-area">
        <ul class="doc-list">
          <li class="doc-item no-data">
            <div class="doc-item-header">
              <div class="doc-info">
                <div class="doc-title">No records available</div>
                <div class="doc-meta">${placeholder}</div>
              </div>
              <span class="doc-toggle">▾</span>
            </div>
            <div class="doc-detail">
              <p>When documents exist, each record appears here as an expandable item.</p>
            </div>
          </li>
        </ul>
      </div>
    `;
  }

  function setTabContent(key) {
    switch (key) {
      case 'contractual-legal':
        renderBottomContent(
          'Contract agreements, amendments, change orders, permits, insurance, tender docs.',
          'No active project selected or no data within this project.'
        );
        break;
      case 'administrative-instructional':
        renderBottomContent(
          'RFAs, consultant instructions, meeting minutes, correspondence, schedule updates.',
          'No active project selected or no data within this project.'
        );
        break;
      case 'safety-compliance':
        renderBottomContent(
          'Safety inspections, incident reports, NCRs, QC tests, risk assessments, method statements.',
          'No active project selected or no data within this project.'
        );
        break;
      case 'operational-performance':
        renderBottomContent(
          'Daily site reports, progress reports, BoQ, technical specs, submittals, drawings, schedules, as-built docs.',
          'No active project selected or no data within this project.'
        );
        break;
      case 'financial':
        renderBottomContent(
          'Interim payment certificates, contractor claims, final account reports.',
          'No active project selected or no data within this project.'
        );
        break;
      case 'meeting':
        renderBottomContent(
          'Meeting agendas, minutes, attendance, and follow-up actions.',
          'No meeting selected or no meeting data available.'
        );
        break;
      case 'planning-execution':
        renderBottomContent(
          'Draft daily site reports, manpower logs, equipment usage logs.',
          'No draft items available yet.'
        );
        break;
      case 'design-technical':
        renderBottomContent(
          'Draft shop drawings, design review notes, structural analysis drafts.',
          'No draft items available yet.'
        );
        break;
      case 'quality-safety':
        renderBottomContent(
          'Draft QC test data, material registers, supervisor checklists, incident notes.',
          'No draft items available yet.'
        );
        break;
      case 'financial-cost':
        renderBottomContent(
          'Draft BoQ updates, draft interim payment applications.',
          'No draft items available yet.'
        );
        break;
      case 'compliance-risk':
        renderBottomContent(
          'Draft method statements, draft site risk notes.',
          'No draft items available yet.'
        );
        break;
      case 'communication-meetings':
        renderBottomContent(
          'Draft meeting notes, RFAs, correspondence logs.',
          'No draft items available yet.'
        );
        break;
    }
  }

  bottomContent.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    const addBtn = target ? target.closest('.add-doc-btn') : null;
    if (addBtn) {
      openAddDialog();
      return;
    }

    const header = target ? target.closest('.doc-item-header') : null;
    if (!header) return;
    const item = header.closest('.doc-item');
    if (item) item.classList.toggle('expanded');
  });

  function openAddDialog() {
    const addDialog = document.getElementById('addDocumentDialog');
    if (!addDialog) return;
    addDialog.classList.add('active');
  }

  function closeAddDialog() {
    const addDialog = document.getElementById('addDocumentDialog');
    if (!addDialog) return;
    addDialog.classList.remove('active');
  }

  function submitAddForm() {
    const title = document.getElementById('addTitle').value.trim();
    const description = document.getElementById('addDescription').value.trim();
    const body = document.getElementById('addBody').value.trim();
    if (!title || !description || !body) {
      alert('Please fill in title, description, and body.');
      return;
    }
    alert('Item created successfully.');
    document.getElementById('addDocumentForm').reset();
    closeAddDialog();
  }

  function resendAddForm() {
    const title = document.getElementById('addTitle').value.trim();
    const description = document.getElementById('addDescription').value.trim();
    const body = document.getElementById('addBody').value.trim();
    if (!title && !description && !body) {
      alert('Please add a title, description, or body before resending.');
      return;
    }
    alert('Message resent successfully.');
  }

  function attachTabEvents() {
    const tabs = document.querySelectorAll('.nav-tabs li[data-tab]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const selected = tab.getAttribute('data-tab');
        setTabContent(selected);
      });
    });
  }

  // Default load
  loadHomeTabs();

  // ============= DOCUMENT DETAIL =============
  function openDocumentDetail(idx, context) {
    const doc = sampleDocs[idx];
    const html = `
      <h3 style='margin-bottom:16px;'>Document Details</h3>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Uploader:</div>
        <div class='gray-part-value'>${doc.uploader}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Title:</div>
        <div class='gray-part-value'>${doc.title}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Description:</div>
        <div class='gray-part-value'>${doc.description}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Document Number:</div>
        <div class='gray-part-value'>${doc.number}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Date Issued:</div>
        <div class='gray-part-value'>${doc.date}</div>
      </div>
      <div style='margin-top:16px; display:flex; gap:8px;'>
        <button class='btn primary' style='flex:1;'>Download</button>
        <button class='btn' style='flex:1;' onclick='collapseGrayPart()'>Back</button>
      </div>
    `;
    expandGrayPart(html);
  }

  // ============= REPORT DETAIL =============
  function openReportDetail(idx, context) {
    const report = sampleReports[idx];
    let actionButtons = '';
    let senderDetails = '';
    
    // Show action buttons based on context
    if (context === 'contractor-reports') {
      // For Team Reports, show Approve/Reject for PM
      if (!report.approvalStatus || report.approvalStatus === 'pending') {
        actionButtons = `
          <button class='btn primary' style='width:100%;' onclick='approveTeamReport(${idx})'>✓ Approve</button>
          <button class='btn' style='width:100%;' onclick='rejectTeamReport(${idx})'>✗ Reject</button>
        `;
      } else if (report.approvalStatus === 'approved') {
        actionButtons = `
          <button class='btn primary' style='width:100%; background:#28a745;' onclick='postTeamReport(${idx})'>📤 Post Report</button>
        `;
      }
    } else if (context === 'your-posted-reports') {
      // For Your Posted Report, show primary sender details
      senderDetails = `
        <div class='gray-part-field'>
          <div class='gray-part-label'>Primary Sender:</div>
          <div class='gray-part-value'>${report.reporter} (${report.role})</div>
        </div>
      `;
    }
    
    const html = `
      <h3 style='margin-bottom:16px;'>Report Details</h3>
      ${senderDetails}
      <div class='gray-part-field'>
        <div class='gray-part-label'>Reporter:</div>
        <div class='gray-part-value'>${report.reporter} (${report.role})</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Title:</div>
        <div class='gray-part-value'>${report.title}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Description:</div>
        <div class='gray-part-value'>${report.description}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Report Number:</div>
        <div class='gray-part-value'>${report.number}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Date:</div>
        <div class='gray-part-value'>${report.date}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Attachments:</div>
        <div class='gray-part-value'>sample_file.pdf, image.jpg</div>
      </div>
      <div style='margin-top:16px; display:flex; flex-direction:column; gap:8px;'>
        <button class='btn primary' style='width:100%;'>Download</button>
        ${actionButtons}
        <button class='btn' style='width:100%;' onclick='collapseGrayPart()'>Back</button>
      </div>
    `;
    expandGrayPart(html);
  }

  // ============= MEETING FUNCTIONS =============
  function displayMeetingList(type) {
    const container = document.getElementById('meetingListContainer');
    let meetsToShow = [];
    
    if (type === 'scheduled') {
      meetsToShow = sampleMeetings.filter(m => m.status === 'Scheduled');
    } else if (type === 'last') {
      meetsToShow = sampleMeetings.filter(m => m.status === 'Completed').slice(-1);
    }
    
    if (meetsToShow.length === 0) {
      container.innerHTML = '<p style="color:#999; text-align:center; padding:20px;">No meetings found.</p>';
      return;
    }
    
    let html = '<ul class="doc-list">';
    meetsToShow.forEach((meeting, idx) => {
      html += `
        <li class="doc-item">
          <div class="doc-info">
            <div class="doc-title">${meeting.title}</div>
            <div class="doc-meta">${meeting.number} | ${meeting.date}</div>
          </div>
          <button class="doc-action-btn" onclick="openMeetingDetail(${sampleMeetings.indexOf(meeting)})">View More</button>
        </li>
      `;
    });
    html += '</ul>';
    container.innerHTML = html;
  }

  function displayScheduleMeetingForm() {
    const container = document.getElementById('meetingListContainer');
    container.innerHTML = `
      <h3 style='margin-bottom:16px; color:#333;'>Schedule a New Meeting</h3>
      <div class='form-group'>
        <label>Meeting Title:</label>
        <input type='text' id='meetingTitle' placeholder='Enter meeting title' />
      </div>
      <div class='form-group'>
        <label>Date & Time:</label>
        <input type='datetime-local' id='meetingDateTime' />
      </div>
      <div class='form-group'>
        <label>Participants:</label>
        <textarea id='meetingParticipants' placeholder='Enter participant names (comma-separated)'></textarea>
      </div>
      <div class='form-group'>
        <label>Agenda:</label>
        <textarea id='meetingAgenda' placeholder='Enter meeting agenda'></textarea>
      </div>
      <div class='form-group'>
        <label>Attachments:</label>
        <input type='file' id='meetingAttachments' multiple />
      </div>
      <button class='btn primary' id='scheduleMeetingBtn' style='width:100%; padding:10px;'>Schedule Meeting</button>
    `;
    
    document.getElementById('scheduleMeetingBtn').addEventListener('click', () => {
      const title = document.getElementById('meetingTitle').value.trim();
      const dateTime = document.getElementById('meetingDateTime').value;
      const participants = document.getElementById('meetingParticipants').value.trim();
      const agenda = document.getElementById('meetingAgenda').value.trim();
      
      if (!title || !dateTime || !participants || !agenda) {
        alert('Please fill in all required fields.');
        return;
      }
      
      alert('Meeting scheduled successfully! Invitations sent to participants.');
      displayMeetingList('scheduled');
    });
  }

  function openMeetingDetail(idx) {
    const meeting = sampleMeetings[idx];
    const html = `
      <h3 style='margin-bottom:16px;'>Meeting Details</h3>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Title:</div>
        <div class='gray-part-value'>${meeting.title}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Number:</div>
        <div class='gray-part-value'>${meeting.number}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Date:</div>
        <div class='gray-part-value'>${meeting.date}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Status:</div>
        <div class='gray-part-value'><span style='background:${meeting.status === 'Completed' ? '#28a745' : '#ff9800'}; color:#fff; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;'>${meeting.status}</span></div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Meeting Minutes:</div>
        <div class='gray-part-value'>${meeting.minutes}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Participants:</div>
        <div class='gray-part-value'>${meeting.participants}</div>
      </div>
      <div class='gray-part-field'>
        <div class='gray-part-label'>Attachments:</div>
        <div class='gray-part-value'>${meeting.attachments}</div>
      </div>
      <div style='margin-top:16px; display:flex; flex-direction:column; gap:8px;'>
        <button class='btn primary' style='width:100%;'>Download Attachments</button>
        <button class='btn' style='width:100%;'>Add Comment</button>
        <button class='btn' style='width:100%;' onclick='collapseGrayPart()'>Back</button>
      </div>
    `;
    expandGrayPart(html);
  }

  // ============= PROMPT IMAGE DOWNLOAD =============
  function promptImageDownload(fileName) {
    const fileType = fileName.split('.').pop().toUpperCase();
    if (confirm(`Do you want to download this image? Format: ${fileType}`)) {
      alert(`Downloading ${fileName}...`);
    }
  }

  // ============= SEND REPORT =============
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'sendReportBtn') {
      const title = (document.getElementById('reportTitle') || {}).value || '';
      const desc = (document.getElementById('reportDescription') || {}).value || '';
      if (!title || !desc) {
        alert('Please add a title and description.');
        return;
      }
      alert('Report submitted (Pending Approval).');
      document.getElementById('reportTitle').value = '';
      document.getElementById('reportDescription').value = '';
      document.getElementById('reportAttachment').value = '';
    }
  });

  // ============= SEARCH FUNCTIONALITY =============
  const searchBox = document.getElementById('searchBox');
  searchBox.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = bottomContent.querySelectorAll('.doc-item, .form-group');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });

  // ============= CLOSE DIALOGS ON OUTSIDE CLICK =============
  document.addEventListener('click', (event) => {
    const dialogs = document.querySelectorAll('.modal-overlay.active');
    dialogs.forEach(dialog => {
      if (!dialog.querySelector('.modal-content').contains(event.target)) {
        dialog.classList.remove('active');
      }
    });

    if (profileDialog && !profileDialog.contains(event.target) && !profileIcon.contains(event.target)) {
      profileDialog.style.display = 'none';
    }

    if (projectDialog && !projectDialog.contains(event.target) && !projectSelector.contains(event.target)) {
      projectDialog.style.display = 'none';
    }

    if (logoutDialog && !logoutDialog.contains(event.target) && !logoutBtn.contains(event.target)) {
      logoutDialog.classList.remove('active');
    }
  });

  // ============= NOTIFICATIONS =============
  function showNotification(title, message) {
    const notificationHtml = `
      <div style='position:fixed; top:20px; right:20px; background:#fff; padding:16px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.2); z-index:200; animation: slideIn 0.3s ease-in-out; max-width:400px;' class='notification'>
        <div style='font-weight:bold; color:#333; margin-bottom:4px;'>${title}</div>
        <div style='font-size:12px; color:#666;'>${message}</div>
        <button onclick='this.parentElement.remove();' style='position:absolute; top:8px; right:8px; background:none; border:none; font-size:16px; cursor:pointer;'>✕</button>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `;
    document.body.insertAdjacentHTML('beforeend', notificationHtml);
    
    // Auto-remove notification after 4 seconds
    setTimeout(() => {
      const notification = document.querySelector('.notification');
      if (notification) notification.remove();
    }, 4000);
  }

  // ============= REPORT GENERATION =============
  function generateScheduleReport() {
    const today = new Date();
    const reportDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const reportHtml = `
      <div style='position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:300;' id='reportModal'>
        <div style='background:#fff; padding:32px; border-radius:12px; width:90%; max-width:800px; max-height:90vh; overflow-y:auto; box-shadow:0 10px 40px rgba(0,0,0,0.3);'>
          <!-- Report Header -->
          <div style='text-align:center; margin-bottom:24px; border-bottom:2px solid #007B8A; padding-bottom:16px;'>
            <h2 style='color:#333; margin:0 0 8px 0;'>📊 Planned vs Actual Schedule Report</h2>
            <div style='font-size:12px; color:#666;'>Generated on ${reportDate}</div>
          </div>

          <!-- Project Summary -->
          <div style='background:#f5f5f5; padding:16px; border-radius:8px; margin-bottom:20px;'>
            <h3 style='color:#333; margin-top:0;'>Project Summary</h3>
            <table style='width:100%; border-collapse:collapse; font-size:12px;'>
              <tr>
                <td style='padding:8px; border-bottom:1px solid #ddd;'><strong>Project</strong></td>
                <td style='padding:8px; border-bottom:1px solid #ddd;'>Foundation Pouring - Phase 1</td>
              </tr>
              <tr>
                <td style='padding:8px; border-bottom:1px solid #ddd;'><strong>Project Manager</strong></td>
                <td style='padding:8px; border-bottom:1px solid #ddd;'>Mike Johnson (Contractor PM)</td>
              </tr>
              <tr>
                <td style='padding:8px; border-bottom:1px solid #ddd;'><strong>Start Date</strong></td>
                <td style='padding:8px; border-bottom:1px solid #ddd;'>January 12, 2026</td>
              </tr>
              <tr>
                <td style='padding:8px;'><strong>Reporting Period</strong></td>
                <td style='padding:8px;'>January 12-14, 2026</td>
              </tr>
            </table>
          </div>

          <!-- Comparison -->
          <div style='margin-bottom:20px;'>
            <h3 style='color:#333; margin-top:0;'>Planned vs Actual Comparison</h3>
            <table style='width:100%; border-collapse:collapse; font-size:12px;'>
              <tr style='background:#f9f9f9;'>
                <th style='padding:12px; border:1px solid #ddd; text-align:left;'>Milestone</th>
                <th style='padding:12px; border:1px solid #ddd; text-align:center;'>Planned</th>
                <th style='padding:12px; border:1px solid #ddd; text-align:center;'>Actual</th>
                <th style='padding:12px; border:1px solid #ddd; text-align:center;'>Status</th>
              </tr>
              <tr>
                <td style='padding:12px; border:1px solid #ddd;'>Foundation Prep</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'>Jan 15</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'>Jan 14 ✓</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'><span style='background:#28a745; color:#fff; padding:2px 6px; border-radius:3px; font-size:10px;'>AHEAD</span></td>
              </tr>
              <tr style='background:#f9f9f9;'>
                <td style='padding:12px; border:1px solid #ddd;'>Concrete Pouring A1-A2</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'>Jan 18</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'>Jan 14-17 (In Progress)</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'><span style='background:#2196F3; color:#fff; padding:2px 6px; border-radius:3px; font-size:10px;'>ON TRACK</span></td>
              </tr>
              <tr>
                <td style='padding:12px; border:1px solid #ddd;'>Concrete Pouring A3</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'>Jan 19</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'>Jan 18-19 (Planned)</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'><span style='background:#ff9800; color:#fff; padding:2px 6px; border-radius:3px; font-size:10px;'>AT RISK</span></td>
              </tr>
              <tr style='background:#f9f9f9;'>
                <td style='padding:12px; border:1px solid #ddd;'><strong>Overall Progress</strong></td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'>-</td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'><strong>60%</strong></td>
                <td style='padding:12px; border:1px solid #ddd; text-align:center;'><span style='background:#ff9800; color:#fff; padding:2px 6px; border-radius:3px; font-size:10px;'>MONITOR</span></td>
              </tr>
            </table>
          </div>

          <!-- Issues & Risks -->
          <div style='background:#fff3cd; padding:16px; border-radius:8px; border-left:4px solid #ff9800; margin-bottom:20px;'>
            <h3 style='color:#333; margin-top:0;'>⚠️ Issues & Risks</h3>
            <ul style='margin:8px 0; padding-left:20px; font-size:12px; color:#666;'>
              <li>Weather delay expected - 1-2 days impact</li>
              <li>Equipment maintenance required - Minor delays possible</li>
              <li>Section A3 pouring behind schedule due to weather</li>
            </ul>
          </div>

          <!-- Recommendations -->
          <div style='background:#e8f5e9; padding:16px; border-radius:8px; border-left:4px solid #28a745; margin-bottom:20px;'>
            <h3 style='color:#333; margin-top:0;'>✓ Recommendations</h3>
            <ul style='margin:8px 0; padding-left:20px; font-size:12px; color:#666;'>
              <li>Continue monitoring weather conditions for Section A3 work</li>
              <li>Prioritize equipment maintenance to avoid delays</li>
              <li>Accelerate Section A3 work when weather permits</li>
              <li>Schedule curing process monitoring more frequently</li>
            </ul>
          </div>

          <!-- Action Buttons -->
          <div style='display:flex; gap:12px; justify-content:flex-end; margin-top:24px; border-top:1px solid #ddd; padding-top:16px;'>
            <button class='btn' style='padding:10px 20px; font-size:12px;' onclick='document.getElementById("reportModal").remove();'>Close</button>
            <button class='btn primary' style='padding:10px 20px; font-size:12px; background:#0097a7; border:none; color:#fff;' onclick='window.print();'>🖨️ Print Report</button>
            <button class='btn primary' style='padding:10px 20px; font-size:12px; background:#28a745; border:none; color:#fff;' onclick='alert("Report exported as PDF");'>📥 Export PDF</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', reportHtml);
  }

  // ============= INITIALIZE ON PAGE LOAD =============
  initializeSummaryPanel();
