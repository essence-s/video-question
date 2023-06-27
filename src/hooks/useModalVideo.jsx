import { useContext } from "react";
import { VQContext } from "@context/VideoQuestionContext"

export function useModalVideo() {

    let { open, setOpen } = useContext(VQContext)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    return {
        open, handleOpen, handleClose
    }
}
