import React, { useState, useEffect } from 'react';
import NavBar from './componentes/NavBar';
import Paises from './componentes/Paises';
import Cards from './componentes/Cards';
import Graficos from './componentes/Graficos';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const App = () => {
    
    const [pais, setPais] = useState("");
    const [data, setData] = useState({});
 
    useEffect(() => {
        const cargarDatos = async () =>{
            const apiData = await fetchDatos(pais);
            setData(apiData);
        }
        cargarDatos();
    }, [pais])

    console.log(data);

    const paisForm = async (pais) => {
        setPais(pais);
    }

    const fetchDatos = async (pais) => {
        let url = "";

        if(pais === "" || pais === "world"){
            url = "https://covid19.mathdro.id/api";
        }
        else{
            url = `https://covid19.mathdro.id/api/countries/${pais}`;
        }

        try{
            const data = await axios.get(url);
            return data;
        }
        catch(err){
            console.log(err);
        }
    }

    return(
       <div>
           <NavBar />
           <Container fluid>
               <Row>
                   <Col xl={2}>
                       <Paises paisForm={paisForm} />
                   </Col>
                   <Col xl={8}>
                       <Graficos pais={pais} data={data} />
                   </Col>
                   <Col xl={2}>
                       <Cards data={data} />
                   </Col>
               </Row>
           </Container>
       </div>
    );
}

export default App;