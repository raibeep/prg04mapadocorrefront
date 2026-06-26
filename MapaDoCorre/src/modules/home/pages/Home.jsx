import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../../shared/components/Header/AppHeader";
import testeImg from "../../../assets/images/teste.png";
import '../styles/Home.css'
import BusinessCard from "../components/BusinessCard";

function Home() {

    const negocios = [
        {
            id: 1,
            nome: "Açaí da Praça",
            categoria: "Alimentação",
            endereco: "Irecê - BA",
            imagem: testeImg
        },
        {
            id: 2,
            nome: "Açaí da Praça",
            categoria: "Alimentação",
            endereco: "Irecê - BA",
            imagem: testeImg
        },
        {
            id: 3,
            nome: "Açaí da Praça",
            categoria: "Alimentação",
            endereco: "Irecê - BA",
            imagem: testeImg
        },
        {
            id: 4,
            nome: "Açaí da Praça",
            categoria: "Alimentação",
            endereco: "Irecê - BA",
            imagem: testeImg
        }
    ];

    return (
        <div className="home-page">
            <AppHeader showSearch />

            <main className="home-container">

                {negocios.map((negocio) => (
                    <BusinessCard
                        key={negocio.id}
                        negocio={negocio}
                    />
                ))}

            </main>
        </div>
    );
}

export default Home;