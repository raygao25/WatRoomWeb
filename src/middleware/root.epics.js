import { combineEpics } from 'redux-observable';
import searchAvailableRoomsEpic from './search.epics';


const rootEpic = combineEpics(searchAvailableRoomsEpic);

export default rootEpic;
