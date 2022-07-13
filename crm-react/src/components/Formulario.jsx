import React from 'react'
import {Formik, Form, Field, } from 'formik'
import{useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ( { cliente, cargando }) => {

  const navigate = useNavigate()


  const nuevaPersonaSchema = Yup.object().shape({

    nombre:Yup.string()
              .min(3, 'El nombre es demasiado corto') 
              .max(40, 'El nombre es muy largo')   
              .required('El nombre de la persona es obligatorio'),
    direccion:Yup.string()
                 .required('Ladireccion de la persona es obligatoria'),

    email:Yup.string()
            .email('Email no valido')
            .required('El campo de email es obligatorio'),
    telefono:Yup.number()
                .positive('Numero no valido')
                .integer('Numero no valido')
                .typeError('El Numero no es valido'), 

    observaciones:'',
  })

  const handleSubmit = async (valores) =>{

try {

  let respuesta 

  if (cliente.id) {
  //Editando un registro
  const url = `http://localhost:4000/clientes/${cliente.id}`
  const respuesta = await fetch(url, {
    method:'PUT',
    body: JSON.stringify(valores),
    headers:{
      'Content-Type': 'application/json'  
    }
  
  })
} else {
  //Nuevo registro
  const url = 'http://localhost:4000/clientes'

  const respuesta = await fetch(url, {
    method:'POST',
    body: JSON.stringify(valores),
    headers:{
      'Content-Type': 'application/json'  
    }
  
  })
}

 await respuesta.json()
  

navigate('/clientes')

} catch (error) {
  console.log(error)
}

  }

  return (

cargando ? <Spinner /> : (

    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md-w-3/4 mx-auto' >
<h1 className='text-grey-600 font-bold text-xl uppercase text-center '>{cliente?.nombre ? 'Editar Persona': 'Nueva Persona'}</h1>

<Formik initialValues={{
  nombre:cliente?.nombre ?? "",
  direccion:cliente?.direccion ?? "",
  email:cliente?.email ?? "",
  telefono:cliente?.telefono ?? "",
  observaciones:cliente?.observaciones ?? "",
}}

enableReinitialize={true}

onSubmit = { async (values, {resetForm})=>{

  handleSubmit(values)
  resetForm()
}}
validationSchema={nuevaPersonaSchema}
>
{( { errors, touched }) =>{
 
///console.log(errors)
  return (



<Form className='mt-10'>
<div className='mb-4'>
<label className='text-gray-800' htmlFor='nombre'>Nombre:</label> <Field id="nombre" type = "text" className='mt-2 block w-full p-3 bg-gray-50' placeholder="Nombre de la Persona" name="nombre"/> 
{errors.nombre && touched.nombre ? (
 <Alerta>{ errors.nombre }</Alerta>
):null}
</div>
<div className='mb-4'>
<label className='text-gray-800' htmlFor='direccion'>Direccion:</label> <Field id="direccion" type = "text" className='mt-2 block w-full p-3 bg-gray-50' placeholder="Direccion de la Persona" name="direccion"/>
{errors.direccion && touched.direccion ? (
 <Alerta>{ errors.direccion }</Alerta>
):null}
</div>
<div className='mb-4'>
<label className='text-gray-800' htmlFor='email'>E-mail:</label> <Field id="email" type = "email" className='mt-2 block w-full p-3 bg-gray-50' placeholder="Correo Electronico de la Persona" name="email"/>
{errors.email && touched.email ? (
 <Alerta>{ errors.email }</Alerta>
):null}
</div>
<div className='mb-4'>
<label className='text-gray-800' htmlFor='telefono'>Telefono:</label> <Field id="telefono" type = "text" className='mt-2 block w-full p-3 bg-gray-50' placeholder="Telefono de la Persona" name="telefono"/>
</div>
<div className='mb-4'>
<label className='text-gray-800' htmlFor='nota'>Observaciones:</label> <Field  as="textarea" id="observaciones" type = "text" className='mt-2 block w-full p-3 bg-gray-50 h-40' placeholder="Observaciones" name="observaciones"/>
</div>

<input type="submit" value= {cliente?.nombre ? 'Modificar Persona': 'Alta Persona'} className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg '/>



</Form>
)}}
</Formik>



    </div>
    )
  )
}

Formulario.defaultProps = {

cliente:{},
cargando:false
}

export default Formulario