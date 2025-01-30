
import './App.css'
import Layout from './Layout';
import ManagerPage from './pages/ManagerPage';
import TasksPage from './pages/TasksPage'
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="list" element={<TasksPage />} />
          <Route path="manager" element={<ManagerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
