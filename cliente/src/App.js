import './App.css';
import {useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const noti = withReactContent(Swal)

function App() {

const [nombre,setNombre]= useState("");
const [edad,setEdad]= useState("0");
const [pais,setPais]= useState("");
const [cargo,setCargo]= useState("");
const [anios,setAnios]= useState("0");
const [id,setId]= useState("");

const [editar,setEditar]= useState(false);

const [personaList,setPersona] = useState([]);


const add =()=>{
  axios.post("http://localhost:3001/create", {
  nombre:nombre,
  edad:edad,
  pais:pais,
  cargo:cargo,
  anios:anios
  }).then(()=>{
    limpiarCampos();
    noti.fire({
      title: "<strong>Registro exitoso</strong>",
      text:"El empleado "+nombre+" fue registrado con exito",
      icon: "success"
    });
  });
  };

  const update =()=>{
    axios.put("http://localhost:3001/update", {
    Id_Persona:id,  
    nombre:nombre,
    edad:edad,
    pais:pais,
    cargo:cargo,
    anios:anios

    
    }).then(()=>{
        getPersona();
        noti.fire({
          title: "</strong>Actualizado con exito!</strong>",
          icon: "success"
        });
        limpiarCampos();
    });
    };

    
    const Eliminar =(Id_Persona)=>{
      console.log(Eliminar);
      noti.fire({
        title: "<strong>Desea eliminar</strong>?",
        text: "Se eliminara por completo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, deseo eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3001/delete/${Id_Persona}`).then(()=>{
             getPersona();
             limpiarCampos();
        });


          noti.fire({
            title: "<strong>Eliminacion exitosa</strong>!",
            text: "Usuario Eliminado",
            icon: "success"
          });
        }
      });

      };





    const limpiarCampos =()=>{

      setAnios("");
      setNombre("");
      setCargo("");
      setEdad("");
      setPais("");
      setEditar(false);
    }

  const editarPersona = (val)=>{
      setEditar(true);
      setNombre(val.nombre);
      setEdad(val.edad);
      setCargo(val.cargo);
      setPais(val.pais);
      setAnios(val.anios);
      setId(val.Id_Persona);
      
}


  const getPersona =()=>{
  axios.get("http://localhost:3001/persona").then((response)=>{
    setPersona(response.data);
  });

}

  return (
    <div className="container">  
          <div className="card text-center">
        <div className="card-header">
          <strong>Gestion de Personal</strong>
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Nombre:</span>
        <input type="text"
        onChange={(event)=>{
          setNombre(event.target.value);
        }}
        className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>


        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Edad:</span>
        <input type="number"
        onChange={(event)=>{

          setEdad(event.target.value);
        }}
        className="form-control" value= {edad} placeholder="Ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>



        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Pais:</span>
        <input type="text"
       onChange={(event)=>{

        setPais(event.target.value);
      }}
        className="form-control" value= {pais}placeholder="Ingrese una Pais" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>



        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Cargo:</span>
        <input type="text"
        onChange={(event)=>{

          setCargo(event.target.value);
        }}
        className="form-control" value={cargo} placeholder="Ingrese su cargo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>


        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Experiencia:</span>
        <input type="number"
       onChange={(event)=>{

        setAnios(event.target.value);
      }}
        className="form-control" value= {anios}placeholder="Ingrese años de experiencia" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        </div>
        <div className="card-footer text-body-secondary">
          {
              editar?
              
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
                <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>
                :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
          
          <button className='btn btn-warning m-2' onClick={getPersona}>Listar</button> 
        </div>
</div>

    <table className="table table-striped">
    <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Pais</th>
      <th scope="col">Cargo</th>
      <th scope="col">Experiencia(años)</th>
      <th scope="col">Acciones</th>
    </tr>
    </thead>
    <tbody>
 
    {
         personaList.map((val,key)=>{
        return <tr 
                key={val.Id_Persona}>
                <th>{val.Id_Persona}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                    onClick={()=>{
                        editarPersona(val);
                    }}  
                    
                    className="btn btn-info">Editar</button>
                    <button type="button" onClick={()=>{
                        Eliminar(val.Id_Persona);
                    }} className="btn btn-danger">Eliminar</button>
                </div>

                  </td>
                </tr>

        })
          
        }
   
      </tbody>
    </table>


    </div>
  )
};

export default App;