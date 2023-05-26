import React, { useState } from 'react';

const Journal = () => {
  const [content, setContent] = useState('');

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const saveJournalEntry = () => {
    // Here, you can implement your logic to save the journal entry
    console.log(content);
    // Reset the content after saving if desired
    setContent('');
  };

  return (
    <div>
      <h1>Journal</h1>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Write your journal entry here..."
        rows={10} // Adjust the number of rows as desired
        cols={80} // Adjust the number of columns as desired
      />
      <br />
      <button onClick={saveJournalEntry}>Save</button>
    </div>
  );
};

export default Journal;