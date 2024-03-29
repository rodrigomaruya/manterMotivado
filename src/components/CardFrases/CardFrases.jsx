import propTypes from 'prop-types'
import { GiPadlockOpen } from "react-icons/gi";
import { FaRegCopy } from "react-icons/fa"
import './cardFrases.css'

export default function CardFrases({dados}) {
    const {frase,autor,nome}=dados

    const copy=async()=>{ 
        await navigator.clipboard.writeText(dados.frase)
        alert('Frase copiada')
    }

    let count=0
  return (
    <> 
        <div className='frasesD' key={count++}>
            <GiPadlockOpen style={{fontSize:'2rem',padding:'2px',color:'#70224B',marginRight:'5px'}}/>
            <p>{frase}</p>
            <div className='autor'>
                <h3>Autor :</h3>
                <p>{String(autor).toLocaleUpperCase()}</p>
            </div>
                
            <footer className='footer'>
                <div>
                    <h3>Enviado por :</h3>
                    <p>{String(nome).toLocaleUpperCase()}</p>
                </div>
                <button onClick={()=>copy()}><FaRegCopy /></button>
            </footer>
        </div>     
    </>
  )
}
CardFrases.propTypes={
    object:propTypes.any
}.isRequired