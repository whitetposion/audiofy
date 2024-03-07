import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useThemeSettings } from "@/hooks/use-theme-settings"
import { cn } from "@/lib/utils"


export function ModeToggle({setIsModalOpen}) {
  const { theme ,themeMode } = useThemeSettings()
  const { mode, textColor, backgroundColor } = theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  size="icon" variant="ghost" className ={cn(`bg-${backgroundColor} text-${textColor} hover:text-${textColor} hover:bg-${backgroundColor} focus-visible:ring-0`)}>
          {mode === 'light'?
          <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 `} /> :
          <Moon className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setIsModalOpen(true)}
        >
            Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setIsModalOpen(true)}
        >
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
