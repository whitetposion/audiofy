export const SET_BUTTONS = 'SETBUTTONS';
export const SET_ENABLE_CUT = 'SETENABLECUT';
export const SET_ENABLE_SPLIT = 'SETENABLESPLIT';
export const PLAYLIST = 'PLAYLIST';

export function reducer(state , action){
     const { type , payload} = action;
     switch (type){
          case SET_BUTTONS:
               return {...state, allButtons: payload}
          case SET_ENABLE_CUT:
               return {...state, enableCut: payload}
          case SET_ENABLE_SPLIT:
               return {... state, enableSplit: payload}
          case PLAYLIST: 
               return {...state, playlist:payload}
          default:
               return state;
     }
}
