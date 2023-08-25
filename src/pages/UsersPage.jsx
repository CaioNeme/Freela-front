import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { UserDataContext } from "../context/UserDataContext";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


export default function Users() {

  const { token } = useContext(UserDataContext)
  const [services, setServices] = useState([])
  const [contracts, setContracts] = useState([])
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate();

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/")
    }

    const services = axios.get("${process.env.VITE_API_URL}/users", config)
    services.then(services => {
      setServices(services.data.services);
    })
    const contracts = axios.get("${process.env.VITE_API_URL}/contract", config)
    contracts.then(contract => {
      setContracts(contract.data.contracts);
    })
  }, [refresh])


  return (
    <>
      <Header />
      <Head>
        <div>
          <p>Meus Contratos</p>
        </div>
        <div>
          <p>Meus Serviços</p>
        </div>
      </Head>
      <Body>
        <div>
          {contracts.map(contract =>
            <li key={contract.id}>
              <div>
                <h2>Começou: {dayjs(contract.startDate).format("DD/MM/YYYY")}</h2>
                {contract.endDate === null ?
                  <h2>Termino: O contrato não foi finalizado </h2>
                  :
                  <h2>Termino : {dayjs(contract.endDate).format("DD/MM/YYYY")}</h2>}

              </div>
              <div>
                <h1>{(contract.serviceName)}</h1>
                <h5>{contract.status}</h5>
              </div>
              <div>
                <button onClick={() => {
                  const obj = {
                    status: "Feito",
                  }
                  const promisse = axios.put(`${process.env.VITE_API_URL}/contract/${contract.id}`, obj, config)
                  promisse.then(() => {
                    setRefresh(refresh + 1)
                  })
                  promisse.catch(erro => {
                    alert(erro.response.data.message);
                  })
                }}>Finalizar</button>
                <button onClick={() => {
                  const obj = {
                    status: "Cancelado"
                  }
                  const promisse = axios.put(`${process.env.VITE_API_URL}/contract/${contract.id}`, obj, config)
                  promisse.then(() => {
                    setRefresh(refresh + 1)
                  })
                  promisse.catch(erro => {
                    alert(erro.response.data.message);
                  })
                }}>Cancelar</button>
              </div>
            </li>
          )}
        </div>
        <div>
          {services.map(service =>
            <li key={service.id}>
              <div>
                <h1>{service.title}</h1>
                <h2>{service.subTitle}</h2>
              </div>
              <div>
                <h4>R$ {(service.price / 100).toString().replace(".", ",")}</h4>
                <h5>{service.status === "true" ? <p>Disponivel</p> : <p>Indisponivel</p>}</h5>
              </div>
              <div>
                {service.status === "true" ?
                  <button onClick={() => {
                    const obj = {
                      status: false
                    }
                    const promisse = axios.put(`${process.env.VITE_API_URL}/service/${service.id}`, obj, config)
                    promisse.then(() => {
                      setRefresh(refresh + 1)
                    })
                    promisse.catch(erro => {
                      alert(erro.response.data.message);
                    })
                  }}>Desativar</button>
                  :
                  <button onClick={() => {
                    const obj = {
                      status: true
                    }
                    const promisse = axios.put(`${process.env.VITE_API_URL}/service/${service.id}`, obj, config)
                    promisse.then(() => {
                      setRefresh(refresh + 1)
                    })
                    promisse.catch(erro => {
                      alert(erro.response.data.message);
                    })
                  }}>Ativar</button>
                }
              </div>
            </li>
          )}
        </div>
      </Body>
    </>
  )
}

const Head = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  display:flex;
  justify-content: space-around;
  align-items: center;
  div{
    margin-top:10px;
    width:35%;
    border:solid 2px #000;
    text-align:center;
  }
`;
const Body = styled.ul`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  display:flex;
  justify-content: space-evenly;
  align-items: flex-start;
  li{
    display:flex;
    justify-content:space-around;
    align-items:center;

    border:solid 2px black;
    box-shadow: 9px 4px 12px -5px rgba(0,0,0,0.55);

    margin:5px;

    button{
      appearance:none;
      border-width: none;
      border-style: none;
      border-color: none;
      border-image: none;
      display:flex;
      justify-content:center;
      align-items:center;

      :hover{
        color:#0FF;
      }

      cursor: pointer;

      width: 90px;
      height: 45px;

      margin:15px;

      background: #000;
      border-radius: 5px;

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 20.976px;
      line-height: 26px;
      text-align: center;

      color: #FFFFFF;

    }
  }
  div{
    width:50%;
    div{
      width:200px;
      margin:10px;
    }
  }
`;