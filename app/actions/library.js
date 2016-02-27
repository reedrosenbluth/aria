import albumArt from 'album-art';

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

function fetchData(state) {
  return fetch(`http://www.reddit.com/r/${subreddit}.json`)
    .then(req => req.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

export function fetchDataIfNeeded(reddit) {
  return (dispatch, getState) => {
    return dispatch(fetchData(getState()))
  }
}
