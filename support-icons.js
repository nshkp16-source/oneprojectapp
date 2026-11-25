(function () {
  var paths = {
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    bldg: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    brain: '<path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.852 4.632"/><path d="M18 18a4 4 0 0 0 1.967-7.516"/><path d="M14 21a4 4 0 0 0 4-4"/><path d="M10 21a4 4 0 0 1-4-4"/><path d="M6.003 5.125a4 4 0 0 1-2.852 4.632"/><path d="M6 18a4 4 0 0 1-1.967-7.516"/>',
    cal: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    clip: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    fileStack: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 13H8"/><path d="M16 17H8"/><path d="M16 13h-2"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    hammer: '<path d="m15 12-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 6.7-1.61 1.6"/><path d="m15.53 12.07 4.24 4.24"/><path d="m17.64 15 4.24-4.24"/><path d="m14.1 9.64 4.24 4.24"/><path d="m14.1 9.64 4.24-4.24a2.12 2.12 0 0 1 3 3l-4.24 4.24"/>',
    handshake: '<path d="m11 17 2 2a2 2 0 0 0 3-3"/><path d="m14 14 2 2a2 2 0 1 0 3-3l-3.5-3.5"/><path d="m3 11 2-2 5 5a2 2 0 0 0 3-3l-2-2"/><path d="M2 12V6l6-3 4 3 3-2 7 4v5"/>',
    home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9"/><path d="M9 21v-7h6v7"/>',
    inbox: '<path d="M4 4h16l2 8v8H2v-8l2-8Z"/><path d="M2 12h6a4 4 0 0 0 8 0h6"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
    lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14a6 6 0 1 0-6.18 0c.52.42.91 1.02 1.09 1.68h4c.18-.66.57-1.26 1.09-1.68Z"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/>',
    stop: '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    wrench: '<path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L14 12l-2-2z"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l8.4-10.4A.5.5 0 0 1 12.5 2l-1.4 7H20a1 1 0 0 1 .78 1.63l-8.4 10.4A.5.5 0 0 1 11.5 21l1.4-7H4Z"/>',
  };
  var icons = {
    '⚠': 'alert', '🔔': 'bell', '🏢': 'bldg', '📅': 'cal', '📊': 'chart',
    '📈': 'chart', '✅': 'check', '📋': 'clip', '📄': 'file', '📑': 'fileStack',
    '📁': 'folder', '📂': 'folder', '🌐': 'globe', '🔨': 'hammer', '🤝': 'handshake',
    '🏠': 'home', '📭': 'inbox', '🔑': 'key', '💡': 'lightbulb', '🔒': 'lock',
    '✉': 'mail', '💬': 'message', '🔁': 'refresh', '🔄': 'refresh', '🚀': 'rocket',
    '🔍': 'search', '🔎': 'search', '⚙': 'settings', '🛑': 'stop', '👥': 'users',
    '👤': 'user', '👋': 'user', '👷': 'user', '🧠': 'brain', '🔧': 'wrench',
    '🛠': 'wrench', '⚡': 'zap', '➕': 'plus', '✏': 'pen', '📝': 'pen', '🏗': 'bldg',
    '⏳': 'clock', '💾': 'save',
  };
  var clock = '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>';
  var plus = '<path d="M5 12h14"/><path d="M12 5v14"/>';
  var pen = '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>';
  var save = '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>';
  paths.clock = clock;
  paths.plus = plus;
  paths.pen = pen;
  paths.save = save;

  var keys = Object.keys(icons).sort(function (a, b) { return b.length - a.length; });
  var source = '(' + keys.join('|') + ')\\uFE0F?';
  var globalPattern = new RegExp(source, 'g');
  var textPattern = new RegExp(source);
  var skipTags = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, OPTION: 1, TITLE: 1, INPUT: 1, NOSCRIPT: 1, SVG: 1 };

  function skipped(node) {
    for (var element = node.parentNode; element && element.nodeType === 1; element = element.parentNode) {
      if (skipTags[element.tagName.toUpperCase()] || element.isContentEditable || element.className === 'oi') return true;
    }
    return false;
  }

  function replaceText(node) {
    var value = node.nodeValue;
    if (!value || !textPattern.test(value) || skipped(node)) return;
    var fragment = document.createDocumentFragment(), last = 0, match;
    globalPattern.lastIndex = 0;
    while ((match = globalPattern.exec(value))) {
      if (match.index > last) fragment.appendChild(document.createTextNode(value.slice(last, match.index)));
      var span = document.createElement('span');
      span.className = 'oi';
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + paths[icons[match[1]]] + '</svg>';
      fragment.appendChild(span);
      last = match.index + match[0].length;
    }
    if (last < value.length) fragment.appendChild(document.createTextNode(value.slice(last)));
    if (node.parentNode) node.parentNode.replaceChild(fragment, node);
  }

  function walk(root) {
    if (root.nodeType === 3) {
      replaceText(root);
      return;
    }
    if (root.nodeType !== 1) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [], node;
    while ((node = walker.nextNode())) if (textPattern.test(node.nodeValue || '')) nodes.push(node);
    nodes.forEach(replaceText);
  }

  window.opaIcons = walk;
  var style = document.createElement('style');
  style.textContent = '.oi{display:inline-flex;width:1em;height:1em;vertical-align:-.14em;flex-shrink:0;line-height:1}.oi svg{width:100%;height:100%;display:block}';
  document.head.appendChild(style);
  new MutationObserver(function (records) {
    records.forEach(function (record) {
      if (record.type === 'characterData') replaceText(record.target);
      else record.addedNodes.forEach(walk);
    });
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  document.addEventListener('DOMContentLoaded', function () { walk(document.body); });
})();
