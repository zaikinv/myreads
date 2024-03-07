import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchBooks from './views/SearchBooks.tsx';
import ListBooks from './views/ListBooks.tsx';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ListBooks title={'MyBooks'}></ListBooks>}
          ></Route>
          <Route path="/search" element={<SearchBooks></SearchBooks>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
