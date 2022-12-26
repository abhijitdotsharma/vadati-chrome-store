import axios from "axios";
import { useState, useEffect } from "react"
import Quote from "../quote/Quote";
import Time from "../time/Time"
import Weather from "../weather/Weather";
import "./home.css";
import { useVoice } from "../../context/audio-context";

export default function Home({ user, setUser }) {

    const { isRecording, setIsRecording, voiceNote } = useVoice()

    const [bgImage, setBgImage] = useState("")
    const [focusTxt, setFocusTxt] = useState('')

    const url = "https://api.unsplash.com/photos/random/";

    function handleInput(event) {
        setFocusTxt(event.target.value)
    }

    function handleSubmit(event) {
        //for text input, for voice input another function
        event.preventDefault();
        if (focusTxt.trim().length === 0) {
            alert("enter valid task");

        } else {
            console.log('submitted focusTxt', focusTxt)
            setUser("focus", focusTxt)
        }
        setFocusTxt('')
    }

    //load bg image  -- '%20dark' for darker images from api
    useEffect(() => {
        (async () => {
            axios
                .get(
                    `${url}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&&orientation=landscape&&query=nature%20dark`
                )
                .then(res => setBgImage(res.data.urls.full))
                .catch(err => console.log("unsplash API err - ", err))

        })()
    }, [])

    function handleStartRecording() {
        //mic is off till this moment
        // while this is on, disable the input?
        setIsRecording(prev => !prev)
    }

    function handleStopRecording() {
        // voiceNote has the task till this is fired
        // when fired, change mic state and set this task as user.focus
        setIsRecording(prev => !prev)
        setUser("focus", voiceNote)
    }

    return (
        <div className="container-home" style={{ backgroundImage: `url(${bgImage})` }}>
            <Weather />
            <main className="region-center">
                <Time />
                {user?.isLoggedIn !== false && <div className="greet">Hey {user.userName}</div>}

                <div className="focus focus--shown"> {/* Will be changed to focus--hidden on userinput later*/}
                    <form
                        className="focus__submit"
                        onSubmit={handleSubmit}
                    >
                        <p className="focus__label">Your most important task today ?</p>
                        <input
                            className="focus__input"
                            type="text"
                            value={focusTxt}
                            onChange={handleInput}
                        />
                    </form>
                    {isRecording ?
                        <button className="focus__mic" onClick={handleStopRecording}><i className="mic--on fal fa-microphone"></i></button> :
                        <button className="focus__mic" onClick={handleStartRecording}><i className="mic--off  fal fa-microphone-slash"></i></button>
                    }
                    {user.isLoggedIn && <div className="focus__task">{user.focus}</div>}
                </div>

            </main>

            <footer className="region-footer">
                <Quote />
            </footer>
        </div>
    )
}