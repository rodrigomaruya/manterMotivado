import {useEffect,useState} from 'react'
import './frase.css'
// import api from '../api/api'
import Header from '../Header/Header';
import CardFrases from '../CardFrases/CardFrases';
import { users } from '../api/fireBase';
import ceu from '../image/ceu.jpg'
export default function Frase() {

    const [dados,setDados]=useState([])
    let count=0
    useEffect(()=>{

        users().then(res=>{
            setDados(res.docs)
            
    
        }).catch(error=>{
            console.log(error)
        })

    },[])
    
    const copy=async()=>{
        await navigator.clipboard.writeText(dados[0].s_frases_frases)
        alert('Frase copiada')
    }

  return (
    <>
        <Header/>
        <main className='conteudo_main'>
            
            <div className='grid'>
                <div className='conteudo_principal_esquerda' >
                    <h2>Frases</h2>
                    {dados.map((dados=><CardFrases key={count++} copy={copy} dados={dados.data().frases}/>))}
                </div>
       
                <div className='conteudo_direita'>
                    <img src={ceu} alt="imagem-ceu" className='img-ceu' />
                </div>

            </div>
        </main>
    </>

  )
}
