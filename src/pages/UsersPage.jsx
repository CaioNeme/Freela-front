import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { UserDataContext } from "../context/UserDataContext";
import styled from "styled-components";
import axios from "axios";


export default function Users() {

  const { token } = useContext(UserDataContext)
  const [services, setServices] = useState([])
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  useEffect(() => {
    const services = axios.get("http://localhost:5000/users", config)
    services.then(services => {
      setServices(services.data.services);
    })
  }, [])

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
          <p>teste</p>
        </div>
        <div>
          {services.map(service =>
            <li>
              <div>
                <h1>{service.title}</h1>
                <h2>{service.subTitle}</h2>
              </div>
              <div>
                <h4>R$ {(service.price / 100).toString().replace(".", ",")}</h4>
                <h5>{service.status === "true" ? <p>Disponivel</p> : <p>Indisponivel</p>}</h5>
              </div>
              <div>
                <button>Editar</button>
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
  justify-content: space-evenly;
  align-items: center;
  div{
    width:50%;
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

      width: 75px;
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
      width:auto;
    }
  }
`;