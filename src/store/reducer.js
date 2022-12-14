import { combineReducers } from 'redux-immutable';

import { reducer as recommendReducer } from "../pages/discover/c-pages/recommend/store";
import { reducer as songDetailReducer } from "../pages/discover/c-pages/song-detail/store";
import { reducer as songListDetailReducer } from "../pages/discover/c-pages/song-list-details/store";
import { reducer as loginReducer } from "../components/login-dialog/store";
import { reducer as playerReducer } from "../components/player/store";
import { reducer as albumDetailsReducer } from "../pages/discover/c-pages/album-details/store";
import { reducer as songListReducer } from "../pages/discover/c-pages/song-sheet/store";
import { reducer as newDiscReducer } from "../pages/discover/c-pages/new-disc/store";
import { reducer as topListReducer } from "../pages/discover/c-pages/ranking-list/store";
import { reducer as singerReducer } from "../pages/discover/c-pages/singer/store";
import { reducer as djReducer } from "../pages/discover/c-pages/anchor-station/store";
import { reducer as profileReducer } from "../pages/profile/store";

const cReducer = combineReducers({
  recommend: recommendReducer,
  songDetail: songDetailReducer,
  songList: songListReducer,
  songListDetails: songListDetailReducer,
  login: loginReducer,
  player: playerReducer,
  albumDetails: albumDetailsReducer,
  newDisc: newDiscReducer,
  topList: topListReducer,
  singer: singerReducer,
  dj: djReducer,
  profile: profileReducer,
})

export default cReducer 