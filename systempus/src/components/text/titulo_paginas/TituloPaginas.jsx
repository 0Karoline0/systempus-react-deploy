import './TituloPaginas.css';

export function TituloPaginas({titulo, descricao}){
    return (
        <div className="descricao">
            <h2 className="titulo_paginas_h2">{titulo}</h2>
            <span style={{paddingTop: "10px", color: "white"}}>{descricao}</span>
        </div>
    )
}