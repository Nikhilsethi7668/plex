import { useState } from 'react'
import RegistrationForm from './Pages/RegistrationForm'
import LoginPage from './Pages/LoginPage'
import AppRoutes from './Components/AppRoutes'
import ProtectedRoute from './Components/ProtectedRoutes'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="routes">
        <AppRoutes />
      </div>

    </>
  )
}

export default App
