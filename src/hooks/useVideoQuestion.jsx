import { useContext } from "react"
import { VQContext } from "@context/VideoQuestionContext"

const useVideoQuestion = () => {

    let { dataVQ, setDataVQ, indexVQ, setIndexVQ, videos, setVideos, somethingRecording, setSomethingRecording } = useContext(VQContext)

    let changeDataVQ = (dtra) => {
        setDataVQ((prev) =>
            prev.map((d) => {
                if (d.id !== dtra.id) return d

                return {
                    ...d,
                    ...dtra
                }
            })
        )
    }

    const nextIndexVQ = () => {

        if (indexVQ < dataVQ.length - 1) {
            setIndexVQ(prev => prev + 1)
        }
    }

    const backIndexVQ = () => {

        if (indexVQ > 0) {
            setIndexVQ(prev => prev - 1)
        }
    }

    const changeIndexVQ = (index) => {
        setIndexVQ(index)
    }

    return {
        dataVQ, changeDataVQ,
        indexVQ, nextIndexVQ, backIndexVQ, changeIndexVQ,
        videos, setVideos,
        somethingRecording, setSomethingRecording
    }
}

export default useVideoQuestion