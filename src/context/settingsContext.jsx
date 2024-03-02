import { createContext, useEffect ,useReducer } from "react";
import { dark , light} from '../theme/index'

const THEME_DARK = 'THEME_DARK';
const THEME_LIGHT = 'THEME_LIGHT';

const CONTEXT_MENU = 'CONTEXT_MENU';
const CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU';
const KEY_PRESS = 'KEY_PRESS';
const EVENT_EMITTER = 'EVENT_EMITTER';
const PODCAST_TITLE = 'PODCAST_TITLE';
const SETSHOWANNOTATIONS = 'SETSHOWANNOTATIONS';
const SETENEABLEANNOTATIONS = 'SETENEABLEANNOTATIONS';
const ANNOTATIONS = 'ANNOTATIONS';
const SETDIALOGBOX = 'SETDIALOGBOX';

const initailState = {
     podcast: 'Podcast',
     theme: {
          mode: 'dark',
          backgroundColor: dark,
          textColor: 'white'
     },
     contextMenu: {
          clientX: 0,
          clientY: 0,
          display: false
     },
     keyPress: {
          key: '',
          shiftKey: false,
     },
     event_emitter: null,
     showAnnotations:false,
     enableAnnotations: false,
     annotations: [],
     dialogBox:false
}

function reducer(state , action){
     const {type, payload} = action;

     switch(type) {
          case THEME_DARK:
               return {
                    ...state,
                    theme: {mode:'dark', backgroundColor: dark , textColor: 'white'},
               };
          case THEME_LIGHT:
               return {
                    ...state,
                    theme: {mode:'light', backgroundColor: light , textColor: 'black'},
               };
          case CONTEXT_MENU:
               return {
                    ...state,
                    contextMenu:payload
               }
          case CLOSE_CONTEXT_MENU:
               return {
                    ...state,
                    contextMenu: {
                         ...state.contextMenu,
                         display: false
                    }
               }
          case KEY_PRESS:
               return { ...state, keyPress: payload };
          case EVENT_EMITTER:
               return { ...state, event_Emitter: payload };
          case PODCAST_TITLE:
               return { ...state, podcast: payload };
          case ANNOTATIONS:
               return { ...state, annotations: payload };
          case SETSHOWANNOTATIONS:
               return { ...state, showAnnotations: payload };
          case SETENEABLEANNOTATIONS:
               return { ...state, enableAnnotations: payload };
          case SETDIALOGBOX:
               return { ...state, dialogBox: payload };
          default:
               return state;
          
     }
}

