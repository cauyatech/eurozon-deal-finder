/*
** EPITECH PROJECT, 2025
** eurozon-deal-finder [WSL: Ubuntu]
** File description:
** App
*/

import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);

  const extractASIN = (url) => {
    const match = url.match(/(?:dp|product)\/([A-Z0-9]{10})/);
    return match ? match[1] : null;
  };

  const handleCompare = async () => {
    const asin = extractASIN(url);
    if (!asin) return alert("ASIN invalide");

    const response = await fetch(`http://localhost:3001/compare/${asin}`);
    const result = await response.json();
    setData(result);
  };

  const ascPrice = (priceStr) => {
    if (!priceStr || typeof priceStr !== 'string') return Infinity;
    const match = priceStr.match(/([0-9]+[,.]?[0-9]*)/);
    if (!match) return Infinity;
    return parseFloat(match[1].replace(',', '.'));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Eurozon Deal Finder</h1>
      <input
        type="text"
        placeholder="Mettez une URL Amazon"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleCompare}>Comparer</button>

      {data && (
        <div style={{ marginTop: 20 }}>
          <h2>Résultats pour ASIN: {data.asin}</h2>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Pays</th>
                <th>Nom du produit</th>
                <th>Prix</th>
                <th>Lien</th>
              </tr>
            </thead>
            <tbody>
              {[...data.countries].sort((a, b) => {
                return ascPrice(data.prices[a]) - ascPrice(data.prices[b]);
              }).map((country, index, sorted) => {
                const cheapest = sorted[0];
                return (
                  <tr
                    key={country}
                    style={{ backgroundColor: country === cheapest ? '#d1ffd1' : 'inherit' }}
                  >
                    <td>{country.toUpperCase()}</td>
                    <td>{data.titles[country]}</td>
                    <td>{data.prices[country]}</td>
                    <td>
                      {data.links[country] ? (
                        <a
                          href={data.links[country]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Voir le produit
                        </a>
                      ) : (
                        'Non disponible'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
