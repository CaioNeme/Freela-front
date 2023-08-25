import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useState, useContext } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { UserDataContext } from "../context/UserDataContext";


export default function Login() {

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const { setToken, token } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const newLogin = { ...login };
    newLogin[event.target.name] = event.target.value;
    setLogin(newLogin);
  }

  useEffect(() => {
    if (token !== null) {
      navigate("/")
    }
  }, [])

  return (
    <Size>
      <Header />
      <Form onSubmit={event => {
        event.preventDefault();
        const URLPostLogin = `${import.meta.env.VITE_API_URL}/signin`;
        let post = login;
        const promise = axios.post(URLPostLogin, post);
        setLoading(true)

        promise.then(resposta => {
          setToken(resposta.data.token);
          localStorage.setItem("token", resposta.data.token);
          setLoading(false)
          navigate("/");
        });

        promise.catch(erro => {
          setLoading(false);
          alert(erro.response.data.message);
        })


      }}>
        {loading === true ? <input disabled required onChange={handleChange} value={login.email} name="email" placeholder="E-mail" type="email" /> : <input required onChange={handleChange} value={login.email} name="email" placeholder="E-mail" type="email" />}
        {loading === true ? <input disabled required onChange={handleChange} value={login.password} name="password" placeholder="Senha" type="password" /> : <input required onChange={handleChange} value={login.password} name="password" placeholder="Senha" type="password" />}

        {loading === false ? <button>Entrar</button> : <button disabled><ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#FFF"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        /></button>}

      </Form>
      <Link to={"/register"}>
        <SignUp><p>Não tem uma conta? Cadastre-se!</p></SignUp>
      </Link>
    </Size>
  );
}

const Size = styled.div`
  width:auto;
  background-color:#FFF;
`;
const Form = styled.form`  
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  margin-top:33px;

  input{
    cursor: pointer;

    box-sizing:border-box;

    width: 100vh;
    height: 45px;

    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;

    margin:15px;

    color: #000;
  }
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

    width: 100vh;
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
`;
const SignUp = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;

  margin-top:25px;

  cursor: pointer;

  p{
    width: 100vh;
    height: 17px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;

    color: #000;
  }
`