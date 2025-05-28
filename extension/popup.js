/*
** EPITECH PROJECT, 2025
** eurozon-deal-finder [WSL: Ubuntu]
** File description:
** popup
*/

document.getElementById('compare').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const asinMatch = tab.url.match(/(?:dp|product)\/([A-Z0-9]{10})/);
  if (!asinMatch) {
    document.getElementById('result').innerText = "ASIN introuvable sur cette page.";
    return;
  }

  const asin = asinMatch[1];
  const apiUrl = `https://eurozon-deal-finder.onrender.com/compare/${asin}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    if (!data.countries || !data.prices) {
      throw new Error('Format de réponse API invalide');
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "<strong>Prix détectés :</strong><br>" + data.countries.map(c => `${c.toUpperCase()}: ${data.prices[c]}`).join("<br>");
  } catch (error) {
    document.getElementById('result').innerText = `Erreur: ${error.message}`;
  }
});
