import { useThemeSettings } from "@/hooks/use-theme-settings"
import { AArrowDown, CaseUpper, ChevronsLeftRight, Download, GripHorizontal, MessageSquareOff, MousePointer2, MoveDownLeft, MoveDownRight, Scissors, Split, Upload, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const EditorButtons = ({
     handleClick,
     cutButton,
     disabled,
     splitButton,
     enableAnnotations
})=> {
     const {theme: {mode}} =useThemeSettings();

     const actionsButtons = [
          {
               name: 'cursor',
               icon: (
                    <MousePointer2
                         onClick={()=> {
                              const event = {target : {name: 'cursor'}}
                              handleClick(event);
                         }}
                    />
                    
               )
          },
          {
               name: 'shift',
               icon : (
                    <ChevronsLeftRight
                         onClick={() => {
                              const event = { target: { name: 'shift' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'region',
               icon : (
                    <GripHorizontal
                         onClick={() => {
                              const event = { target: { name: 'region' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'cut',
               icon : (
                    <Scissors
                         onClick={() => {
                              const event = { target: { name: 'cut' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'split',
               icon : (
                    <Split
                         onClick={() => {
                              const event = { target: { name: 'split' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'fadein',
               icon : (
                    <MoveDownLeft
                         onClick={() => {
                              const event = { target: { name: 'fadein' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'fadeout',
               icon : (
                    <MoveDownRight
                         onClick={() => {
                              const event = { target: { name: 'fadeout' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'zoomin',
               icon : (
                    <ZoomIn
                         onClick={() => {
                              const event = { target: { name: 'zoomin' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'zoomout',
               icon : (
                    <ZoomOut
                         onClick={() => {
                              const event = { target: { name: 'zoomout' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'addAnnotations',
               icon : (
                    <CaseUpper
                         onClick={() => {
                              const event = { target: { name: 'addAnnotations' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'downloadAnnotation',
               icon : (
                    <AArrowDown
                         onClick={() => {
                              const event = { target: { name: 'downloadAnnotation' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'clearAnnotations',
               icon : (
                    <MessageSquareOff
                         onClick={() => {
                              const event = { target: { name: 'clearAnnotations' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'upload',
               icon : (
                    <Upload
                         onClick={() => {
                              const event = { target: { name: 'upload' } };
                              handleClick(event);
                         }}   
                    />
               )
          },
          {
               name: 'download',
               icon : (
                    <Download
                         onClick={() => {
                              const event = { target: { name: 'download' } };
                              handleClick(event);
                         }}   
                    />
               )
          }
          
     ]

     return (
          <div className="flex grow flex-wrap gap-1 justify-center m-10">
               {actionsButtons.map((button, index) => {
                    const { name , icon } = button;
                    let toBeDisabled = disabled;
                    if( name === 'upload'){
                         toBeDisabled = false;
                    }
                    if (name === 'cut') {
                         toBeDisabled = cutButton
                    }
                    if (name === 'split'){
                         if( disabled){
                              return;
                         }
                         toBeDisabled = splitButton
                    }
                    if (name === 'downloadAnnotation' || name === 'clearAnnotations') {
                         toBeDisabled = enableAnnotations;
                    }
                    return (
                         <span>
                              <Button
                                   disabled={toBeDisabled}
                                   name = {name}
                                   variant = "text"
                                   onClick = {handleClick}
                                   className = {cn(`
                                        cursor-pointer
                                        scale-120 
                                        ${mode === 'light' ? 'text-dark hover:scale-120' : 'text-white hover:scale-120 '}
                                        duration-25
                                        `)}
                              >
                                   {icon}
                              </Button>
                         </span>
                    )
               })}

          </div>
     )
};
export default EditorButtons