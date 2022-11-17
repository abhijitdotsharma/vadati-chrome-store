import { useState, useEffect } from "react";

export default function Quote(){

    const [quote, setQuote] = useState({text: '', author: ''})

    useEffect(() => {
        (async () => {
            const resQuotes = await fetch("https://type.fit/api/quotes");
            const data = await resQuotes.json();
            const item = data[Math.floor(Math.random() * data.length)];
            setQuote(prev => ({...prev, text: item.text, author: item.author }));
            console.log(item);
          })();
    }, [])


    return (
        // div(footer-main) inside div(footer) so that future childs
        // can be accomodated easily, without breaking the layout
        <div className="footer-main">
            <p className="footer-main__quote">{quote.text}</p>
            <small className="footer-main__author">{quote.author}</small>
        </div>
    ) 
}