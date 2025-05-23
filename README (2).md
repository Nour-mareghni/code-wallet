# 💼 Configuration de l'application Code Wallet avec Vite + React + Electron

Ce document décrit toutes les étapes nécessaires pour construire et convertir l'application web Code Wallet en une application de bureau multiplateforme avec Electron.

## 📦 Technologies utilisées

- **Frontend**: React + Vite  
- **Éditeur de code**: CodeMirror 6 (remplace Monaco Editor pour une meilleure compatibilité)  
- **Runtime bureau**: Electron  
- **Stockage local**: localStorage  

## 🛠 Configuration initiale (Vite + React)

### Créer le projet :

```bash
npm create vite@latest code-wallet -- --template react
cd code-wallet
npm install
Développer l'application React :
Création, modification, suppression de snippets

Système d'étiquettes réutilisables

Aperçu du code avec CodeMirror

Recherche par étiquette

Mode sombre / clair

Sauvegarde locale avec localStorage

Page d'information à propos de l'application

🧱 Intégration d'Electron pour support bureau
1. Installer Electron
bash
npm install --save-dev electron
2. Créer le fichier d'entrée Electron
Fichier : electron/main.js

javascript
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width:
dont write in the chat i want it all md
Here's the complete Markdown file as requested. You can copy this into a .md file:

markdown
# 💼 Configuration de l'application Code Wallet avec Vite + React + Electron

Ce document décrit toutes les étapes nécessaires pour construire et convertir l'application web Code Wallet en une application de bureau multiplateforme avec Electron.

## 📦 Technologies utilisées

- **Frontend**: React + Vite
- **Éditeur de code**: CodeMirror 6 (remplace Monaco Editor pour une meilleure compatibilité)
- **Runtime bureau**: Electron
- **Stockage local**: localStorage

## 🛠 Configuration initiale (Vite + React)

### Créer le projet :

```bash
npm create vite@latest code-wallet -- --template react
cd code-wallet
npm install
Développer l'application React :
Création, modification, suppression de snippets

Système d'étiquettes réutilisables

Aperçu du code avec CodeMirror

Recherche par étiquette

Mode sombre / clair

Sauvegarde locale avec localStorage

Page d'information à propos de l'application

🧱 Intégration d'Electron pour support bureau
1. Installer Electron
bash
npm install --save-dev electron
2. Créer le fichier d'entrée Electron
Fichier : electron/main.js

javascript
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
3. Modifier package.json
json
"main": "electron/main.js",
"type": "module",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "electron": "npm run build && electron .",
  "electron-dev": "concurrently -k \"vite\" \"wait-on http://localhost:5173 && electron .\""
}
4. Installer les outils supplémentaires
bash
npm install --save-dev concurrently wait-on
🧠 Intégration de l'éditeur de code (CodeMirror)
Installation
bash
npm install @uiw/react-codemirror \
            @codemirror/lang-javascript \
            @codemirror/lang-python \
            @codemirror/theme-one-dark
Utilisation dans SnippetForm.jsx
jsx
<CodeMirror
  value={code}
  height="500px"
  theme={oneDark}
  extensions={[javascript()]}
  onChange={(value) => setCode(value)}
  basicSetup={{ lineNumbers: true }}
/>
Utilisation dans SnippetPreview.jsx
jsx
<CodeMirror
  value={snippet.code}
  height="100%"
  theme={oneDark}
  extensions={[javascript()]}
  editable={false}
  basicSetup={{ lineNumbers: true }}
/>
🧪 Lancer l'application
En mode Web (développement)
bash
npm run dev
En mode Bureau (développement)
bash
npm run electron-dev
(Cela lance le serveur Vite et ouvre Electron dès qu'il est prêt)

En mode Bureau (production)
bash
npm run electron
(Cela construit l'application et la charge dans Electron)

✅ Fonctionnalités prises en charge
Ajout, modification et suppression de snippets

Gestion des étiquettes réutilisables

Mode clair / sombre

Import de fichiers par glisser-déposer

Aperçu de code

Persistance locale avec localStorage

Version bureau grâce à Electron

🚀 Étapes suivantes (facultatif)
Créer un exécutable avec electron-builder

Ajouter export/import JSON

Support multi-langage (PHP, C++, etc.)

Synchronisation cloud via Firebase (optionnel)

lien github : https://github.com/Nour-mareghni/code-wallet