import { useEffect, useState } from 'react';
import Search from './Pages/Search.jsx';
import ImageList from './Pages/ImageList.jsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="/images" element={<ImageList />} />              
                </Routes>
            </Router>
        </div>
    );
    
}

export default App;