
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Frase from './components/Frases/index'
import Home from './Home'


export default function RouterApp() {
  return (
    <BrowserRouter>
        <Routes>
            
            <Route path='/' element={<Home/>}></Route>
            <Route path='/frase' element={<Frase/>}></Route>

            
        </Routes>
    
    </BrowserRouter>
  )
}
