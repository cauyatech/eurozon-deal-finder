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
npm install --save-dev nodemon
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

### 4. Pour utiliser le projet, suivez simplement ces commandes

```bash
cd backend
npm run dev
```

Le projet se lancera sur l'adresse `http://localhost:3001`

---

## 📝 Exemple d'utilisation

Collez une URL Amazon du style :

```
https://www.amazon.fr/Samsung-Ecran-Odyssey-180Hz-R%C3%A9solution/dp/B0CW9HZKYW?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2MWNZXU6KW5Q1&dib=eyJ2IjoiMSJ9.O4mCjtJAHRGszBsGOqCOoEnbwtHlTbQSdbTZBOk5WgLulym5uVE3RH_Kb9PiCYhl_eTrAHiOAb1ky5Rlry3sjizp7Z3uifkqp3-zffQanuX6AB6RLsTy9HUXhe56yIkt7ZaG1ZmvliywwDakG33wTIOTpehTXCrm-lchIyK8zTy_lYepA1I3M_aAQj3XYh8OiUV4M7rl0UuPUPMpDXBww3y4kV_MKWpf-xlpBzxDwJxHc6NmDhB0Tn9Sicz41SkYvJdMmuB7ZcS33FtitEATLHeR6laE-GrYlIoZfLQEKeo.aUU3YaKMKYzn4QSZnMxIQuX8p1zob5h6BNImuvH0BvU&dib_tag=se&keywords=samsung+g5&qid=1747576066&sprefix=samsung+g5%2Caps%2C340&sr=8-2
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

## 🧑‍💻 Auteurs

Projet réalisé dans le cadre du module Hub à Epitech par SILVA DA COSTA Josselino

---

## 📜 Licence

MIT
