import { useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

export const AlertModal = ({
     isOpen,
     onClose,
     onConfirm,
     loading=false
})=>{
     
     return (
          <Modal
               title = "Are you sure?"
               description="Please download your file changes"
               isOpen={isOpen}
               onClose={onClose}
          >
               <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={loading} variant="outline" onClick={onClose}>
                         Cancel
                    </Button>
                    <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                         Change Mode
                    </Button>
               </div>
          </Modal>
     )
}