import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function CustomProgress({ seconds, onTimeFinish }) {
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const totalTime = seconds * 1000; // Convert seconds to milliseconds
    const steps = 100; // Number of steps (1% increments)
    const stepDuration = totalTime / steps; // Time for each step

    let currentProgress = 100;

    const timer = setInterval(() => {
      currentProgress -= 1; // Decrease progress by 1%
      setProgress(currentProgress);
      if (currentProgress === 0) {
        clearInterval(timer); // Stop the interval when progress reaches 0
        if (typeof onTimeFinish === 'function') {
          onTimeFinish(); // Call the callback function if provided
        }
      }
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, onTimeFinish]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
