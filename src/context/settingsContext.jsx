import { createContext, useEffect ,useReducer } from "react";
import { dark , light} from '../theme/index'

const THEME_DARK = 'THEME_DARK';
const THEME_LIGHT = 'THEME_LIGHT';

const CONTEXT_MENU = 'CONTEXT_MENU';
const CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU';
const KEY_PRESS = 'KEY_PRESS';
const EVENT_EMITTER = 'EVENT_EMITTER';
const PROJECT_TITLE = 'PROJECT_TITLE';
const SETSHOWANNOTATIONS = 'SETSHOWANNOTATIONS';
const SETENEABLEANNOTATIONS = 'SETENEABLEANNOTATIONS';
const ANNOTATIONS = 'ANNOTATIONS';
const SETDIALOGBOX = 'SETDIALOGBOX';

const mode = localStorage.getItem('mode')
const initailState = {
     project: '',
     theme: {
          mode: mode ? mode : 'dark',
          backgroundColor: mode ==='light' ? light :dark ,
          textColor: mode ==='light' ? dark :light 
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
               localStorage.setItem('mode', 'dark')
               return {
                    ...state,
                    theme: {mode:'dark', backgroundColor: dark , textColor: light},
               };
          case THEME_LIGHT:
               localStorage.setItem('mode', 'light')
               return {
                    ...state,
                    theme: {mode:'light', backgroundColor: light , textColor: dark},
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
          case PROJECT_TITLE:
               return { ...state, project: payload };
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

const ThemeSettings = createContext({
     ...initailState,
})

export const SettingContext = ({ children}) => {
     const [state, dispatch] = useReducer(reducer, initailState);

     const setEventEmitter = (payload) =>{
          dispatch({
               type: EVENT_EMITTER,
               payload,
          })
     };

     const themeMode = (value)=> {
          const { mode } = state.theme;
          if(value === 'light'){
               return dispatch({ type: THEME_LIGHT})
          }
          dispatch({type: THEME_DARK})
     };

     const closeContextMenu = () => {
          dispatch({
               type: CLOSE_CONTEXT_MENU
          })
     };

     const changeTitle = (value) => {
          dispatch({
               type: PROJECT_TITLE,
               payload: value
          })
     };

     const setAnnotations = (value) => {
          dispatch({
               type: ANNOTATIONS,
               payload: value
          })
     };

     const setShowAnnotations = (value) =>{
          dispatch({
               type: SETSHOWANNOTATIONS,
               payload: value
          })
     };

     const setEnableAnnotations = (value) => {
          dispatch({
               type: SETENEABLEANNOTATIONS,
               payload: value,
          })
     };

     const setDialogBox = (value) => {
          dispatch({
               type: SETDIALOGBOX,
               payload: value
          });
     };

     ///insert useEffect later here
     useEffect(() => {
          // context menu event listener
          const editor = document.getElementById('editor');
          editor.oncontextmenu = (e) => {
            e.preventDefault();
            const { clientX, clientY } = e;
            const display = true;
            const value = { clientX, clientY, display };
            dispatch({
              type: CONTEXT_MENU,
              payload: value,
            });
          };
      
          // on key press event listener
          window.onkeydown = (event) => {
            const { key, shiftKey, code } = event;
            dispatch({
              type: KEY_PRESS,
              payload: { key, shiftKey, code },
            });
          };
        }, []);

     const {
          theme : {mode , backgroundColor},
     } = state
     
     // const theme = ({
     //      palette :{
     //           mode,
     //           background : {
     //                default: backgroundColor
     //           },
     //      },
     // });

     return (
          <ThemeSettings.Provider
               value={{
                    ...state,
                    themeMode,
                    closeContextMenu,
                    setEventEmitter,
                    changeTitle,
                    setAnnotations,
                    setEnableAnnotations,
                    setDialogBox,
               }}
          >
               {/* insert contextMenu Component */}
               {children}

          </ThemeSettings.Provider>
          

     )
}    

export default ThemeSettings;