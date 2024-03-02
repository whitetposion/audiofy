import './App.css';
import { useReducer, useRef } from "react";
import { reducer } from './reducer';
import EventEmitter from 'event-emitter';
import Box from './components/ui/box'

const Editor = () => {

  const {
    theme,
    podcast,
  } = 

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
    <Box className ="pt-10 overflow-y-auto overflow-x-hidden">
    </Box>
  )
}

export default Editor;
