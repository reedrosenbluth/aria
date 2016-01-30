'use strict';

const _ = require('lodash');
const lame = require('lame');
const pump = require('pump');
const torrentStream = require('torrent-stream');
const Speaker = require('speaker');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('http://127.0.0.1:3000/');

  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
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

function playAlbum(engine, files, i) {
  speaker = new Speaker();
  decoder = new lame.Decoder();
  
  var stream = engine.files[i].createReadStream();
  
  pump(stream, decoder, function(err) {
    if (err) { console.log(err); }
  });
  
  pump(decoder, speaker, function(err) {
    if (err) {
      console.log(err);
    } else {
      playAlbum(engine, files, i+1);
    }
  });
}

ipc.on('play-album', function(event, magnet) {
  speaker.close();
  let engine = torrentStream(magnet);
  
  engine.on('ready', function() {
    let files = engine.files.sort(sortFile);
    playAlbum(engine, files, 0);
  });
});
