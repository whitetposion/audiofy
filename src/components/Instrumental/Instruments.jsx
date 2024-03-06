import { Bell, Bomb, Drum } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useThemeSettings } from "@/hooks/use-theme-settings";

const Instrumentals = ({handleUpload}) =>{
     const { mode, textColor} = useThemeSettings();
     const musics = [
          {
               name: 'Bell',
               action: ()=>{
                    let event = {target : {files : ['music/bells.wav']}}
                    handleUpload(event);
               },
               icon: <Bell/>
               
          },
          {
               name: 'Burst',
               action: ()=>{
                    let event = {target : {files : ['music/burst.wav']}}
                    handleUpload(event);
               },
               icon: <Bomb/>
               
          },
          {
               name: 'Drums',
               action: ()=>{
                    let event = {target : {files : ['music/drums.wav']}}
                    handleUpload(event);
               },
               icon: <Drum/>
               
          },
          
     ]
     return (
          <div
               className="flex grow flex-wrap gap-1 justify-end m-10"
          >
               {musics.map((item, key)=>{
                         
                    return(
                         <Button
                              variant = "ghost"
                              onClick = {item.action}
                              className = {cn(`
                                   cursor-pointer
                                   scale-120 
                                   text-${textColor}
                                   border-${textColor}
                                   duration-25
                                   `)}
                         >
                              {item.icon} {item.name}
                         </Button>
                    )
               })
               }
          </div>
     )
}
export default Instrumentals;