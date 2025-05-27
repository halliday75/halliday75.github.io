(function () {
  // --- Styles ---
  const style = document.createElement('style');
  style.textContent = `
    #slOverlay {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        background: #f9f9f9;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 999999;
        padding: 15px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
    }

    #slOverlay h1 {
        font-size: 16px;
        margin: 0 0 10px;
    }

    #slOverlay table {
        width: 100%;
        border-collapse: collapse;
    }

    #slOverlay th, #slOverlay td {
        padding: 8px;
        border-bottom: 1px solid #eee;
        text-align: left;
    }

    #slOverlay tr:hover {
        background-color: #f1f1f1;
    }

    #slOverlay input, #slOverlay button {
        margin: 5px 0;
    }

    #slOverlay input {
        width: 100%;
        padding: 6px;
        box-sizing: border-box;
    }

    #slOverlay button {
        background-color: #0066cc;
        color: white;
        border: none;
        padding: 8px 14px;
        margin-right: 8px;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
    }

    #slOverlay button:hover {
        background-color: #005bb5;
    }

    #slOverlayClose {
        float: right;
        cursor: pointer;
        font-weight: bold;
        font-size: 16px;
    }
  `;
  document.head.appendChild(style);

  // --- Utility: Extract Data from DOM ---
  function extractData() {
    let uid = null, locale = null, hashcodeData = [];

    for (let script of document.getElementsByTagName('script')) {
      if (script.innerHTML.includes('var slApiConfig')) {
        const uidMatch = script.innerHTML.match(/uid:"(.*?)"/);
        const localeMatch = script.innerHTML.match(/locale:"(.*?)"/);
        if (uidMatch && localeMatch) {
          uid = uidMatch[1];
          locale = localeMatch[1];
          break;
        }
      }
    }

    const elements = document.querySelectorAll('[sl-hashcode], [sl-html-hashcode]');
    elements.forEach(el => {
      const hashcode = el.getAttribute('sl-hashcode') || el.getAttribute('sl-html-hashcode');
      const value = el.textContent.trim();
      if (hashcode && !hashcode.includes(',')) {
        hashcodeData.push({ hashcode, value });
      }
    });

    return { uid, locale, hashcodeData };
  }

  // --- Highlighting ---
  function clearHighlights() {
    document.querySelectorAll('[data-sl-highlighted]').forEach(el => {
      el.style.backgroundColor = '';
      el.style.color = '';
      el.removeAttribute('data-sl-highlighted');
    });
  }

  function highlightHashcode(hashcode) {
    clearHighlights();
    const el = document.querySelector(`[sl-hashcode="${hashcode}"], [sl-html-hashcode="${hashcode}"]`);
    if (el) {
      el.style.backgroundColor = 'yellow';
      el.style.color = 'black';
      el.setAttribute('data-sl-highlighted', 'true');
      const rect = el.getBoundingClientRect();
      const offset = rect.top + window.scrollY - 200;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  // --- UI Creation ---
  const { uid, locale, hashcodeData } = extractData();
  const container = document.createElement('div');
  container.id = 'slOverlay';

  if (!uid || hashcodeData.length < 2) {
    container.innerHTML = `<div><strong>Error:</strong> UID not found or too few hashcodes.</div>`;
    document.body.appendChild(container);
    return;
  }

  const uniqueHashcodes = Array.from(new Set(hashcodeData.map(h => h.hashcode)))
    .map(hashcode => hashcodeData.find(h => h.hashcode === hashcode));

  let currentIndex = -1;

  container.innerHTML = `
    <div id="slOverlayClose" title="Close Overlay">✖</div>
    <h1>Smartling DCS String Review</h1>
    <div><strong>${uniqueHashcodes.length} Hashcodes</strong> on Page - 
      <a href="https://dashboard.smartling.com/app/projects/${uid}/strings/?${uniqueHashcodes.map(item => `hashcodes%5B%5D=${item.hashcode}`).join('&')}&limit=100&offset=0&localeIds%5B%5D=${locale}" target="_blank" rel="noreferrer">Show All in Dashboard</a>
    </div>
    <input type="text" id="slSearchInput" placeholder="Search hashcodes or values...">
    <div>
      <button id="slPrev">Previous</button>
      <button id="slNext">Next</button>
      <button id="slReset">Reset</button>
    </div>
    <table>
      <thead><tr><th>Hashcode</th><th>Value</th></tr></thead>
      <tbody id="slTableBody"></tbody>
    </table>
  `;
  document.body.appendChild(container);

  document.getElementById('slOverlayClose').onclick = () => container.remove();

  const tableBody = document.getElementById('slTableBody');
  uniqueHashcodes.forEach((item, index) => {
    const row = document.createElement('tr');
    const hashCell = document.createElement('td');
    const valCell = document.createElement('td');

    const link = document.createElement('a');
    link.href = `https://dashboard.smartling.com/app/projects/${uid}/strings/?hashcodes%5B%5D=${item.hashcode}&limit=100&offset=0&localeIds%5B%5D=${locale}`;
    link.target = '_blank';
    link.textContent = item.hashcode;
    hashCell.appendChild(link);

    valCell.textContent = item.value;
    valCell.style.cursor = 'pointer';
    valCell.onclick = () => {
      currentIndex = index;
      highlightHashcode(item.hashcode);
    };

    row.appendChild(hashCell);
    row.appendChild(valCell);
    tableBody.appendChild(row);
  });

  // --- Filtering ---
  document.getElementById('slSearchInput').addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    [...tableBody.children].forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
    });
  });

  // --- Navigation Buttons ---
  const nextBtn = document.getElementById('slNext');
  const prevBtn = document.getElementById('slPrev');
  const resetBtn = document.getElementById('slReset');
  const searchInput = document.getElementById('slSearchInput');

  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % uniqueHashcodes.length;
    const item = uniqueHashcodes[currentIndex];
    highlightHashcode(item.hashcode);
    searchInput.value = item.value;
    searchInput.dispatchEvent(new Event('input'));
  };

  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + uniqueHashcodes.length) % uniqueHashcodes.length;
    const item = uniqueHashcodes[currentIndex];
    highlightHashcode(item.hashcode);
    searchInput.value = item.value;
    searchInput.dispatchEvent(new Event('input'));
  };

  resetBtn.onclick = () => {
    currentIndex = -1;
    clearHighlights();
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') resetBtn.click();
  });
})();
