import { useState, useEffect } from 'react';
import "./weather.css";

export default function Weather() {

    const [coordinates, setCoordinates] = useState({ lat: 0, long: 0 });
    const [temp, setTemp] = useState(null)

    const url = 'https://api.openweathermap.org/data/2.5/weather';


    function successSetCoords(pos){
        const coords = pos.coords;
        setCoordinates(prev => ({ ...prev, lat: coords?.latitude, long: coords?.longitude}))
        //getWeather() called only after we get the coordinates
        getWeather(coords.latitude, coords.longitude)
    }
    function errorGeolocation(err){
        console.log("error in geolocation - ", err)
    }

    function getLocationThenWeather(){
        navigator.geolocation.getCurrentPosition(successSetCoords, errorGeolocation, {timeout: 10000})
    }

    //lati and longi are values returned from geoLocation API,
    // not state values while making the fetch call
    function getWeather(lati, longi){
        fetch(`${url}?lat=${lati}&lon=${longi}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setTemp(data.main.temp)
                console.log(data)
            })
            .catch(err => console.log("err in weather - ", err))
    }


    useEffect(() => {
        getLocationThenWeather()        
    }, [])

    let celcius = Math.ceil(temp - 273.15)

    return (
        <nav className='weather'>
            <p className='weather__text'>{celcius}&#176;C</p>
        </nav>
    )
}