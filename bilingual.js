
(() => {
  const KEY = 'siteLanguage';
  const root = document.documentElement;

  const setText = (el, lang) => {
    if (lang === 'ja' && el.dataset.jaHtml) {
      el.innerHTML = el.dataset.jaHtml;
    } else if (lang === 'en' && el.dataset.enHtml) {
      el.innerHTML = el.dataset.enHtml;
    } else if (lang === 'ja' && el.dataset.ja && el.children.length === 0) {
      el.textContent = el.dataset.ja;
    } else if (lang === 'en' && el.dataset.en && el.children.length === 0) {
      el.textContent = el.dataset.en;
    }
    if (lang === 'ja' && el.dataset.jaPlaceholder) el.setAttribute('placeholder', el.dataset.jaPlaceholder);
    if (lang === 'en' && el.dataset.enPlaceholder) el.setAttribute('placeholder', el.dataset.enPlaceholder);
    if (lang === 'ja' && el.dataset.jaAriaLabel) el.setAttribute('aria-label', el.dataset.jaAriaLabel);
    if (lang === 'en' && el.dataset.enAriaLabel) el.setAttribute('aria-label', el.dataset.enAriaLabel);
  };

  const applyLanguage = (lang) => {
    const current = lang === 'ja' ? 'ja' : 'en';
    root.lang = current;
    document.querySelectorAll('[data-en],[data-en-html],[data-en-placeholder],[data-en-aria-label]').forEach(el => setText(el, current));
    if (root.dataset.titleEn || root.dataset.titleJa) {
      document.title = current === 'ja' ? (root.dataset.titleJa || root.dataset.titleEn || document.title)
                                        : (root.dataset.titleEn || document.title);
    }
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      const active = btn.getAttribute('data-set-lang') === current;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    try { localStorage.setItem(KEY, current); } catch (e) {}
  };

  const initial = (() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'ja' || saved === 'en') return saved;
    } catch (e) {}
    return 'en';
  })();

  document.querySelectorAll('[data-set-lang]').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-set-lang')));
  });

  applyLanguage(initial);
})();
