import {useState} from 'react'
import './modal.css'
import propTypes from 'prop-types'
import { IoMdClose } from "react-icons/io";
import { db } from '../components/api/fireBase';
import { addDoc, collection } from 'firebase/firestore';


export default function Modal({closeModal,user}) {
    const [pegarTextArea,setPegarTextArea]=useState('')
    const [pegarAutor,setPegarAutor]=useState('')
    const [nome,setNome]=useState('')

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;


    const enviarFrases= async()=>{

        if(pegarTextArea.length==0){
            alert('Por favor escreva uma frase')
        }else if (pegarAutor.length==0) {
            alert('Por favor escreva nome do autor')
        }else if(nome.length==0 ){
            alert('Por favor escreva um nome')
        }else{

        try {
            const docRef = await addDoc(collection(db, "frases"), {
                data:formattedToday,
                user:user,
                frases:{
                frase:pegarTextArea,
                autor:pegarAutor,
                nome:nome
                }
        
            });
            console.log("Document written with ID: ", docRef.id);
            closeModal()
          } catch (e) {
            console.error("Error adding document: ", e);

          }
        }  
    }

  return (
    <>
        <div className='modalMain'>
            <div className='modalConteiner'>
                <div className='modalClose'>
                    <IoMdClose onClick={closeModal}/>
                </div>
                <div className='modalTextArea'>
                    <textarea placeholder='Digite uma frase' value={pegarTextArea} onChange={(e)=>setPegarTextArea(e.target.value)}></textarea>
                </div>
                <div className='modalInput'>
                    <span>Autor:</span>
                    <input type="text" name="f_autor" id="f_autor" value={pegarAutor} onChange={(e)=>setPegarAutor(e.target.value)}/>
                </div>
                <div className='modalInput'>
                    <span>Nome:</span>
                    <input type="text" name="f_nome" id="f_nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                </div>
                <div className='modalButton'>
                    <button onClick={enviarFrases}>Enviar</button>
                </div>
            </div>
        </div>
    
    </>
  )
}
Modal.propTypes={
    object:propTypes.any
}.isRequired