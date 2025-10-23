
const SCRAPER_BASE = "https://freesound.org/people/";


function getElementByXPath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function createButton() {
  if (document.getElementById('freesound-scraper-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'freesound-scraper-btn';
  btn.innerText = 'Copy Link To Preview';
  btn.title = 'Récupérer le lien data-mp3 et ouvrir ton scrapper';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const targetXPath = "/html/body/div[8]/div/div/div/div[1]/div[1]/div[1]";
    const targetElem = getElementByXPath(targetXPath);

    if (!targetElem) {
      alert("❌ Impossible de trouver l’élément à ce XPath !");
      return;
    }

    const mp3Link = targetElem.getAttribute('data-mp3');

    if (!mp3Link) {
      alert("⚠️ L’attribut data-mp3 est introuvable !");
      return;
    }

    const url = mp3Link;

    setClipboard(url);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createButton);
} else {
  createButton();
}
