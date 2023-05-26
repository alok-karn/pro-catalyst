import React, { useEffect, useState } from 'react';
import openai from 'openai';

// Set up your OpenAI API credentials
openai.api_key = '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';

const SentimentGenerator = () => {
  const [generatedSentiment, setGeneratedSentiment] = useState('');

  useEffect(() => {
    const generateSentiment = async () => {
      try {
        // Define the prompt
        const prompt =
          "Yesterday I was feeling really down and alone, but then I discovered this incredible app. It's amazing how it has provided me with a new sense of belonging and a supportive community. I'm truly grateful to everyone here.";

        // Generate response using the language model
        const response = await openai.Completion.create({
          engine: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.7,
          n: 1,
          stop: null,
          timeout: 15000,
        });

        // Extract the generated sentiment
        const generatedSentiment = response.choices[0].text.trim();

        // Set the generated sentiment state
        setGeneratedSentiment(generatedSentiment);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    generateSentiment();
  }, []);

  return (
    <div>
      <h1>Generated Sentiment:</h1>
      <p>{generatedSentiment}</p>
    </div>
  );
};

export default SentimentGenerator;
