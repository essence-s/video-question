import { CardVideo } from "@components"
import "./videoQuestion.css"

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import SendIcon from '@mui/icons-material/Send';

import useVideoQuestion from "@hooks/useVideoQuestion";


const VideoQuestion = () => {

    let { dataVQ, videos } = useVideoQuestion()

    const sendData = () => {
        if (dataVQ.every((el) => el.answered == true)) {
            console.log('dataArray')
            console.log(dataVQ)
            console.log('videos')
            console.log(videos)
            alert('se envio :V/')
        } else {
            alert('Faltan Responder Preguntas')
        }

    }
    return (
        <div className="videoQuestion">

            <div className="videoQuestion__title"><h1>VIDEO QUESTIONS</h1></div>
            <div className="videoQuestion__videoContent">

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={4}
                    navigation
                >

                    {dataVQ.map((dataVideo, i) => <SwiperSlide key={i + 'cvc'}>
                        <CardVideo showRecButton={false} width={200} dataVideo={dataVideo}></CardVideo>
                    </SwiperSlide>)}

                </Swiper>
            </div>

            <div className="videoQuestion__sendButton">
                <button onClick={sendData} ><span>SEND</span><SendIcon></SendIcon></button>

            </div>

        </div>
    )
}

export default VideoQuestion