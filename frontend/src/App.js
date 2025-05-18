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
    <div style={{ padding: 20, fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ color: '#1a1a1a', textAlign: 'center' }}>💶 Eurozon Deal Finder</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Mettez une URL Amazon"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ maxWidth: '100%', width: '300px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleCompare}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Comparer
        </button>
      </div>

      {data && (
        <div style={{ marginTop: 30, overflowX: 'auto' }}>
          <h2 style={{ color: '#333', textAlign: 'center' }}>📦 Résultats pour ASIN: <span style={{ color: '#0070f3' }}>{data.asin}</span></h2>
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', marginTop: '1rem', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
            <thead style={{ backgroundColor: '#f0f0f0' }}>
              <tr>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Pays</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nom du produit</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Prix</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Lien</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Alerte</th>
              </tr>
            </thead>
            <tbody>
              {[...data.countries].sort((a, b) => ascPrice(data.prices[a]) - ascPrice(data.prices[b])).map((country, index, sorted) => {
                const cheapest = sorted[0];
                return (
                  <tr key={country} style={{ backgroundColor: country === cheapest ? '#d1ffd1' : 'inherit' }}>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{country.toUpperCase()}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.titles[country]}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{data.prices[country]}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                      {data.links[country] ? (
                        <a
                          href={data.links[country]}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#0070f3', textDecoration: 'none' }}
                        >
                          Voir le produit
                        </a>
                      ) : (
                        'Non dispo'
                      )}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                      {data.alerts && data.alerts[country] ? (
                        <span style={{ color: 'red', fontWeight: 'bold' }}>⬇ Prix en baisse</span>
                      ) : ''}
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
