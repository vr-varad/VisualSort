import React from 'react';

function Bar({ value }) {
  const barStyle = {
    height: `${value*5}px`,
    width: '20px', // Adjust width as needed
    backgroundColor: 'black',
    margin: '0 2px', // Add margin between bars
    position: 'relative', // Set position to relative for absolute positioning of text
  };

  const textStyle = {
    position: 'absolute',
    top: '-20px', // Adjust distance of text from the bar
    left: '50%', // Center text horizontally
    transform: 'translateX(-50%)', // Center text horizontally
    color: 'black   ', // Text color
  };

  return (
    <div style={barStyle}>
      <div style={textStyle}>{value}</div>
    </div>
  );
}

export default Bar;
