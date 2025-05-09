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
          {data.countries.map((country) => (
            <div key={country} style={{ marginBottom: '1rem' }}>
              <h3>{country.toUpperCase()} - {data.titles[country]}</h3>
              <p>Prix : {data.prices[country]}</p>
              {data.links[country]&& (
              <a
                href={data.links[country]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le produit sur Amazon.{country}
              </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
