import './App.css';
import { useReducer, useRef } from "react";
import { reducer } from './reducer';
import EventEmitter from 'event-emitter';
import { useThemeSettings } from './hooks/use-theme-settings';
import Navbar from './components/navbar';

const  Editor = () => {

  const {
    theme,
    setEventEmitter,
    podcast,
    showAnnotations,
    setShowAnnotations,
    enableAnnotations,
    setEnableAnnotations,
    dialogBox,
    setDialogBox
  } = useThemeSettings();
  console.log()

  const { backgroundColor , textColor } = theme;


  const initailState = {
    ee: new EventEmitter(),
    uploadRef: useRef(null),
    uploadAnnRef: useRef(null),
    allButtons: true,
    enableCut: true,
    enableSplit: true,
    playlist: ()=> {},
  }

  const [ state, dispatch] = useReducer(reducer, initailState)
  const {
    ee,
    uploadRef,
    uploadAnnRef,
    allButtons,
    enanleCut,
    enableSplit
  } = state


  return (
    <div className = {
        `
        pt-0.5
        overflow-y-auto
        overflow-x-hidden
        h-screen
        w-screen
        `}
        style={{ backgroundColor: backgroundColor, color: textColor}}
    >
        <Navbar/>
      
    </div>
  )
}

export default Editor;
