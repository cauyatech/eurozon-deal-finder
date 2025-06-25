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
const fs = require('fs');

app.use(cors());

app.get('/compare/:asin', async (req, res) => {
    const {asin} = req.params;
    try {
        const frData = await scrapeAmazonFR(asin);
        const deData = await scrapeAmazonDE(asin);
        const esData = await scrapeAmazonES(asin);
        const itData = await scrapeAmazonIT(asin);
        const beData = await scrapeAmazonBE(asin);

        // Calcul du prix total (prix + frais de port)
        function parsePrice(priceStr) {
            if (!priceStr) return null;
            // Extrait le nombre (ex: "12,34 €" ou "12.34€")
            const match = priceStr.replace(',', '.').match(/([0-9]+(\.[0-9]{1,2})?)/);
            return match ? parseFloat(match[1]) : null;
        }
        function parseFrais(fraisStr) {
            if (!fraisStr) return 0;
            const match = fraisStr.replace(',', '.').match(/([0-9]+(\.[0-9]{1,2})?)/);
            return match ? parseFloat(match[1]) : 0;
        }
        const countries = ['fr', 'de', 'es', 'it', 'be'];
        const datas = { fr: frData, de: deData, es: esData, it: itData, be: beData };
        const prices = {};
        const fraisPorts = {};
        const prixTotals = {};
        const titles = {};
        const links = {};
        countries.forEach(country => {
            prices[country] = datas[country].price || 'Prix indisponible.';
            fraisPorts[country] = datas[country].fraisPortEstime || 'Frais indisponibles.';
            const prixNum = parsePrice(datas[country].price);
            const fraisNum = parseFrais(datas[country].fraisPortEstime);
            prixTotals[country] = (prixNum !== null && fraisNum !== null) ? (prixNum + fraisNum).toFixed(2) + '€' : 'Total indisponible.';
            titles[country] = datas[country].title || 'Produit non trouvé dans ce pays.';
            if (datas[country].price) {
                if (country === 'fr') links[country] = `https://www.amazon.fr/dp/${asin}`;
                if (country === 'de') links[country] = `https://www.amazon.de/dp/${asin}`;
                if (country === 'es') links[country] = `https://www.amazon.es/dp/${asin}`;
                if (country === 'it') links[country] = `https://www.amazon.it/dp/${asin}`;
                if (country === 'be') links[country] = `https://www.amazon.com.be/dp/${asin}`;
            } else {
                links[country] = null;
            }
        });

        // Historique de recherche local (10 derniers produits)
        const historyPath = path.join(__dirname, 'search_history.json');
        let history = [];
        if (fs.existsSync(historyPath)) {
            try {
                history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));
            } catch (e) { history = []; }
        }
        // On ajoute la nouvelle recherche en tête
        history.unshift({
            asin,
            date: new Date().toISOString(),
            titles,
            prices,
            fraisPorts,
            prixTotals,
            links
        });
        // On garde les 10 plus récents
        history = history.slice(0, 10);
        fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));

        res.json({
            asin,
            countries,
            prices,
            fraisPorts,
            prixTotals,
            titles,
            links
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
