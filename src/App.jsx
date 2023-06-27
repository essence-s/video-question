import './App.css'
import { ContainerMaxWidth, VideoQuestion, ModalVideo } from '@components'
import { VQProvider } from './context/VideoQuestionContext'
function App() {
  return (
    <VQProvider> {/* Provider context */}

      <ModalVideo></ModalVideo> {/*modal*/}

      <ContainerMaxWidth> {/*maximo de width 1200*/}
        <VideoQuestion></VideoQuestion> {/* component de la vista principal*/}
      </ContainerMaxWidth>

    </VQProvider>
  )
}

export default App
