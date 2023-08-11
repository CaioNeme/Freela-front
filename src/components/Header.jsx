import React, { useEffect, useContext } from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";

export default function Header() {

  const { token, setToken } = useContext(UserDataContext);

  return (
    <>
      <Shadow />
      <Head>
        <Link to={"/"}>
          <p>Logo Pika</p>
        </Link>
        {token == null ?
          <div>
            <Link to={"/register"}>
              <p>Cadastre-se</p>
            </Link>
            <Link to={"/login"}>
              <p>Entre</p>
            </Link>
          </div> :
          <div>
            <div>
              <Link to={"/createservice"}>
                <h1>Quer prestar um serviço? Click aqui!</h1>
              </Link>
            </div>
            <span>
              <p onClick={() => {
                setToken(null)
                localStorage.removeItem('token');
              }}>Sair</p>
              <Link to={"/me"}>
                <p>Meu Pefil</p>
              </Link>
            </span>
          </div>
        }

      </Head>
    </>
  )
}

const Shadow = styled.div`
  width: auto;
  height: 85px;
`;

const Head = styled.div`
  z-index:1;
  display:flex;
  justify-content:space-between;
  align-items:center;

  width: 100vw;
  height: 85px;

  padding-left:30px;
  padding-right:30px;
  box-sizing: border-box;

  position:fixed;
  left:0px;
  top:0px;

  background: #000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  div{
    display:flex; 
    align-items:center;
    div{
      width:150px;
    }
    h1{
      color:#FFF;
      font-family:Roboto;    
      font-size:20px;

      margin:11px;

      :hover{
        color:#0FF;
      }
    }
  }


  p{
    color:#FFF;
    font-family:Roboto;    
    font-size:20px;

    margin:11px;

    :hover{
      color:#0FF;
    }
  }
  img{

  }
`