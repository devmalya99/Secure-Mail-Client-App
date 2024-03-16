

import './App.css'
import { AuthProvider } from './AuthContext/AuthContext'
import Navigation from './Components/Navigation'

function App() {


  return (
<div className=' w-full'>
   <AuthProvider>
    <Navigation/>
   </AuthProvider>
</div>
  )
}

export default App
