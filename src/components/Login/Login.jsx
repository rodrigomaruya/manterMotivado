import {useState,useEffect} from 'react'
import './login.css'
import Header from '../Header/Header'
import FireB from '../api/fireBase'
import { useNavigate } from 'react-router-dom'
import Loading from '../Carregamento/Carregamento'
import { recuperaSenha } from '../api/fireBase'
import propTypes from 'prop-types'


export default function Login({showModal,closeModal}) {

    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const [recover,setRecover]=useState(true)
    const [recoverE,setRecoverE]=useState(true)
    const [dispMail,setDispMail]=useState('0')
    const [showLoading,setShowLoading]=useState(false)
    
    const navigate=useNavigate()

    const errorM={
        width: '100%',
        textAlign:'center',
        color: 'red',
        fontSize:'.8rem',
        opacity:dispMail
    }

    useEffect(()=>{
        function isMailValid(){
            if(!email){
                setRecover(true)
                setDispMail('0')
            }else{
                setRecover(false)

            }
        }

        function isPassValid(){
            if(!pass){
                return setRecoverE(true)
            }
            return setRecoverE(false)
        }
  
        isMailValid()
        isPassValid()
     
    },[email, pass, navigate])
     

 
    const inMail=()=>{
        setShowLoading(true)
        
        FireB(email,pass).then(()=>{
            navigate('/')
            closeModal()
        })
        .catch(erro=>{
            console.log(erro)
            setDispMail('10')
            setShowLoading(false)
        })
        
    }

   
    const recuperarSenha=()=>{
        setShowLoading(true)
        recuperaSenha(email).then(()=>{
            console.log('com sucesso')
            alert('Um email de recuperação de senha foi enviado, para a sua caixa de mensagem!')
            setShowLoading(false)

        }).catch(()=>{
            console.log('erro')
            setShowLoading(false)
            setDispMail('10')
        })
    }
    
  return (
    <div className='formContainer'>
        {showLoading &&(<Loading/>)}
        <Header/>
        <form>
            <h1>Login</h1>
            
            <div className='error'style={errorM}>E-mail ou senha invalido,</div>
            <div className='mailConteiner'>
                <label>Email:</label>
                <input type="email" name='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className='passContainer'>
                <label>Password:</label>
                <input type="password" name='password' placeholder='Password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
            </div>
            <div className='btnContainer'>
                <button type='button' disabled= {recover}  onClick={recuperarSenha}>Recuperar senha</button>
                <button type='button' disabled= {recoverE} onClick={inMail} >Entrar</button>
                <button type='button'onClick={()=>showModal()}>Cadastrar</button>
            </div>
        </form>

    </div>

  )
}
Login.propTypes={
    showModal:propTypes.any
}.isRequired