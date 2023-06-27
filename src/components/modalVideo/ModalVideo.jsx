import "./modalVideo.css"
import { Button, Box, Modal } from "@mui/material"
import useVideoQuestion from "@hooks/useVideoQuestion";
import { CardVideo } from "@components";
import { useModalVideo } from "@hooks/useModalVideo";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';



const ModalVideo = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        bgcolor: '#141414',
        boxShadow: 24,
        p: 4,
    };

    const { dataVQ, indexVQ, nextIndexVQ, backIndexVQ, somethingRecording } = useVideoQuestion()

    const { open, handleClose } = useModalVideo()

    const handleNext = () => {

        nextIndexVQ()
    }

    const handleBack = () => {

        backIndexVQ()
    }

    const terminar = () => {
        handleClose()
        // setIndexVQ(0)
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="contentModal">
                        <Button color="inherit" className="modal__backb" onClick={terminar}><ChevronLeftIcon fontSize='small'></ChevronLeftIcon> Volver</Button>

                        <CardVideo disableButtonMo={true} width={600} dataVideo={dataVQ[indexVQ]}></CardVideo>
                        <div className="modal__contentButton">
                            <div className="legenda">
                                {dataVQ.map((d, i) => {

                                    return d.answered ? <CheckCircleIcon key={i + 'lgen'} style={{ color: '#444', ...(i == indexVQ ? { fontSize: '2rem' } : {}) }}></CheckCircleIcon> : <ErrorOutlineIcon key={i + 'lgen'} style={{ color: '#444', ...(i == indexVQ ? { fontSize: '2rem' } : {}) }}></ErrorOutlineIcon>
                                })}
                            </div>
                            <div className="modal__groupButtons">
                                <Button color="secondary" onClick={handleBack} disabled={somethingRecording}>Anterior</Button>
                                <Button color="secondary" onClick={handleNext} disabled={somethingRecording}>Siguiente</Button>

                            </div>
                            {/* <Button onClick={terminar} style={dataVQ.every((el) => el.answered == true) ? {} : { display: 'none' }}>Terminar</Button> */}


                        </div>

                        {/* <button onClick={dino}>dsada</button> */}
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalVideo