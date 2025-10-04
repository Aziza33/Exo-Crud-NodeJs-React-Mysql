import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Student from './component/Student'
import CreateStudent from './component/CreateStudent'
// import UpdateStudent from './component/UpdateStudent'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Student />}></Route>
          <Route path='/create' element={<CreateStudent />}></Route>
          <Route path='/update/:id' element={<CreateStudent />}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
