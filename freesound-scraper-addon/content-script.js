
function getElementByXPath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function createButton() {
  if (document.getElementById('freesound-scraper-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'freesound-scraper-btn';
  btn.innerText = 'Copy Mp3 Link';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const targetXPath = "/html/body/div[8]/div/div/div/div[1]/div[1]/div[1]";
    const targetElem = getElementByXPath(targetXPath);

    if (!targetElem) {
      alert("Cant find the sound 😢");
      return;
    }

    const mp3Link = targetElem.getAttribute('data-mp3');

    if (!mp3Link) {
      alert("The sound has no mp3 link 😢");
      return;
    }

    setClipboard(mp3.replace("-lq.mp3", "-hq.mp3"));
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
