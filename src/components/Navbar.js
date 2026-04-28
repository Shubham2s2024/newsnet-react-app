import React from 'react';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#282c34',
      padding: '10px 20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-around'
    }}>
      <h2>Newsnet</h2>
      <div style={{ display: 'flex', gap: '15px' }}>
        <a href="#business" style={{ color: 'white', textDecoration: 'none' }}>Business</a>
        <a href="#technology" style={{ color: 'white', textDecoration: 'none' }}>Technology</a>
        <a href="#sports" style={{ color: 'white', textDecoration: 'none' }}>Sports</a>
        <a href="#entertainment" style={{ color: 'white', textDecoration: 'none' }}>Entertainment</a>
      </div>
    </nav>
  );
}

export default Navbar;
