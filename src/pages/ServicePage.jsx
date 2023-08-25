import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components';
import { UserDataContext } from "../context/UserDataContext";
import dayjs from 'dayjs';



export default function ServicePage() {

  const { id } = useParams();
  const { token } = useContext(UserDataContext);
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const [service, setService] = useState({
    id: id,
    title: "",
    subTitle: "",
    description: "",
    price: "",
    address: "",
    rangeId: "",
    mainImage: "",
    categoryId: "",
    serviceProviderId: "",
    status: "",
    user: {
      name: "",
      email: "",
      phone: ""
    }
  })

  useEffect(() => {
    const service = axios.get(`${process.env.VITE_API_URL}/service/${id}`)
    service.then(services => {
      setService(services.data);
    })
  }, [])

  return (
    <>
      <Header />
      <Body>
        <Info>
          <div>
            <h1>{service.title}</h1>
            <p>{service.subTitle}</p>
            <p>{service.description}</p>
          </div>
          <div>
            <h2>Anunciante: {service.user.name}</h2>
            <p>Email: {service.user.email}</p>
            <p>Fone: {service.user.phone}</p>
          </div>
        </Info>
        <Visual>
          <button onClick={() => {
            const startDate = dayjs().format("MM/DD/YYYY")
            const obj = {
              startDate,
            }
            const promise = axios.post(`${process.env.VITE_API_URL}/contract/${id}`, obj, config)
            promise.then(() => {
              alert("Contrato Criado com sucesso você pode ver mais no perfil")
            })
            promise.catch(erro => alert(erro.response.data.message))
          }}>Contrar Agora</button>
          <img src={service.mainImage} />
        </Visual>
      </Body>
    </>
  )
}

const Body = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  display:flex;
  justify-content:space-around;
  height:800px;

  div{
  }

  h1{
    margin-bottom:-15px;
    font-weight:bold;
  }
  h2{
    font-weight:bold;
  }
  img{
    width:auto;
    height:600px
  }
`;
const Info = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:space-between;
  width:50%;

  margin-top:10px;
  div{
    display:inline;
  }
  p{
    margin-top:10px ;
  }

`;
const Visual = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  button{
    appearance:none;
    border-width: none;
    border-style: none;
    border-color: none;
    border-image: none;

    display:flex;
    justify-content:center;
    align-items:center;
    margin:15px;
    background: #000;
    border-radius: 5px;
    color: #FFFFFF;
    height: 45px;
    font-weight: 400;
    font-size: 21px;
    line-height: 26px;
    text-align: center;

    cursor: pointer;
    
    :hover{
      color:#0FF;
    }
  }
`;
