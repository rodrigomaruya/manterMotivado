import {useState} from 'react'
import './modalLogin.css'
import Login from '../Login/Login'
import Registrar from '../Registar/Registrar'
import { MdClose } from "react-icons/md";
import propTypes from 'prop-types'


export default function ModalLogin({close}) {

    const [showCadastrar,setShowCadastrar]=useState(false)
  return (
    
    <div className='container-show-modal-login'>
      <div className='content-show-modal'>
        <div className='close'>
          <MdClose onClick={()=>close()}/>
        </div>

        {!showCadastrar && (
          <Login showModal={()=>setShowCadastrar(true)} close={()=>setShowCadastrar(false)}/>
        )}

        {showCadastrar && (
            <Registrar/>
        )} 
            
      </div>
    </div>
  )
}
ModalLogin.propTypes={
  close:propTypes.any
}.isRequired