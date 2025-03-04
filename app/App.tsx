import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { HashRouter, Route, Routes } from 'react-router'

import './App.css'

import Layout from './Layout'

import HomePage from './pages/HomePage'
import TasksPage from './pages/TasksPage'
import ManagerPage from './pages/ManagerPage'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="list" element={<TasksPage />} />
            <Route path="manager" element={<ManagerPage />} />
            <Route path="home" element={<HomePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
