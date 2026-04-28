import React, { useState } from 'react';
import News from './components/News';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <span className="navbar-brand">📰 Newsnet</span>
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <button className="btn btn-sm btn-outline-secondary" onClick={toggleDarkMode}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </nav>

      <News darkMode={darkMode} query={query} />
    </div>
  );
}

export default App;
