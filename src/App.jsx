import { useEffect, useState } from 'react'
import './App.css'
import xIcon from "./assets/icons/x-icon.png"



function App() {
  const [newQuote, setNewQuote] = useState(null);
  const [tweet, setTweet] = useState('')
  const [cachedData, setCacheddata] = useState(null)
  const [color, setColor] = useState('#16a085')
  const APIurl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

  useEffect(() => {
    if (!newQuote) {
      fetchData()
        .then(data => {
          setCacheddata(data)
          generateNewQuote(data)
        })
    }
  }, [])

  useEffect(() => {
    { newQuote && setTweet(`https://twitter.com/intent/tweet?text=${newQuote.quote}`) }
  }, [newQuote, cachedData]);

  const fetchData = async () => {
    const response = await fetch(APIurl);
    const data = await response.json();
    return data.quotes;
  }

  const generateNewQuote = (fdata) => {
    const randomIndex = Math.floor(Math.random() * fdata.length)
    const { quote, author } = fdata[randomIndex]
    setNewQuote({ quote, author })
  }

  return (
    <>
      <main style={{backgroundColor: color}}>
        <section id='quote-box'>

          {newQuote && (

            <>

              <div id='quote-container' style={{color: color}}>
                <p id='text'><span><i className="fa fa-quote-left"></i></span>{newQuote.quote}</p>
                <p id='author'><span>-</span>{newQuote.author}</p>
              </div>


              <div id='btns-container'>
                <a id='tweet-quote' href={tweet} target="_blank" rel="noopener noreferrer" style={{backgroundColor: color}}><img src={xIcon} alt="twitter icon" /></a>
                <button id='new-quote' onClick={() => generateNewQuote(cachedData)} style={{backgroundColor: color}}>New quote</button>
              </div>

            </>

          )}

        </section>
      </main>
    </>
  )
}


export default App


