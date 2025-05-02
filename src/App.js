import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";
import Todos from "./Todos";
import Logout from "./Logout";
import CreateTodo from "./CreateTodo";
import TodoForm from './components/TodoForm';
import EditTodo from './components/EditTodo';
import PrivateRoute from "./PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
function App() {
  const { username } = useContext(AuthContext);
  return (
    <AuthProvider>
      <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">TodoApp</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/todos">Todos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/todosForm">TodoForm</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Logout</Link>
                  </li>
              </ul>
              {username && <span className="navbar-text">Welcome, {username}!</span>}
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/todosForm" element={
                <PrivateRoute>
                  <TodoForm />
                </PrivateRoute>
              } />    
          <Route path="/create" element={
                <PrivateRoute>
                  <CreateTodo />
                </PrivateRoute>
              } />
          <Route path="/todos" element={
              <PrivateRoute>
                <Todos />
              </PrivateRoute>
              } />
            <Route path="/todos/edit/:id" element={
            <PrivateRoute>
              <EditTodo />
            </PrivateRoute>
            } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;