import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function CustomProgress({ seconds, onTimeFinish }) {
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const totalTime = seconds * 1000; 
    const steps = 100;
    const stepDuration = totalTime / steps;

    let currentProgress = 100;

    const timer = setInterval(() => {
      currentProgress -= 1; 
      setProgress(currentProgress);
      if (currentProgress === 0) {
        clearInterval(timer); 
        if (typeof onTimeFinish === 'function') {
          onTimeFinish(); 
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
