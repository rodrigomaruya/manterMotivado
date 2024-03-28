import './header.css'
import { TiAnchor } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { useEffect,useState } from 'react';
import { logOut } from '../api/fireBase';
import { FaSignOutAlt } from "react-icons/fa";
import { auth } from '../api/fireBase';
import * as fireBaseAuth from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import ModalLogin from '../ModalLogin/ModalLogin';

export default function Header() {
   
    const [logado1,setLogado1]=useState(true)    
    const navigate= useNavigate()
    const [showModalLogin,setShowModalLogin]=useState(false)


    useEffect(()=>{
      fireBaseAuth.onAuthStateChanged(auth,(any)=>{
        if(any==null){
            
            setLogado1(true)
        }else{
            setShowModalLogin(false)
            setLogado1(false)
            
        }
      })
    },[setLogado1,navigate])
    
    const logOut1=()=>{
        logOut().then(()=>{
            navigate('/')

        }).catch(error=>{
            console.log(error)
        })
        
    }
      
    return (
        <>
            <header className='conteudo_header'>
                
                <div className='bar'>
                    <div className='titulo'>
                        <TiAnchor />
                        <h1>Manter Motivado</h1>
                    </div>

                    <div className='btn_menus'>
                        <Link to={'/'} className='link'>Home</Link>
                        <Link to={'/frase'} className='link'>Recentes</Link>
                        {logado1 && <Link className='link' onClick={()=>setShowModalLogin(true)}>Entrar</Link>}
                        
                        <div className='divIcon'>
                            {!logado1 && <FaUser  className={` ${!logado1?'icon': 'icon1'}`}/>}
                            {!logado1 && <FaSignOutAlt className='icon1' onClick={logOut1}/>}
                        </div>

                    </div>

                 

                </div>

            </header>
            {showModalLogin && (
                <ModalLogin close={()=>setShowModalLogin(false)}/>
            )}
        </>

    )
}
