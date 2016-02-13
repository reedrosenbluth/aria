'use strict';

const _ = require('lodash');
const lame = require('lame');
const pump = require('pump');
const WebTorrent = require('webtorrent');
const Speaker = require('speaker');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain

let mainWindow;
let client = new WebTorrent()

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('http://127.0.0.1:3000/');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

var sortFile = function(a, b) {
  return a.name.localeCompare(b.name);
};

function isMp3(file) {
  return file.substr(-4) === '.mp3';
}

var decoder;
var speaker = new Speaker();

function playAlbum(files, i) {
  speaker = new Speaker();
  decoder = new lame.Decoder();
  
  var stream = files[i].createReadStream();
  
  pump(stream, decoder, function(err) {
    if (err) { console.log(err); }
  });
  
  pump(decoder, speaker, function(err) {
    if (err) {
      console.log(err);
    } else {
      playAlbum(files, i+1);
    }
  });
}

ipc.on('play-album', function(event, magnet) {
  speaker.close();
  
  client.add(magnet, function(torrent) {
    playAlbum(torrent.files.sort(sortFile), 0);
  });
});
