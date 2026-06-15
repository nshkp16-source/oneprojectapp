// =============================================================
// LANGUAGE SWITCHER SYSTEM
// =============================================================

class LanguageSwitcher {
  constructor() {
    this.currentLanguage = 'English';
    this.translations = {};
    this.init();
  }

  // Load translations from JSON file
  async loadTranslations() {
    try {
      const response = await fetch('translations.json');
      this.translations = await response.json();
      console.log('✅ Translations loaded successfully');
    } catch (error) {
      console.error('❌ Error loading translations:', error);
      // Fallback: create basic translations
      this.translations = {
        'English': {},
        'French': {}
      };
    }
  }

  // Initialize language switcher
  async init() {
    await this.loadTranslations();
    
    // Get saved language from localStorage or use default
    const savedLanguage = localStorage.getItem('appLanguage');
    this.currentLanguage = savedLanguage || 'English';
    
    // Apply initial language
    this.applyLanguage(this.currentLanguage);
    
    // Setup event listeners
    this.setupEventListeners();
  }

  // Setup event listeners for language buttons
  setupEventListeners() {
    const changeLanguageBtn = document.getElementById('changeLanguageBtn');
    const applyLanguageBtn = document.getElementById('applyLanguageBtn');
    const languageCancelBtn = document.getElementById('languageCancelBtn');
    const languageSelect = document.getElementById('languageSelect');
    const languageDialog = document.getElementById('languageDialog');

    if (changeLanguageBtn) {
      changeLanguageBtn.addEventListener('click', () => {
        this.openLanguageDialog();
      });
    }

    if (applyLanguageBtn) {
      applyLanguageBtn.addEventListener('click', () => {
        const selectedLanguage = languageSelect.value;
        this.changeLanguage(selectedLanguage);
        this.closeLanguageDialog();
      });
    }

    if (languageCancelBtn) {
      languageCancelBtn.addEventListener('click', () => {
        this.closeLanguageDialog();
      });
    }

    // Also close dialog when clicking overlay
    if (languageDialog) {
      languageDialog.addEventListener('click', (e) => {
        if (e.target === languageDialog) {
          this.closeLanguageDialog();
        }
      });
    }

    // Set current language as selected in dropdown
    if (languageSelect) {
      languageSelect.value = this.currentLanguage;
    }
  }

  // Open language dialog
  openLanguageDialog() {
    const dialog = document.getElementById('languageDialog');
    if (dialog) {
      dialog.classList.add('active');
      const select = document.getElementById('languageSelect');
      if (select) {
        select.value = this.currentLanguage;
      }
    }
  }

  // Close language dialog
  closeLanguageDialog() {
    const dialog = document.getElementById('languageDialog');
    if (dialog) {
      dialog.classList.remove('active');
    }
  }

  // Change language
  changeLanguage(language) {
    if (language === this.currentLanguage) return;
    
    this.currentLanguage = language;
    localStorage.setItem('appLanguage', language);
    this.applyLanguage(language);
    
    console.log(`✅ Language changed to: ${language}`);
  }

  // Apply language to all elements with data-translate attribute
  applyLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translatedText = this.getTranslation(key, language);
      
      // Handle different element types
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.placeholder = translatedText;
      } else if (element.tagName === 'SPAN' || element.tagName === 'DIV' || element.tagName === 'P' || element.tagName === 'LABEL') {
        element.textContent = translatedText;
      } else if (element.tagName === 'BUTTON') {
        // Preserve any child elements, just update text nodes
        let textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
          textNode.textContent = translatedText;
        } else {
          element.textContent = translatedText;
        }
      } else if (element.tagName === 'H3') {
        element.textContent = translatedText;
      }
    });

    // Handle special cases for placeholders
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
      searchBox.placeholder = this.getTranslation('search-placeholder', language);
    }

    // Update logout dialog text
    const logoutDialog = document.getElementById('logoutDialog');
    if (logoutDialog) {
      const logoutTitle = logoutDialog.querySelector('h3');
      const logoutPrompt = logoutDialog.querySelector('p');
      const cancelBtn = logoutDialog.querySelector('#cancelLogout');
      const confirmBtn = logoutDialog.querySelector('#confirmLogout');
      
      if (logoutTitle) logoutTitle.textContent = this.getTranslation('logout-title', language);
      if (logoutPrompt) logoutPrompt.textContent = this.getTranslation('logout-prompt', language);
      if (cancelBtn) cancelBtn.textContent = this.getTranslation('cancel', language);
      if (confirmBtn) confirmBtn.textContent = this.getTranslation('confirm', language);
    }

    // Update aria labels and titles for better accessibility
    this.updateAccessibilityAttributes(language);

    console.log(`🌐 Applied language: ${language}`);
  }

  // Get translation for a key
  getTranslation(key, language) {
    const langTranslations = this.translations[language] || {};
    return langTranslations[key] || key; // Return key if translation not found
  }

  // Update accessibility attributes
  updateAccessibilityAttributes(language) {
    const arretBar = document.getElementById('arretBar');
    if (arretBar) {
      arretBar.title = this.getTranslation('arret-tooltip', language);
    }
  }

  // Get current language
  getLanguage() {
    return this.currentLanguage;
  }

  // Set language (called from other scripts if needed)
  setLanguage(language) {
    this.changeLanguage(language);
  }
}

// Initialize language switcher when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
  });
} else {
  window.languageSwitcher = new LanguageSwitcher();
}
