// =============================================================
// LANGUAGE SWITCHER SYSTEM
// =============================================================

class LanguageSwitcher {
  constructor() {
    this.currentLanguage = 'English';
    this.translations = {};
    this.init();
  }

  async loadTranslations() {
    try {
      const response = await fetch('translations.json');
      if (!response.ok) {
        throw new Error('translations.json not found');
      }
      this.translations = await response.json();
    } catch (error) {
      console.error('Could not load translations.json:', error);
      this.translations = { English: {}, French: {} };
    }
  }

  async init() {
    await this.loadTranslations();

    const savedLanguage = localStorage.getItem('appLanguage');
    this.currentLanguage = savedLanguage || 'English';

    this.installLanguageSwitcher();
    this.applyLanguage(this.currentLanguage);
    this.bindStorageListener();
  }

  bindStorageListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'appLanguage' && event.newValue) {
        this.changeLanguage(event.newValue, { silent: true });
      }
    });
  }

  installLanguageSwitcher() {
    const existing = document.getElementById('langSwitch');
    if (existing) {
      existing.value = this.currentLanguage;
      existing.addEventListener('change', (event) => this.changeLanguage(event.target.value));
      return;
    }

    const mount = document.getElementById('langMount');
    const select = document.createElement('select');
    select.id = 'langSwitch';
    select.setAttribute('aria-label', 'Select language');
    select.setAttribute('translate', 'no');
    select.innerHTML = `
      <option value="English">English</option>
      <option value="French">Français</option>
    `;
    select.value = this.currentLanguage;
    select.addEventListener('change', (event) => this.changeLanguage(event.target.value));

    const style = 'position:fixed;top:12px;right:12px;z-index:9999;padding:6px 10px;border:1px solid #dbe2ea;border-radius:999px;background:#fff;color:#0f172a;box-shadow:0 8px 20px rgba(15,23,42,0.08);font-size:13px;';
    select.style.cssText = style;

    if (mount) {
      mount.appendChild(select);
    } else {
      document.body.appendChild(select);
    }
  }

  changeLanguage(language, options = {}) {
    const safeLanguage = this.translations[language] ? language : 'English';
    if (safeLanguage === this.currentLanguage && !options.silent) return;

    this.currentLanguage = safeLanguage;
    localStorage.setItem('appLanguage', safeLanguage);
    this.applyLanguage(safeLanguage);
  }

  getTranslation(key, language) {
    const langTranslations = this.translations[language] || {};
    return langTranslations[key] || this.translations.English?.[key] || key;
  }

  applyLanguage(language) {
    const dict = this.translations[language] || this.translations.English || {};

    document.querySelectorAll('[data-translate], [data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-translate') || element.getAttribute('data-i18n');
      if (!key || element.matches('[translate="no"],[data-user],[data-no-translate],[contenteditable="true"]')) {
        return;
      }

      const translated = dict[key] || this.translations.English?.[key] || key;
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translated;
        return;
      }

      const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
      if (textNode && element.childNodes.length > 1) {
        textNode.textContent = translated;
      } else {
        element.textContent = translated;
      }
    });

    document.querySelectorAll('[data-translate-placeholder], [data-i18n-placeholder]').forEach((element) => {
      const key = element.getAttribute('data-translate-placeholder') || element.getAttribute('data-i18n-placeholder');
      if (!key) return;
      element.placeholder = this.getTranslation(key, language);
    });

    const select = document.getElementById('langSwitch');
    if (select) {
      select.value = language;
    }

    document.documentElement.lang = language === 'French' ? 'fr' : 'en';
    document.documentElement.setAttribute('translate', 'no');
    window.dispatchEvent(new Event('languagechange'));
  }

  getLanguage() {
    return this.currentLanguage;
  }

  setLanguage(language) {
    this.changeLanguage(language);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
  });
} else {
  window.languageSwitcher = new LanguageSwitcher();
}
