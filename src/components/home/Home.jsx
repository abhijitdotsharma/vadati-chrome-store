import axios from "axios";
import { useState, useEffect } from "react"
import Quote from "../quote/Quote";
import Time from "../time/Time"
import Weather from "../weather/Weather";
import "./home.css"

export default function Home({ user, setUser }) {

    const [bgImage, setBgImage] = useState("")
    const [focusTxt, setFocusTxt] = useState('')

    const url = "https://api.unsplash.com/photos/random/";

    function handleInput(event) {
        setFocusTxt(event.target.value)
    }

    function handleSubmit(event) {
        //setUser("focus", focusTxt)
        event.preventDefault();

        if (focusTxt.trim().length === 0) {
            alert("enter valid task");

        } else {
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



    return (
        <div className="container-home" style={{backgroundImage: `url(${bgImage})`}}>

            {/* Nav */}
            <Weather />

            
            <main className="region-center">
                <Time />
                {user?.isLoggedIn !== false && <div className="greet">Hey {user.userName}</div>}

                {/* Task */}
                <div className="focus focus--shown">
                    {/* Will be changed to focus--hidden on userinput later*/}
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
                    {user.isLoggedIn && <div className="focus__task">{user.focus}</div>}
                </div>
            </main>

            {/* footer */}
            <footer className="region-footer">
                <Quote/>
            </footer>
        </div>
    )
}