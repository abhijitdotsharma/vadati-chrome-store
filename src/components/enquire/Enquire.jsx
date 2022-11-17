import { useState } from "react";
import "./enquire.css";

export default function Enquire({ user, setUser }) {

    const [userName, setUserName] = useState('');
    


    function inputHandler(event) {
        setUserName(event.target.value)
    }

    function submitHandler(event) {
        event.preventDefault();

        
        if(userName.trim().length === 0){
            alert('enter valid name')
        }else if(userName.trim().length > 20){
            alert("Name too long, enter a short name")
        }else{
            //change the local storage value 
            setUser("userName", userName)
        }
        

    }
    console.log('after setIsLoggedIn - ', user?.isLoggedIn)

    return (
        <div className="enquire">

            <form className="enquire__form">
                <p className="enquire__heading">What is your name ? </p>

                <input
                    className="enquire__input"
                    onSubmit={submitHandler}
                    type="text"
                    value={userName}
                    onChange={inputHandler}
                />

                <button 
                className="enquire__submit btn btn-large btn-primary"
                onClick={submitHandler}
                >Primary</button>
            </form>
        </div>
    )
}