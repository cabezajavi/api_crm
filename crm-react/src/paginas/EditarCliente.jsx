import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Formulario from '../components/Formulario'
const EditarCliente = () => {
  const [cliente, setCliente] = useState({})

  const [cargando, setCargando]= useState (false)
  
  const {id} = useParams()
  
  useEffect  ( () =>{
  
    setCargando(!cargando)
  
  const obtenerClienteAPI = async () => {
  try {
    const url = `http://localhost:4000/clientes/${id}`
  
  
  const respuesta = await fetch(url) 
  
  const resultado = await respuesta.json()
  
  setCliente(resultado)
  } catch (error) {
    console.log(error)
  }
  setCargando(false)
  
  } 
  
  obtenerClienteAPI() 
  },[])


  return (
    <>




    <h1 className='font-black text-4xl text-blue-900'>Editar Persona:</h1>
    <p classname="mt-3 ">Formulario para editar datos de una persona:</p>
    {cliente?.nombre ? (
 <Formulario  
 cliente = {cliente}
 cargando = {cargando}
 />
    ): <p className='font-black text-gray-400 text-2xl'> Id de la Persona no existe, revise por favor</p>}
   
</>
  )
}

export default EditarCliente