import { useState } from "react";
import { cn } from "@/lib/utils";
import { useThemeSettings } from "../hooks/use-theme-settings"
import { dark, light } from "../theme";
import { Bars, ColorRing } from "react-loader-spinner";
import { Tooltip,
          TooltipContent,
          TooltipProvider,
          TooltipTrigger,
} from "./ui/tooltip";
import{ Button }from '@/components/ui/button'
import { ModeToggle } from "@/components/ui/dark-toggle";
import { AudioLines, Download, Upload } from "lucide-react";


const Navbar = ({
     handleClick,
     disabled
}) => {
     const { themeMode } = useThemeSettings();
     const {
          theme: {mode, textColor},
          changeTitle,
          podcast,
          event_emitter,
          setShowAnnotations,
          setEnableAnnotations,
          setAnnotations,
          setDialogBox
     } = useThemeSettings();

     const [ loading , setLoading] = useState(false);

     const actionButtons = [
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
          <div className= "grow h-12 p-2">
               <div 
                    className="static z-10  flex justify-between items-center"
                    style={{backgroundColor: mode === "light" ? light:dark}}
               >
                    <div className= "flex justify-between items-center h-full gap-2 px-6"
                    >
                         <AudioLines size={20}/>
                         <p 
                              className= "font-semibold text-3xl"
                              style={{color: textColor }}
                         >
                              Audiofy
                         </p>
                    </div>
                    <div className="flex justify-center items-center bg-transparent">
                         <TooltipProvider>
                              <Tooltip>
                                   <TooltipTrigger>
                                        <input
                                             type="text"
                                             value ={ podcast}
                                             className="text-xl border-none bg-transparent outline-none"
                                             style={{color: textColor}}
                                             onChange={(e) =>{
                                                  const {
                                                       target: {value},
                                                  } = e
                                                  changeTitle(value.slice(0,19));
                                             }}
                                        />
                                   </TooltipTrigger>
                                        <TooltipContent>
                                             <p>Edit your Project Name</p>
                                        </TooltipContent>
                                   </Tooltip>
                         </TooltipProvider>
                    </div>
                    <div className="flex items-center justify-between gap-6 px-6">
                         {actionButtons.map((button, index) => {
                              const { name , icon } = button;
                              let toBeDisabled = disabled;
                              if( name === 'upload'){
                                   toBeDisabled = false;
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
                         <ModeToggle/>

                    </div>


               </div>
          </div>
     )
}
export default Navbar;