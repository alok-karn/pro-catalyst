// import React from 'react';
// import { GitHubCalendar } from 'react-github-calendar';

// const GithubProgressTracker = () => {
//   // Generate sample data for the calendar
//   const generateData = () => {
//     const today = new Date();
//     const data = [];

//     // Iterate over 365 days
//     for (let i = 0; i < 365; i++) {
//       const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000); // Subtract i days from today's date
//       const value = Math.floor(Math.random() * 6); // Random value between 0 and 5
//       data.push({ date, count: value });
//     }

//     return data;
//   };

//   // Get the data for the calendar
//   const data = React.useMemo(() => generateData(), []);

//   return (
//     <div>
//       <h1>Github Progress Tracker</h1>
//       <GitHubCalendar values={data} />
//     </div>
//   );
// };

// export default GithubProgressTracker;

import React from 'react';
import GitHubCalendar from 'react-github-calendar';

function MyComponent() {
  return (
    <div>
      <GitHubCalendar username="alok-karn" />
    </div>
  );
}

export default MyComponent;
