// import { useState } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import Weather from "./components/Weather";
import PaginatedTable from "./components/PaginatedTable";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <ul>
          <li>
            <Link to="/todo">Todo List App</Link>
          </li>
          <li>
            <Link to="/weather">Weather Dashboard</Link>
          </li>
          <li>
            <Link to="/table">Paginated Table</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/table" element={<PaginatedTable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
