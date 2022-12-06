import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Write me a twitter thread that has a catchy hook in the first tweet and is intriguing, informative, well written in the voice of a best friend who is very articulate. Please make sure the thread has a call to action and brief words of wisdom at the end with the title below.

Title:
`
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
  
    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${basePromptPrefix}${req.body.userInput}`,
      temperature: 0.87,
      max_tokens: 500,
    });
    
    const basePromptOutput = baseCompletion.data.choices.pop();
  
    // I build Prompt #2.
    const secondPrompt = 
    `
    Take the twitter thread and make sure it has 5 points maximum and uses hastags on trending twiiter words.
  
    Title: ${req.body.userInput}
  
    Table of Contents: ${basePromptOutput.text}
  
    Blog Post:
    `
    
    // I call the OpenAI API a second time with Prompt #2
    const secondPromptCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${secondPrompt}`,
      // I set a higher temperature for this one. Up to you!
      temperature: 0.85,
          // I also increase max_tokens.
      max_tokens: 1250,
    });
    
    // Get the output
    const secondPromptOutput = secondPromptCompletion.data.choices.pop();
  
    // Send over the Prompt #2's output to our UI instead of Prompt #1's.
    res.status(200).json({ output: secondPromptOutput });
  };
  
  export default generateAction;