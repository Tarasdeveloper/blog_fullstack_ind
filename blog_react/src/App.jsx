import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import AddBlog from './pages/AddBlog/AddBlog';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/addBlog" element={<AddBlog />} />
            </Routes>
        </div>
    );
}

export default App;
