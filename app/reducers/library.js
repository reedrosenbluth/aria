import { RECEIVE_DATA } from '../actions/library';

export default function library(state = [], action) {
  switch (action.type) {
    case RECEIVE_DATA:
      console.log(state);
      console.log(action.data);
      const s = Object.assign({}, state);
      s.albums = s.albums.map((album, i) => {
        album.img = action.data[i];
        return album;
      });
      console.log(s);
      return s;
    default:
      return state;
  }
}
