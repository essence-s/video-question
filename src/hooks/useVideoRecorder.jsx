import { useContext, useRef, useState } from "react";
import { VQContext } from "@context/VideoQuestionContext";


export function useVideoRecorder() {

    const [isRecording, setIsRecording] = useState(false);
    const [audioSource, setAudioSource] = useState("");
    const [videoSource, setVideoSource] = useState("");
    const [timeCounter, setTimeCounter] = useState(0)
    const [error, setError] = useState(null);
    const interval = useRef(null)
    const timerRef = useRef(null)
    const videoRef = useRef(null);
    const [audioSourceOptions, setAudioSourceOptions] = useState([]);
    const [videoSourceOptions, setVideoSourceOptions] = useState([]);
    const streamRef = useRef(null);
    const streamRecorderRef = useRef(null);
    const chunks = useRef([]);

    let { setVideos } = useContext(VQContext)


    function startRecording() {

        if (isRecording) {
            return;
        }
        if (!streamRef.current) {
            return;
        }


        streamRecorderRef.current = new MediaRecorder(streamRef.current);
        streamRecorderRef.current.start();
        streamRecorderRef.current.ondataavailable = function (event) {
            if (chunks.current) {
                chunks.current.push(event.data);
            }
        };
        setIsRecording(true);

        timerRef.current = setTimeout(() => {
            stopRecording();
        }, 2 * 60 * 1000); // 2 minutos en milisegundos
    }



    function stopRecording() {


        if (!streamRecorderRef.current) {
            return;
        }
        streamRecorderRef.current.stop();

        setTimeout(() => {
            setIsRecording(false);
            clearIntervalTimerCounter()

        }, 100)


    }


    async function prepareStream(width) {
        function gotStream(stream) {
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }

        async function getStream() {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => {
                    track.stop();
                });
            }
            const constraints = {
                audio: {
                    deviceId: audioSource !== "" ? { exact: audioSource } : undefined,
                },
                video: {
                    deviceId: videoSource !== "" ? { exact: videoSource } : undefined,
                    width: { ideal: width },
                    height: { ideal: 330 },
                },
            };
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                gotStream(stream);
            } catch (error) {
                setError(error);
            }
        }

        function getDevices() {
            return navigator.mediaDevices.enumerateDevices();
        }

        function gotDevices(deviceInfos) {
            const audioSourceOptions = [];
            const videoSourceOptions = [];
            for (const deviceInfo of deviceInfos) {
                if (deviceInfo.kind === "audioinput") {
                    audioSourceOptions.push({
                        value: deviceInfo.deviceId,
                        label: deviceInfo.label || `Microphone ${deviceInfo.deviceId}`,
                    });
                } else if (deviceInfo.kind === "videoinput") {
                    videoSourceOptions.push({
                        value: deviceInfo.deviceId,
                        label: deviceInfo.label || `Camera ${deviceInfo.deviceId}`,
                    });
                }
            }
            setAudioSourceOptions(audioSourceOptions);
            setVideoSourceOptions(videoSourceOptions);
        }

        await getStream();
        const mediaDevices = await getDevices();
        gotDevices(mediaDevices);
    }


    let clearIntervalTimerCounter = () => {


        clearInterval(interval.current)
        // interval.current = null

        setTimeCounter(0)
        // setCorriendo(false);
    }

    let createIntervalTimerCounter = () => {


        interval.current = setInterval(() => {
            setTimeCounter((tiempo) => tiempo + 1);
        }, 1000);


    }

    const addVideo = (video, dataVideo) => {

        setVideos((sv) => {
            if (sv.some((dd) => dd.idVideo == dataVideo.id)) {
                return sv.map((d) => {
                    if (d.idVideo !== dataVideo.id) return d
                    return {
                        ...d,
                        data: video
                    }
                })
            } else {
                return [...sv, {
                    idVideo: dataVideo.id,
                    data: video
                }]
            }


        })
    }

    const timeFormater = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const missingSeconds = seconds % 60;
        return `${minutes}:${missingSeconds.toString().padStart(2, '0')}`;
    };

    return {
        videoRef,
        isRecording, timeCounter, timeFormater, prepareStream, chunks,
        clearIntervalTimerCounter, createIntervalTimerCounter,
        startRecording, stopRecording,
        addVideo
    }
}