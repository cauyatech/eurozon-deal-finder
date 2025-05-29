/*
** EPITECH PROJECT, 2025
** eurozon-deal-finder [WSL: Ubuntu]
** File description:
** index
*/

console.log("Fichier lancé !");

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const scrapeAmazonFR = require('./scrapers/amazonFR');
const scrapeAmazonDE = require('./scrapers/amazonDE');
const scrapeAmazonES = require('./scrapers/amazonES');
const scrapeAmazonIT = require('./scrapers/amazonIT');
const scrapeAmazonBE = require('./scrapers/amazonBE');
const path = require('path');

app.use(cors());

app.get('/compare/:asin', async (req, res) => {
    const {asin} = req.params;
    try {
        const frData = await scrapeAmazonFR(asin);
        const deData = await scrapeAmazonDE(asin);
        const esData = await scrapeAmazonES(asin);
        const itData = await scrapeAmazonIT(asin);
        const beData = await scrapeAmazonBE(asin);

        res.json({
            asin,
            countries: ['fr', 'de', 'es', 'it', 'be'],
            prices: {
                fr: frData.price || 'Prix indisponible.',
                de: deData.price || 'Prix indisponible.',
                es: esData.price || 'Prix indisponible.',
                it: itData.price || 'Prix indisponible.',
                be: beData.price || 'Prix indisponible.'
            },
            titles: {
                fr: frData.title || 'Produit non trouvé dans ce pays.',
                de: deData.title || 'Produit non trouvé dans ce pays.',
                es: esData.title || 'Produit non trouvé dans ce pays.',
                it: itData.title || 'Produit non trouvé dans ce pays.',
                be: beData.title || 'Produit non trouvé dans ce pays.'
            },
            links: {
                fr: frData.price ? `https://www.amazon.fr/dp/${asin}` : null,
                de: deData.price ? `https://www.amazon.de/dp/${asin}` : null,
                es: esData.price ? `https://www.amazon.es/dp/${asin}` : null,
                it: itData.price ? `https://www.amazon.it/dp/${asin}` : null,
                be: beData.price ? `https://www.amazon.com.be/dp/${asin}` : null
            }
        });
    } catch (err) {
        console.error("Erreur de scraping:", err);
        res.status(500).json({error: "Erreur de scraping sur amazon"});
    }
});

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur cette adresse acutellement: http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
