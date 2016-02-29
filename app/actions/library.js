import albumArt from 'album-art';

export const RECEIVE_DATA = 'RECEIVE_DATA'

function getArt(album) {
  return new Promise(function(resolve, reject) {
    albumArt(album.artist, album.album, 'mega', function(err, url) {
      if (err) {
        return reject(err);
      }
      resolve(url);
    });
  });
}

function getMagnetLink(album) {
  return tpb.search(album.artist + ' ' + album.album, {
    category: '100'
  }).then(function(results) {
    return results[0].magnetLink;
  }).catch(function(e) {
    console.log(e);
  });
}

function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data: data
  }
}

function fetchData(state) {
  var allArt = state.library.albums.map(getArt);
  return dispatch => {
    return Promise.all(allArt)
      .then(art => dispatch(receiveData(art)))
  }
}

export function fetchDataIfNeeded(reddit) {
  return (dispatch, getState) => {
    return dispatch(fetchData(getState()))
  }
}
