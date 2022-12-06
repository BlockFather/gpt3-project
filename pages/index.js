import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import threadwtfLogo from '../assets/threadwtfLogo.svg';
import { useState } from 'react';

import Emoji from '../componenets/emoji'

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  } 
  

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>thread.wtf</h1>
            <h1><Image src={threadwtfLogo} alt="BlockFather did this" /></h1>
          </div>
          <div className="header-subtitle">
            <div/>
            <div>
            <Emoji symbol="💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡" label="idea"/>
            </div>
            <h2>First, present a topic.</h2>
            <h2>Then:</h2>
            <h2> <Emoji symbol="🤖" label="AI"/>Beep Boop...</h2>
            <h2>You get a Twitter thread.</h2>
            <h2>WTF?</h2>
            <h2>It's that simple.</h2>
            <div>
            <Emoji symbol="💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡💡" label="idea"/>
            </div>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea
            placeholder="start typing the topic for your latest twitter thread!"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://blockfather.xyz"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={threadwtfLogo} alt="thread.wtf logo" />
            <h3>
              built  by  BlockFather
            </h3>
            <div><Emoji symbol="💡" label="idea"/></div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
