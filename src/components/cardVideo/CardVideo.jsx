import useVideoQuestion from "@hooks/useVideoQuestion"
import "./cardVideo.css"
import { VideoRecorder } from "@components"
import { useModalVideo } from "@hooks/useModalVideo"
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


const CardVideo = ({ dataVideo = {}, width, showRecButton = true, disableButtonMo = false }) => {

    const { changeIndexVQ, dataVQ, setSomethingRecording } = useVideoQuestion()

    const { handleOpen } = useModalVideo()


    const handleOpenModal = () => {
        handleOpen()
        let indexArray = dataVQ.findIndex((d) => d.id == dataVideo.id)
        changeIndexVQ(indexArray)
        setSomethingRecording(false)
    }


    return (
        <div className="video-card" style={{ width }}>
            <div className="video-card__video">
                <VideoRecorder showRecButton={showRecButton} dataVideo={dataVideo} width={width}></VideoRecorder>
            </div>

            <div className="video-card__question-box" onClick={disableButtonMo ? () => { } : handleOpenModal}>
                {/* <QuestionMarkIcon></QuestionMarkIcon> */}
                <div className="video-card__question-square"></div>
                {/* <Button title={dataVideo.question}>{dataVideo.question}</Button> */}
                <div className="video-card__question-text">{dataVideo.question}</div>
                <div className="video-card__question-square"></div>
            </div>
            {/* <button onClick={dino}>dsada</button> */}
        </div >
    )
}

export default CardVideo