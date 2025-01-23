import { EmployeeContainer } from "../../container/employee_container/EmployeeContainer"
import { SearchRegister } from "../search_register/SearchRegister"
import { TituloPaginas } from "../../text/titulo_paginas/TituloPaginas"
import Lottie from 'lottie-react';
import bookLoader from '../../../assets/animations/BookLoader.json';

import './EstruturaEmployee.css';

export function EstruturaEmployees({ tituloPagina, descricaoPagina, colaboradores, isCarregando, clickCadastro, clickEdit, clickDelete, isHorarios, onClickHorarios }) {

    return (
        <div className="padding_paginas">
            {/* <TituloPaginas titulo={tituloPagina} descricao={descricaoPagina} /> */}
            {/* <hr className="horizontal_divider" /> */}
            <SearchRegister buttonTitle={"Cadastrar"} onClickCadastro={clickCadastro} />
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
            <div className="employee_list_structure">
                {colaboradores.map(c =>
                    <EmployeeContainer
                        key={c.id}
                        nome={c.nome}
                        status={c.status}
                        email={c.email}
                        img={c.foto}
                        telefone={c.telefone}
                        dataAdmissao={c.dataAdmissao}
                        curso={c.curso}
                        onDelete={() => clickDelete(c.id)}
                        onClickEdit={() => clickEdit(c.id)}
                        isHorarios={isHorarios}
                        onClickHorarios={() => onClickHorarios(c.id, c.nome)}
                    />
                )}
            </div>
        </div>
    )
}