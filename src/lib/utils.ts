import { type ClassValue , clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// for merging styles of shadcn and custom styles

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
