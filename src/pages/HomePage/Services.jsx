import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function Services() {

  const [service, setService] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:5000/home`).then((services) => {
      setService(services.data)
    }).catch(err => console.log(err))
  }, [])

  return (
    <>
      <Ul>
        {service.map(obj =>
          <>
            <li onClick={() => {
              navigate(`/service/${obj.id}`)
            }} key={obj.id}>
              <div>
                <div>
                  <h1>{obj.title}</h1>
                  <h2>{obj.subTitle}</h2>
                </div>
                <div>
                  <h3>{obj.description}</h3>
                </div>
                <div>
                  <h4>R$ {(obj.price / 100).toString().replace(".", ",")}</h4>
                  <h5>{obj.status === "true" ? <p>Disponivel</p> : <p>Indisponivel</p>}</h5>
                </div>
              </div>
              <img src={obj.mainImage} />
            </li>

          </>
        )}
      </Ul>
    </>
  )
}

const Ul = styled.ul`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-around;
  font-family:'Roboto';
  font-size:17px;
  box-sizing:border-box;

  div{
    margin:5px;
    box-sizing:border-box;

  }
  img{
    width:100px;
    height:100px;
    border-radius:15px;
    box-sizing:border-box;
    display:flex;
  }
  li{
    border:solid 2px black;
    box-shadow: 9px 4px 12px -5px rgba(0,0,0,0.55);

    display:flex;
    justify-content:space-between;
    align-items:center;

    width:360px;

    margin:5px;
    :hover{
      border:solid 4px #000;
    }
    h1{
      font-size:20px;
      font-weight:bold;
    }
    h5{
      font-style: italic;
      font-size:15px;
    }
    box-sizing:border-box;
  }
`;