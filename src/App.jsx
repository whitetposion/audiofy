// Global import 
import EventEmitter from 'event-emitter';
import ReactStudio from 'react-studio-js'
import * as Tone from 'tone'
import { v4 as uuidv4} from 'uuid'
import { saveAs } from 'file-saver'
import { useCallback, useEffect, useReducer, useRef } from "react";

// Local imports
import './App.css';
import Navbar from '@/components/navbar';
import DialogBox from '@/components/dialog-box';
import EditorButtons from '@/components/EditorButtons/EditorButtons';
import CustomTimeLine from '@/components/audiobar/CustomAudioBar';
import Instrumentals from '@/components/Instrumental/Instruments';
import { PLAYLIST, SET_BUTTONS, SET_ENABLE_CUT, SET_ENABLE_SPLIT, reducer } from '@/reducer';
import { useThemeSettings } from '@/hooks/use-theme-settings';
import { dark, light } from '@/theme';

const  Editor = () => {
  // use context for getting states and functions
  const {
    theme,
    setEventEmitter,
    project,
    showAnnotations,
    setShowAnnotations,
    enableAnnotations,
    setEnableAnnotations,
    dialogBox,
    setDialogBox
  } = useThemeSettings();

  const { mode , backgroundColor , textColor } = theme;

  const initailState = {
    ee: new EventEmitter(),
    toneCtx: Tone.getContext(),
    setUpChain: useRef(),
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
    toneCtx,
    setUpChain,
    uploadRef,
    uploadAnnRef,
    allButtons,
    enableCut,
    enableSplit
  } = state
  

// Todo, handle annotations
  function handleAnnUpload(event){
    const file = event.target.files[0];
    if(!file){
      return;
    }
    uploadAnnRef.current.value = '';
  }
  // Todo integrate actions with the react studio 
  const actions = [
    {
      class: 'fas.fa-play',
      title: 'Play Annotation',
      action: (annotation) => {
        ee.emit('play', annotation.start, annotation.end);
      },
    },
    {
      class: 'fas.fa-plus',
      title: 'Insert New Annotation',
      action: (annotation, i, annotations, opts) => {
        if (i === annotations.length - 1) {
          return console.log('not possible');
        }

        let newIndex = i + 1;
        const newAnnotation = {
          id: String(newIndex),
          start: annotation.end,
          end: annotations[i + 1].start,
          lines: ['New Draft'],
          lang: 'en',
        };

        annotations.forEach((ann, indx) => {
          if (indx >= newIndex) {
            return (ann.id = String(indx + 1));
          }
        });
        annotations.splice(i + 1, 0, newAnnotation);
      },
    },

    {
      class: 'fas.fa-trash',
      title: 'Delete annotation',
      action: (annotation, i, annotations) => {
        annotations.splice(i, 1);
      },
    },
  ];
// ============> React-studio <=======================>
// container is defined and it only takes const variable 
// To not do: trying to change the color or value dynamically 
// once container reference is create we can not manupilate it excepts events
  const container = useCallback(
    (node) => {
      if(node !== null && toneCtx !== null){
        const playlist = ReactStudio(
          {
            ac:toneCtx.rawContext,
            container: node,
            state: 'cursor',
            mono: true,
            samplesPerPixel: 500,
            waveHeight:100,
            isAutomaticScroll:true,
            timescale: false,
            barGap: 2,
            colors: {
              waveOutlineColor:backgroundColor,
              timeColor: dark,
              fadeColor: 'grey',
            },
            controls: {
              show: true,
              width:175,
              widgets: {
                collapse: false,
                remove: true
              },
            },
            
            zoomLevels:[500, 1000 ,2000],
            seekStyle: 'fill'
          },
          ee
        );
        dispatch({
          type: PLAYLIST,
          payload: playlist
        });

        ee.on('audiorenderingstarting', function (offlineCtx, a){
            const offlineContext = new Tone.OfflineContext(offlineCtx);
            Tone.setContext(offlineContext);
            setUpChain.current = a;
        });
        ee.on('audiorenderingfinished', function (type , data ){
          Tone.setContext(toneCtx);
          if(type === 'wav'){
            saveAs(data, `${project}.wav`)
          }
        });
        ee.on('audiosources_rendering', ()=> setDialogBox(true));

        ee.on('audiosourcesrendered', ()=> {
          setDialogBox(false)
        })

        ee.on('tracksUpdated', (e) => 
          dispatch({
            type: SET_BUTTONS,
            payload: e,
          })
        );

        ee.on('tracksLeft', (tracks) =>{
          if (tracks === 0) {
            dispatch({
              type: SET_BUTTONS,
              payload: true
            })
          }
        });

        ee.on('audiosourceserror', (e) =>
          alert(e.message+ ' ' + ' please only use type mp3')
        );

        ee.on('enableCut', (fact) =>
          dispatch({
            type: SET_ENABLE_CUT,
            payload: fact
          })
        );

        ee.on('enableSplit', (fact) =>
          dispatch({
            type: SET_ENABLE_SPLIT,
            payload: fact,
          })
        );

        ee.on('clearAnnotations', ()=> {
          setEnableAnnotations(true);

          setShowAnnotations(false);
        });

        playlist.initExporter();
        setEventEmitter(ee)
      }
    }, [ee, toneCtx]
  )

  // File uploads are handle here we can also use events directly
  function handleUpload(event){
    const file = event.target.files[0]
    if(!file){
      return;
    }
    ee.emit('newtrack', {
      file: file,
      name: file.name,
      id: uuidv4(),
    });
    // removing ref once the tracks is loaded
    uploadRef.current.value = '';
  }

  // we pass the function to component instead of rewriting events in every components
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

  // To manage the dark and light mode we use queryselector to update classname
  // since we dont have controls over them
  useEffect(()=>{
    var playlistDiv = document.querySelector('#editor .playlist');
    if (playlistDiv) {
        playlistDiv.className = `playlist ${mode}`;
    }

  },[backgroundColor])

  return (
    <div className = {`pt-0.5 overflow-y-auto overflow-x-hidden h-screen w-screen`}
        style={{ backgroundColor: backgroundColor, color: textColor}}
    >
        <Navbar
          handleClick = {handleClick}
          disabled={allButtons}
        />

        <DialogBox open={dialogBox} />

        <EditorButtons
          handleClick={handleClick}
          cutButton= { enableCut}
          disabled = { allButtons}
          splitButton ={ enableSplit}
          enableAnnotations={ enableAnnotations}
        />

        <Instrumentals handleUpload={handleUpload} />

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
        
        <div
            ref={container}
            onDragOver={() => console.log('ure dragging')}
            id={`editor`}
          > 
        </div>

      <CustomTimeLine bottom={!allButtons ? 0 : -100} ee={ee}/>
    </div>
  )
}

export default Editor;
