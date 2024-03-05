import { useThemeSettings } from "@/hooks/use-theme-settings"
import { useEffect, useRef, useState } from "react";
import { 
     Tooltip,
     TooltipContent,
     TooltipProvider,
     TooltipTrigger
} from "@/components/ui/tooltip";
import { Pause, Play } from "lucide-react";
import './bar.css'
import { dark, light } from "@/theme";

const CustomTimeLine = ({bottom , ee}) => {

     const { theme , keyPress} = useThemeSettings();
     const { key , shiftKey , code } = keyPress;
     const { textColor } = theme;

     const [duration , setDuration ] = useState('00.00.00');

     const [ rawValue , setRawValue ] = useState(0);
     const [seeker, setSeeker] = useState(0);

     const [ dpSeeKer, setDpseeker] = useState('00.00.00');

     const [isPlaying, setIsplaying] = useState(false);

     const playRef = useRef();

     useEffect(()=> {
          function secondToHMS(seconds){
               const hours = Math.floor(seconds / 3600);
               let minutes = Math.floor((seconds % 3600) / 60);
               if (minutes > 60) {
               minutes = parseFloat(0.0);
               }
               // const remainingSeconds = Math.round(seconds);
               let remainingSeconds = parseFloat(seconds % 60).toFixed(2);
               if (remainingSeconds > 60) {
               remainingSeconds = parseFloat(0.01);
               }

               const formattedHours = hours.toString().padStart(2, '0');
               const formattedMinutes = minutes.toString().padStart(2, '0');
               const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

               return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
          }
          // get the total duration of the longest track
          
          ee.on('getTrackDuration', (value)=>{
               var newDuration = secondToHMS(value);

               setDuration(() =>newDuration);
               setRawValue(() => value)
          });
          ee.on('newTimeDurationAfterEdit' , (value) => {
               var newDuration = secondToHMS(value);

               setDuration(()=> newDuration);
               setRawValue(()=> newDuration)
          })
          ee.on('timeupdate', (start)=> {
               setSeeker(()=>parseFloat(start).toFixed(4))

               var newSeeked = secondToHMS(start)
               setDpseeker(()=> newSeeked)
          })
          ee.on('finishedPlaying', ()=> {
               setDpseeker(()=> '00.00.00');
               setSeeker(()=> 0);
               setIsplaying(!isPlaying);
          })

          if(bottom !== 0){
               setDuration(()=>'00.00.00');
               setDpseeker(()=> '00.00.00');
               setSeeker(()=> 0);
               setIsplaying(()=> !isPlaying)
          }
     },[])

     useEffect(()=> {
          if(code === 'Space' && shiftKey){
               isPlaying ? ee.emit('pause') : ee.emit('play')
               setIsplaying(!isPlaying)
          }
     },[key, code , shiftKey])
     return (
          <div className={`w-full fixed  left-0 ${bottom === 0 ? 'bottom-0' :'-bottom-full'} py-6 px-10`}>
               <div 
                    className={`flex justify-between items-center gap-2 h-30 backdrop-blur-md rounded-3xl duration-70 bg-${bottom === 0 ? 'trasparent': 'white'}
                         py-0 px-${bottom === 0 ? '8px' : '300px'}
                    `}
               >
                    <TooltipProvider>
                         <Tooltip>
                              <TooltipTrigger asChild>
                                   <div
                                        ref={playRef}
                                        onCanPlay={()=>{
                                             setIsplaying(!isPlaying);
                                             isPlaying? ee.emit('play'): ee.emit('pause')
                                        }} 
                                   >
                                        {isPlaying ? (
                                             <Play size={30} className={`text-${textColor === "light"? 'white': 'dark'}`}/>
                                        ):(
                                             <Pause size={30} className={`text-${textColor === "light"? 'white': 'dark'}`}/>
                                        )

                                        }
                                   </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                   <p>{isPlaying ? 'Play(shft + space)' : 'Pause(shft + space)'}</p>
                              </TooltipContent>
                         </Tooltip>
                    </TooltipProvider>

                    <div className="w-24 h-full flex justify-center items-center bg-transparent">
                         <h3 className={`font-semibold text-${textColor === 'light' ? 'white' : 'dark'}`}>
                              {dpSeeKer}
                         </h3>
                    </div>
                    <div className="flex-1">
                         <input
                              type = {'range'}
                              className= { `audioBar ${textColor}`}
                              min={0}
                              max={rawValue}
                              step={0.0001}
                              value={seeker}
                              onChange={(e) => {
                                   const {
                                     target: { value },
                                   } = e;
                                   ee.emit('sliderTimeUpdate', value);
                              }}
                         />
                    </div>
                    <div className="w-24 h-full flex justify-center items-center bg-transparent">
                         <h3 className={`font-semibold text-${textColor === 'light' ? 'white' : 'dark'}`}>
                              {duration}
                         </h3>
                    </div> 
               </div>
          </div>
     )

}
export default CustomTimeLine;