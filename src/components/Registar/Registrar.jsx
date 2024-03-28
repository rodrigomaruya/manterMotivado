import { useEffect, useState } from 'react'
import './registrar.css'
import Header from '../Header/Header'
import { register } from '../api/fireBase'
import Loading from '../Carregamento/Carregamento'
import {useNavigate} from 'react-router-dom'



export default function Registrar() {

    const [email,setEmail]=useState('')
    const [emailErro,setEmailErro]=useState(false)
    const [senha,setSenha]=useState('')
    const [senhaErro,setSenhaErro]=useState(false)
    const [confirmarSenha,setConfirmaSenha]=useState('')
    const [registarDisable,setRegistrarDisable]=useState(true)
    const [loading,setLoading]=useState(false)
    
    const navigate=useNavigate()

    const validateEmail=(email)=>{
        let validate=/\S+\.\S+/;
        return validate.test(email)
    }

    
    

    useEffect(()=>{
        
            if(validateEmail(email) || email==""){
                setEmailErro(false)
                
            }else{
                setEmailErro(true)
            }
           
            if(senha.length>=6 || senha.length==0){
                setSenhaErro(false)
                  
            }else{
                setSenhaErro(true)
            }
            
            if(senha.length>0 && senha===confirmarSenha &&  validateEmail(email)){
                
                setRegistrarDisable(false)
            }else{
                setRegistrarDisable(true)
            }

    },[email,senha,confirmarSenha,registarDisable])
   

    const novoUsuario=()=>{
        setLoading(true)
        register(email,senha).then(()=>{
            setLoading(false)
            navigate('/')
        }).catch(error=>{
            setLoading(false)
            alert(getMenssageError(error))
        })
    }

    function getMenssageError(error){
        if(error.code=='auth/email-already-in-use'){
            return 'Email já está em uso'
        }
    }

  return (
    <>
         {loading && <Loading/>}
        <Header/>
        <form>
            <h1>Cadastrar</h1>
            <div className='divConteiner'>
                <div className='divCampo'>
                    <div><label>Email</label><span>{emailErro?'Email Invalido':''}</span></div>
                    <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='divCampo'>
                    <div><label>Senha</label><span>{senhaErro?'A senha deve conter no mínimo 6 caracteres':''}</span></div>
                    <input type="password" placeholder='Senha' value={senha} onChange={e=>setSenha(e.target.value)}/>
                </div>
                <div className='divCampo'>
                    <div>Confirmar senha</div>
                    <input type="password" placeholder='Confirmar Senha' onChange={e=>setConfirmaSenha(e.target.value)}/>
                </div>
                <div className='divButton'>
                    <button type='button' disabled={registarDisable} onClick={novoUsuario}>Cadastrar</button>
                    
                </div>
            </div>
        </form>
    </>

  )
}
