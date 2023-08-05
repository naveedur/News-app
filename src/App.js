import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
function App() {

  const pageSize = 12;
  const apiKey = "865469551b124b0aba3512d45504c989"
  const [progress, setProgress] = useState(0)
  const Country= "in"
  return (
    <div className="App">
       <Router>
       <NavBar/> 
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
      <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={Country} category="general"/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country={Country} category="business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={Country} category="entertainment"/>}/>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={Country} category="general"/>}/> 
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country={Country} category="health"/> }/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country={Country} category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={Country} category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={Country} category="technology"/>}/>

      </Routes>
    </Router>
    </div>
  );
}

export default App;
