import React, { Component } from 'react';
import axios from "axios";
import Trabajadores from './Trabajadores';

export default class Hospitales extends Component {
    
    cajasalario=React.createRef();
    
    state = {
        hospitales: [],
        selectedHospitales: [], // Almacena las opciones seleccionadas
    }
    
    loadHospitales = () => {
        var url = "https://apiejemplos.azurewebsites.net/api/Hospitales";
        
        axios.get(url).then((response) => {
            this.setState({
                hospitales: response.data,
            });
        });
    }

    componentDidMount = () => {
        this.loadHospitales();
    }

    rellenarTablaHospital = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        
        this.setState({ selectedHospitales: selectedOptions });
      
    }

    aumentarSalario=()=>{
        var incremento = this.cajasalario.current.value
        var url = "https://apiejemplos.azurewebsites.net/api/Trabajadores/UpdateSalarioTrabajadoresHospitales?incremento="+incremento+"&";
        var res = ""
        
        for (let index = 0; index < this.state.selectedHospitales.length; index++) {
            if (index < this.state.selectedHospitales.length - 1) {
                res += "idhospital=" + this.state.selectedHospitales[index]+ "&";
            } else {
                res += "idhospital=" + this.state.selectedHospitales[index];
            }

        }

console.log(url+res)
        axios.put(url + res).then((response) => {
            this.setState({
                trabajadores:response.data
            })
        })
        


    }

    render() {
        const selectedHospitalDetails = this.state.hospitales.filter((hospital) =>
            this.state.selectedHospitales.includes(hospital.idHospital.toString())
        );

        return (
            <div style={{ textAlign: "center" }}>
                <h1>Hospitales</h1>

                <select multiple className='form-select' onChange={this.rellenarTablaHospital}>
                    {this.state.hospitales.map((hospital, index) => {
                        return (<option key={index} value={hospital.idHospital}>{hospital.nombre}</option>)
                    })}
                </select>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Telefonos</th>
                            <th>Camas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedHospitalDetails.map((hospital, index)=>{
                            return(
                                <tr key={index}>
                                <td>{hospital.nombre}</td>
                                <td>{hospital.direccion}</td>
                                <td>{hospital.telefono}</td>
                                <td>{hospital.camas}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <hr></hr>

                <Trabajadores arrayids={this.state.selectedHospitales}></Trabajadores>

                <label style={{margin:"10px"}}>Aumerntar Salario</label>
                <input type='number'ref={this.cajasalario}></input>
                <button className='btn btn-success'style={{margin:"15px"}} onClick={this.aumentarSalario}> Modificar</button>
            </div>
        )
    }
}
