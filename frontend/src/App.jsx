import './App.css'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Navbar from './Components/Navbar'

function App() {
  

  return (
    <>
      <Navbar/>
      <div className='h-136 bg-gray-400 flex justify-center'>
        <Home />
      </div>
      <Footer />
    </>
  )
}

export default App
