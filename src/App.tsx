
import './App.css'
import TasksPage from './pages/TasksPage'
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="list" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
