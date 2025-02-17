import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import ManagerPage from './pages/ManagerPage'
import TasksPage from './pages/TasksPage'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="list" element={<TasksPage />} />
            <Route path="manager" element={<ManagerPage />} />
            <Route path="home" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
