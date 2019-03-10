const domino = require('domino');
const fs = require('fs');
const template = fs.readFileSync('./dist/browser/index.html').toString();
const win = domino.createWindow(template);
const filesBrowser = fs.readdirSync(`${process.cwd()}/dist/browser`)

global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
global['document'] = win.document;
global['CSS'] = null;
global['Prism'] = null;

// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import { enableProdMode } from '@angular/core';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';
import { ROUTES } from './static.paths';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/server/main.js`);
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

const BROWSER_FOLDER = join(process.cwd(), 'dist/static');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync('./dist/browser/index.html', 'utf8');

let previousRender = Promise.resolve();

// Iterate each route path
ROUTES.forEach((route) => {
  const fullPath = join(BROWSER_FOLDER, route);

  // Make sure the directory structure is there
  if (!existsSync(fullPath)) {
    let syncpath = BROWSER_FOLDER;
    route.split('/').forEach((element) => {
      syncpath = syncpath + '/' + element;
      if (!fs.existsSync(syncpath)) {
        mkdirSync(syncpath);
      }
    });
  }

  // Writes rendered HTML to index.html, replacing the file if it already exists.
  previousRender = previousRender
    .then((_) =>
      renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [
          provideModuleMap(LAZY_MODULE_MAP),
          {
            provide: REQUEST,
            useValue: { cookie: '', headers: {} },
          },
          {
            provide: RESPONSE,
            useValue: {},
          }
        ],
      }),
    )
    .then((html) => writeFileSync(join(fullPath, 'index.html'), html));
});

// copy static files
filesBrowser.forEach(file => {
    if (file !== 'index.html') {
        fs.copyFileSync(`./dist/browser/${file}`, `./dist/static/${file}`);
    }
});