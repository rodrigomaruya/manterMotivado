import { useState,useEffect} from 'react'
import { CiCirclePlus } from "react-icons/ci";
import Header from '../components/Header/Header'
import Modal from '../Modal/Modal';
import './home.css'
import ModalLogin from '../components/ModalLogin/ModalLogin';
import { auth } from '../components/api/fireBase';
import * as firebase from 'firebase/auth'
import CardFrases from '../components/CardFrases/CardFrases';
import { users } from '../components/api/fireBase';
export default function Home() {
  
  const [showModal,setShowModal]=useState(false)
  const [showModalLogin,setShowModalLogin]=useState(false)
  const [user,setUser]=useState('')
  
  const ativarModal=()=>{
    
    firebase.onAuthStateChanged(auth,(user)=>{
      if(user==null){
        
        setShowModalLogin(true)
        setShowModal(false)
      }else{
        setUser(user.email)
        setShowModalLogin(false)
        setShowModal(true)
        

      }
    })
  }
  const [dados,setDados]=useState([])
  let count=0
  useEffect(()=>{
  
      users().then(res=>{
          setDados(res.docs)
          
        
      }).catch(error=>{
          console.log(error)
      })
  },[])

  return (
    <>
      <Header />
      <div className='divImage'></div>
        <main className='homeMain'>
          <div className='homeDiv'>
          
            <div className='homeP1'>
              {dados.map(dados=><CardFrases key={count++} dados={dados.data().frases}/>)}
            </div>
            <div className='homeP2'>
              <button onClick={ativarModal}><CiCirclePlus />Adicionar pensamento</button>
            </div>
          </div>
      </main>
      
        {showModal && (
          <Modal closeModal={()=>setShowModal(false)} user={user}/>
        )}
        {showModalLogin && (
          <ModalLogin close={()=>setShowModalLogin(false)}/>
        )}

    </>
  )
}
