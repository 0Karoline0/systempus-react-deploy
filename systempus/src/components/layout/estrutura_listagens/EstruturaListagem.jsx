import Lottie from "lottie-react"
import { TituloPaginas } from "../../text/titulo_paginas/TituloPaginas"
import { SearchRegister } from "../search_register/SearchRegister"
import bookLoader from '../../../assets/animations/BookLoader.json';
import './EstruturaListagem.css';

export function EstruturaListagem({tituloPagina, descricaoPagina, isCarregando, clickCadastro, lista, isCadastroBtn, componente}){
    return (
        <div className="padding_paginas">
            {/* <TituloPaginas titulo={tituloPagina} descricao={descricaoPagina} /> */}
            {/* <hr className="horizontal_divider" /> */}
            <SearchRegister
                buttonTitle={"Cadastrar"}
                onClickCadastro={clickCadastro}
                componente={componente}
                isCadastroBtn={isCadastroBtn}
            />
            <div hidden={isCarregando ? false : true} style={{display: isCarregando ? "flex" : "none",  flexDirection: "row", textAlign: "center", justifyContent: "center",}}>
                <Lottie
                    style={{
                        width: 450,
                        height: 450,
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    animationData={bookLoader} loop={true} />
            </div>
            <div hidden={isCarregando ? true : false}>
                {lista}
            </div>
        </div>
    )
}