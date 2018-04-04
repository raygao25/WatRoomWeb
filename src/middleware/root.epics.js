import { combineEpics } from 'redux-observable';
import searchEpic from './search.epics';


const rootEpic = combineEpics(searchEpic);

export default rootEpic;
