import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react'
import './App.css'
import xIcon from "./assets/icons/x-icon.png"
import hashimImg from "./assets/images/hashim-baig.png"

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"]

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

  const generateNewQuote = (fetchedData) => {
    const randomIndex = Math.floor(Math.random() * fetchedData.length);
    const randomColor = Math.floor(Math.random() * colors.length);
    const { quote, author } = fetchedData[randomIndex];
    setNewQuote({ quote, author });
    setColor(colors[randomColor]);
  }

  return (
    <>
      <main style={{ backgroundColor: color }}>
        <section id='quote-box'>

          {newQuote && (

            <div id='quote-container' style={{ color: color }} >
              <p id='text'><span><i className="fa fa-quote-left"></i></span>{newQuote.quote}</p>
              <p id='author'><span>-</span>{newQuote.author}</p>
            </div>

          )}

          <div id='btns-container'>
            <a id='tweet-quote' href={tweet} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: color }}><img src={xIcon} alt="twitter icon" /></a>
            <button id='new-quote' onClick={() => generateNewQuote(cachedData)} style={{ backgroundColor: color }}>New quote</button>
          </div>

        </section>

        <section id='credits-container'>
          <span>by</span>
          <div>
            <img src={hashimImg} alt="Hashim Baig" />
            <span>Hashim Baig</span>
          </div>
        </section>
      </main>
      <Analytics />
    </>
  )
}


export default App


