// Blocker.js
import React from 'react';

const blockerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  zIndex: 1000, // Ensure it covers other elements
};

const Blocker = ({ onClick }) => (
  <div style={blockerStyle} onClick={onClick}>
    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Click anywhere to explore</p>
    <p>Move: WASD<br/>Look: MOUSE<br/>Esc: Pause</p>
  </div>
);

export default Blocker;
