// === CONFIG ===
// URL de ton scrapper — remplace par la tienne :
const SCRAPER_BASE = "https://freesound.org/people/";
// =================

// Fonction utilitaire pour trouver un élément via XPath
function getElementByXPath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Crée et insère le bouton
function createButton() {
  if (document.getElementById('freesound-scraper-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'freesound-scraper-btn';
  btn.innerText = 'Copy Link To Preview';
  btn.title = 'Récupérer le lien data-mp3 et ouvrir ton scrapper';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // XPath à cibler
    const targetXPath = "/html/body/div[8]/div/div/div/div[1]/div[1]/div[1]";
    const targetElem = getElementByXPath(targetXPath);

    if (!targetElem) {
      alert("❌ Impossible de trouver l’élément à ce XPath !");
      return;
    }

    // Récupère le lien dans l'attribut data-mp3
    const mp3Link = targetElem.getAttribute('data-mp3');

    if (!mp3Link) {
      alert("⚠️ L’attribut data-mp3 est introuvable !");
      return;
    }

    // Construit l’URL finale vers le scrapper
    const url = mp3Link;

    setClipboard(url);
    // Ouvre ton scrapper dans un nouvel onglet
  });

  document.body.appendChild(btn);
}


async function setClipboard(text) {
const type = "text/plain";
const clipboardItemData = {
    [type]: text,
};
const clipboardItem = new ClipboardItem(clipboardItemData);
await navigator.clipboard.write([clipboardItem]);
}


// Ajoute le bouton au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createButton);
} else {
  createButton();
}
