# Eurozon Deal Finder

Eurozon Deal Finder est une application web qui permet de comparer automatiquement les prix d'un même produit Amazon entre plusieurs pays européens à partir d'une simple URL. Le projet est divisé en deux parties : un frontend React et un backend Node.js avec Express et Puppeteer.

---

## 🚀 Fonctionnalités

* Extraction automatique de l'ASIN depuis une URL Amazon
* Scraping des prix sur Amazon.fr, Amazon.de (extensible à d'autres pays)
* Affichage comparatif des prix dans un tableau trié
* Lien direct vers la page du produit
* Affichage du nom du produit par pays

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
npm run dev
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

## 📝 Exemple d'utilisation

Collez une URL Amazon du style :

```
https://www.amazon.fr/dp/B0CW9HZKYW
```

Cliquez sur "Comparer" → les prix s'affichent en tableau avec lien direct par pays.

---

## ✅ À venir

* Intégration Amazon.it, Amazon.es, Amazon.be
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

## 🧑‍💻 Auteurs

Projet réalisé dans le cadre d’un module Hub à Epitech.

---

## 📜 Licence

MIT
