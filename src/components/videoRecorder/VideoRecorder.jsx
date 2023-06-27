import { useEffect, useRef, useState } from "react";
import './videoRecorder.css'
import useVideoQuestion from "@hooks/useVideoQuestion";

import StopIcon from '@mui/icons-material/Stop';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { useVideoRecorder } from "@hooks/useVideoRecorder";

const VideoRecorder = ({ width, dataVideo, showRecButton }) => {

    // const videoRef = useRef(null);
    const [downloadLink, setDownloadLink] = useState("");
    const totalDuration = 120
    const videoRef2 = useRef(null);

    let { videos, setSomethingRecording, changeDataVQ } = useVideoQuestion()
    let { videoRef, isRecording, timeCounter, chunks, error, timeFormater, createIntervalTimerCounter, clearIntervalTimerCounter, prepareStream, addVideo, startRecording, stopRecording } = useVideoRecorder()

    useEffect(() => {
        setDownloadLink(videos.find((d) => d.idVideo == dataVideo.id)?.data ?? '')
    }, [dataVideo])

    useEffect(() => {
        setDownloadLink(videos.find((d) => d.idVideo == dataVideo.id)?.data ?? '')
    }, [videos])



    let handleStartRecorder = () => {
        startRecording()
    }
    let handleStopRecorder = () => {
        stopRecording()
    }

    useEffect(function () {
        setSomethingRecording(isRecording)

        if (isRecording) {
            createIntervalTimerCounter()
            return;
        }
        if (chunks.current.length === 0) {
            return;
        }

        const blob = new Blob(chunks.current, {
            type: "video/x-matroska;codecs=avc1,opus",
        });
        // setDownloadLink(URL.createObjectURL(blob));

        addVideo(URL.createObjectURL(blob), dataVideo)
        changeDataVQ({
            ...dataVideo,
            answered: true,
        })

        chunks.current = [];
    }, [isRecording])

    useEffect(function () {

        prepareStream(width);

        return () => clearIntervalTimerCounter()
    }, []);




    return (
        <div className="videoRecorder">
            {/* <div>
                <select id="videoSource" name="videoSource" value={videoSource}>
                    {videoSourceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select id="audioSource" name="audioSource" value={audioSource}>
                    {audioSourceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div> */}
            {isRecording && <div className="rec">{timeFormater(timeCounter) + '/' + timeFormater(totalDuration)}< div className="rec-circle"></div></div>}

            <div style={isRecording ? {} : { display: 'none' }}>
                <video ref={videoRef} autoPlay muted playsInline></video>
            </div>
            <div className="containerVideoET" style={!isRecording ? {} : { display: 'none' }}>

                {downloadLink && <video style={{ width, height: '100%' }} src={downloadLink} ref={videoRef2} controls controlsList="nodownload,nofullscreen,noseekback,noseekforward"></video>}

                {/* {downloadLink && (
                    <a href={downloadLink} download="file.mp4">
                        Descargar
                    </a>
                )} */}
            </div>



            <div className="option-VQ">
                {
                    showRecButton ?
                        isRecording ? <button onClick={handleStopRecorder} disabled={!isRecording}>
                            <StopIcon></StopIcon>
                        </button> : <button onClick={handleStartRecorder} disabled={isRecording}>

                            <CenterFocusStrongIcon></CenterFocusStrongIcon>
                        </button> : ''
                }
            </div>
            <div>{error && <p>{error.message}</p>}</div>
        </div >
    );
}

export default VideoRecorder;