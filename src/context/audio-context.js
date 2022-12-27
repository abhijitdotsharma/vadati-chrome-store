//create context
import { useState, useEffect, createContext, useContext} from 'react';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

const VoiceContext = createContext()


const VoiceProvider = ({children}) => {

    const [isRecording, setIsRecording] = useState(false);

    const [voiceNote, setVoiceNote] = useState("")

    function recordHandler() {
        if (isRecording) {
            mic.start();

        } else {
            mic.stop();
        }

        mic.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => {
                    // SpeechRecognitionResult from the SpeechRecognitionResultList
                    // return SpeechRecognitionResultAlternative
                    return result[0]
                })
                .map((result) => {
                    // SpeechRecognitionResultAlternativeItem
                    // return item.transcript  
                    return result.transcript
                })
                .join('')
            setVoiceNote(transcript)
        }
    }
    //runs each time on start/stop btn click
    useEffect(() => {
        recordHandler()
    }, [isRecording])


    return (
        <VoiceContext.Provider value={{isRecording, setIsRecording, voiceNote, setVoiceNote}}>
            {children}
        </VoiceContext.Provider>
    )
}


const useVoice = () => useContext(VoiceContext)


export { useVoice, VoiceProvider }

// Usage
// const {isRecording, setIsRecording, voiceNote, setVoiceNote} = useVoice()
// onClick={() => setIsRecording(prev => !prev)}
// <output> {voiceNote} </output>