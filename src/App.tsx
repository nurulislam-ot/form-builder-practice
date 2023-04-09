import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Tasks from './components/Tasks'
import FormBuilder from './pages/FormBuilder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <div className='container mx-auto px-20'>
              <h1 className='text-4xl font-bold mb-5'>Task Manager</h1>
              <Tasks />
            </div>
          }
        />

        <Route path='form-builder' element={<FormBuilder />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
