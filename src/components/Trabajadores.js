import React, { Component } from 'react'
import axios from "axios";
export default class Trabajadores extends Component {


    state = {
        trabajadores: []
    }



    loadTrabajadores = () => {
        var url = "https://apiejemplos.azurewebsites.net/api/Trabajadores/TrabajadoresHospitales?";
        var res = ""

        for (let index = 0; index < this.props.arrayids.length; index++) {
            if (index < this.props.arrayids.length - 1) {
                res += "idhospital=" + this.props.arrayids[index]+ "&";
            } else {
                res += "idhospital=" + this.props.arrayids[index];
            }

        }


        axios.get(url + res).then((response) => {
            this.setState({
                trabajadores:response.data
            })
        })
        


    }

    componentDidMount = () => {
        this.loadTrabajadores();

    }
    componentDidUpdate = (oldProps) => {
        if(oldProps.arrayids !=this.props.arrayids){
            this.loadTrabajadores();
        }
        

    }



    render() {

        return (
            <div>

                <h1>Trabajadores {this.props.arrayids}</h1>


                <table className="table">
                    <thead>
                        <tr>
                            <th>ID Trabajador</th>
                            <th>Apellido</th>
                            <th>Oficio</th>
                            <th>Salario</th>
                            <th>Id Hospital</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.trabajadores.map((trabajador, index)=>{
                            return(
                                <tr key={index}>
                                <td>{trabajador.idTrabajador}</td>
                                <td>{trabajador.apellido}</td>
                                <td>{trabajador.oficio}</td>
                                <td>{trabajador.salario}</td>
                                <td>{trabajador.idHospital}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
