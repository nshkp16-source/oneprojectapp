// =============================================================
// LANGUAGE SWITCHER SYSTEM
// =============================================================

class LanguageSwitcher {
  constructor() {
    this.currentLanguage = 'English';
    this.translations = {};
    this.automaticTextOriginals = new WeakMap();
    this.automaticAttributeOriginals = new WeakMap();
    this.automaticObserver = null;
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

    const nativeAlert = window.alert.bind(window);
    window.alert = (message) => {
      const translated = this.getAutomaticTranslation(String(message), this.currentLanguage);
      nativeAlert(translated === null ? message : translated);
    };
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
      select.setAttribute('aria-label', this.getTranslation('Select language', language));
    }

    document.documentElement.lang = language === 'French' ? 'fr' : 'en';
    document.documentElement.setAttribute('translate', 'no');

    if (document.body.hasAttribute('data-auto-translate')) {
      this.applyAutomaticTranslations(document.head, language);
      this.applyAutomaticTranslations(document.body, language);
      this.observeAutomaticTranslations();
    }

    window.dispatchEvent(new Event('languagechange'));
  }

  observeAutomaticTranslations() {
    if (this.automaticObserver) return;

    this.automaticObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          this.translateAutomaticTextNode(mutation.target, this.currentLanguage);
          return;
        }

        if (mutation.type === 'attributes') {
          this.translateAutomaticAttributes(mutation.target, this.currentLanguage);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            this.translateAutomaticTextNode(node, this.currentLanguage);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            this.applyAutomaticTranslations(node, this.currentLanguage);
          }
        });
      });
    });

    this.automaticObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['alt', 'aria-label', 'placeholder', 'title'],
      characterData: true,
      childList: true,
      subtree: true
    });
  }

  applyAutomaticTranslations(root, language) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      this.translateAutomaticTextNode(node, language);
    }

    if (root.nodeType === Node.ELEMENT_NODE) {
      this.translateAutomaticAttributes(root, language);
    }
    root.querySelectorAll?.('[alt], [aria-label], [placeholder], [title]').forEach((element) => {
      this.translateAutomaticAttributes(element, language);
    });
  }

  isAutomaticTranslationExcluded(element) {
    if (!element) return true;
    const excluded = element.closest(
      'script, style, svg, [data-translate], [data-i18n], [data-user], [data-no-translate], [contenteditable="true"]'
    );
    const noTranslate = element.closest('[translate="no"]');
    return Boolean(excluded || (noTranslate && noTranslate !== document.documentElement));
  }

  translateAutomaticTextNode(node, language) {
    const parent = node.parentElement;
    if (this.isAutomaticTranslationExcluded(parent)) return;

    const previous = this.automaticTextOriginals.get(node);
    if (language === 'English') {
      if (previous) {
        if (node.nodeValue === previous.translated && node.nodeValue !== previous.source) {
          node.nodeValue = previous.source;
        }
        this.automaticTextOriginals.delete(node);
      }
      return;
    }

    const source = previous && node.nodeValue === previous.translated
      ? previous.source
      : node.nodeValue;
    const translated = this.getAutomaticTranslation(source, language);

    if (translated === null) {
      if (previous) this.automaticTextOriginals.delete(node);
      return;
    }

    this.automaticTextOriginals.set(node, { source, translated });
    if (node.nodeValue !== translated) node.nodeValue = translated;
  }

  translateAutomaticAttributes(element, language) {
    if (this.isAutomaticTranslationExcluded(element)) return;

    ['alt', 'aria-label', 'placeholder', 'title'].forEach((name) => {
      if (!element.hasAttribute(name)) return;

      let originals = this.automaticAttributeOriginals.get(element);
      if (!originals) {
        originals = new Map();
        this.automaticAttributeOriginals.set(element, originals);
      }

      const current = element.getAttribute(name);
      const previous = originals.get(name);
      if (language === 'English') {
        if (previous && current === previous.translated && current !== previous.source) {
          element.setAttribute(name, previous.source);
        }
        originals.delete(name);
        return;
      }

      const source = previous && current === previous.translated ? previous.source : current;
      const translated = this.getAutomaticTranslation(source, language);

      if (translated === null) {
        originals.delete(name);
      } else {
        originals.set(name, { source, translated });
        if (current !== translated) element.setAttribute(name, translated);
      }
    });
  }

  getAutomaticTranslation(text, language) {
    if (language === 'English') return null;

    const source = text.trim().replace(/\s+/g, ' ');
    const leading = text.match(/^\s*/)[0];
    const trailing = text.match(/\s*$/)[0];
    const exact = this.translations[language]?.[source];
    const translated = exact || this.translateAutomaticTemplate(source, language);
    return translated === null ? null : `${leading}${translated}${trailing}`;
  }

  translateAutomaticTemplate(source, language) {
    const dictionary = this.translations[language] || {};
    for (const [template, translatedTemplate] of Object.entries(dictionary)) {
      if (!template.includes('{')) continue;

      const placeholders = [];
      const sourceTemplate = template.replace(/\{[^}]+\}/g, (placeholder) => {
        const index = placeholders.push(placeholder) - 1;
        return `__AUTO_PLACEHOLDER_${index}__`;
      });
      const pattern = sourceTemplate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/__AUTO_PLACEHOLDER_(\d+)__/g, '(.+?)');
      const match = source.match(new RegExp(`^${pattern}$`));
      if (!match) continue;

      return placeholders.reduce((result, placeholder, index) => {
        const value = match[index + 1];
        const translatedValue = dictionary[value] || value;
        return result.replace(placeholder, () => translatedValue);
      }, translatedTemplate);
    }
    return null;
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
