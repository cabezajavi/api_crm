import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {
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
    cargando ? <Spinner /> : 
    Object.keys(cliente).length===0 ? <p>NO HAY RESULTADOS QUE MOSTRAR</p>:
    
    (


    <div>

  

  <>
  
<h1 className='font-black text-4xl text-blue-900'>Datos Persona : {cliente.nombre}</h1>
        <p classname="mt-3 ">Informacion sobre la persona </p>
      
        <p className="text-4xl text-gray-600 mt-10 ">
          <span className=' text-gray-800 uppercase font-bold '>Persona: </span> {cliente.nombre} </p>
          <p className="text-2xl text-gray-600 mt-4 ">
          <span className=' text-gray-800 uppercase font-bold'>Email: </span> {cliente.email} </p>
          <p className="text-2xl text-gray-600 mt-4">
          <span className=' text-gray-800 uppercase font-bold'>Telefono: </span> {cliente.telefono} </p>
          <p className="text-2xl text-gray-600 mt-4 ">
          <span className=' text-gray-800 uppercase font-bold '>Direccion: </span> {cliente.direccion} </p>

          {cliente.observaciones&& ( <p className="text-2xl text-gray-600 mt-4 ">
          <span className=' text-gray-800 uppercase font-bold '>Observaciones: </span> {cliente.observaciones} </p>
          )}

</>
         
          
    </div>
    )
  )
}

export default VerCliente