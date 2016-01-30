var ipc = require("electron").ipcRenderer;

window.onload = function() {
  var albums = document.getElementsByClassName('album');
  for (var i = 0; i < albums.length; i++) {
    albums[i].addEventListener('click', function() {
      ipc.send('play-album', this.dataset.magnet);
    });
  }
};
