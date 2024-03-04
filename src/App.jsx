import './App.css';
import { useEffect, useReducer, useRef } from "react";
import { reducer } from './reducer';
import EventEmitter from 'event-emitter';
import { useThemeSettings } from './hooks/use-theme-settings';
import Navbar from './components/navbar';
import DialogBox from './components/dialog-box';
import EditorButtons from './components/EditorButtons/EditorButtons';

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
    enableCut,
    enableSplit
  } = state
  
  // ============> React-studio <=======================>

  function handleUpload(event){
    const file = event.target.files[0]
    if(!file){
      return;
    }
    uploadRef.current.value = '';
  }

  function handleAnnUpload(event){
    const file = event.target.files[0];
    if(!file){
      return;
    }
    uploadAnnRef.current.value = '';
  }
  function handleClick(event) {
    const { name } = event.target;

    switch (name) {
      case 'play':
        return ee.emit('play');
      case 'pause':
        return ee.emit('pause');
      case 'cursor':
        return ee.emit('statechange', 'cursor');
      case 'region':
        return ee.emit('statechange', 'select');
      case 'shift':
        return ee.emit('statechange', 'shift');
      case 'trim':
        return ee.emit('trim');
      case 'cut':
        ee.emit('cut');
        return dispatch({
          type: SET_ENABLE_CUT,
          payload: true,
        });
      case 'split':
        return ee.emit('split');
      case 'fadein':
        return ee.emit('statechange', 'fadein');
      case 'fadeout':
        return ee.emit('statechange', 'fadeout');
      case 'zoomin':
        return ee.emit('zoomin');
      case 'zoomout':
        return ee.emit('zoomout');
      case 'upload':
        return uploadRef.current.click();
      case 'download':
        return ee.emit('startaudiorendering', 'wav');
      case 'addAnnotation':
        return uploadAnnRef.current.click();
      case 'downloadAnnotation':
        return ee.emit('annotationsrequest');
      case 'clearAnnotations':
        return ee.emit('clearAnnotations');

      default:
        break;
    }
  }




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
        {dialogBox && <DialogBox open={dialogBox} />}
        <EditorButtons
          handleClick={handleClick}
          cutButton= { enableCut}
          disabled = { allButtons}
          splitButton ={ enableSplit}
          enableAnnotations={ enableAnnotations}
        />
        <div className='flex flex-col'>
          <input
            ref={uploadRef}
            type="file"
            accept= ".mp3, .wav"
            multiple = {false}
            onChange={handleUpload}
            className='hidden'
          />
          <input
            ref={uploadAnnRef}
            type="file"
            accept='.json'
            onChange={handleAnnUpload}
            className='hidden'
          />

        </div>
    </div>
  )
}

export default Editor;
