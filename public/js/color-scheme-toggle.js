const toggleButton = document.getElementById('color-scheme-toggle');
const themeTextMap = {
  'dark': '&#x263E;&nbsp;&nbsp;Dark Mode',
  'light': '&#x2600;&nbsp;&nbsp;Light Mode',
  'system': '&#x1F5A5;&nbsp;&nbsp;System Theme',
}
let currentTheme = null;

initTheme();
toggleButton.addEventListener('click', () => {
  doToggle();
});

function doToggle() {
  const themeKeys = Object.keys(themeTextMap)
  currentTheme = themeKeys[(themeKeys.indexOf(currentTheme) + 1) % themeKeys.length];
  localStorage.setItem('savedColorScheme', currentTheme)
  applyTheme(false);
}

function initTheme() {
  currentTheme = localStorage.getItem('savedColorScheme') || 'system';
  applyTheme(true)
}

function applyTheme(init) {
  let dataTheme = currentTheme
  if (dataTheme === 'system') {
    dataTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', dataTheme);
  toggleButton.innerHTML = themeTextMap[currentTheme];

  // wait for utterances to load and send it's first message.
  if (init === true) {
    addEventListener('message', event => {
      if (event.origin !== 'https://utteranc.es') {
        return;
      }
      notifyUtterances(dataTheme);
    });
  } else {
    notifyUtterances(dataTheme);
  }
}

function notifyUtterances(dataTheme) {
  const message = {
    type: 'set-theme',
    theme: 'github-' + dataTheme
  };
  const iframe = document.querySelector('.utterances-frame');
  iframe.contentWindow.postMessage(message, 'https://utteranc.es');
}