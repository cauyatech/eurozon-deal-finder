# Eurozon Deal Finder

Eurozon Deal Finder est une application web qui permet de comparer automatiquement les prix d'un même produit Amazon entre plusieurs pays européens à partir d'une simple URL.

---

## 🚀 Fonctionnalités

* Extraction automatique de l'ASIN depuis une URL Amazon
* Scraping des prix sur Amazon.fr, Amazon.de, Amazon.it, Amazon.es, Amazon.be.
* Affichage comparatif des prix dans un tableau trié
* Lien direct vers la page du produit
* Affichage du nom du produit par pays
* Frais de port estimés
* Historique de recherche

---

## 📦 Technologies utilisées

* Frontend : React (Create React App)
* Backend : Node.js + Express
* Scraping : Puppeteer

---

## 🛠 Installation

### 1. Clone du projet

```bash
git clone https://github.com/ton-pseudo/eurozon-deal-finder.git
cd eurozon-deal-finder
```

### 2. Installation backend

```bash
cd backend
npm install
node index.js
```

Le backend sera disponible sur `http://localhost:3001`

### 3. Installation frontend

```bash
cd ../frontend
npm install
npm start
```

Le frontend sera disponible sur `http://localhost:3000`

---

### 4. Pour utiliser le projet, suivez simplement ces commandes

Car le backend a été relié au frontend.

```bash
cd backend
node index.js
```

Le projet se lancera sur l'adresse `http://localhost:3001`

---

## 📝 Exemple d'utilisation

Collez une URL Amazon du style :

```
https://www.amazon.fr/-/en/Gaming-Monitor-1920x1080-Frameless-DisplayPort/dp/B0BV6TD7DM?crid=2UWQWXO5B1WTJ&dib=eyJ2IjoiMSJ9.qoS9meibc-illnszq7SXuEdfHiiQLzibs2NKnTZjret8JZkg8bzLymBOovRwyoyM40dYyT4KVz-mpNwy992SqQeHkOfza_bySuw8Ypezg67jBeE75WHImN_txClAS1uoBRxJmQn2GdBaR30UNBR0iTQIS7xkb34C0-BF2f9SBErxJepEz8ePTgnRpurQc0N2CfAw8VqCwfwiW-nQguQUkGpv0QW0bwWTEnPJ5HWfjOEPOFrED6Gz6OyYFLhR8teTKb1Y0MCiqmKPuobXOs7cVKx8l7oe1J-sdK_Vb2vvJ3U.uJo36y3b3hw0yowLlYX8GNlvbuQhdehlY86wSuvd20U&dib_tag=se&keywords=300hz&qid=1750869817&s=computers&sprefix=300hz%2Ccomputers%2C91&sr=1-13
```

Cliquez sur "Comparer" → les prix s'affichent en tableau avec lien direct par pays.

---

## ✅ À venir

* Système d'alerte de baisse de prix
* Extension Chrome

---

## 📁 Structure du projet

```
eurozon-deal-finder/
├── backend/
│   ├── index.js
│   ├── scrapers/
│   │   ├── amazonFR.js
│   │   └── amazonDE.js
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
```
---

## 📜 Licence

MIT
