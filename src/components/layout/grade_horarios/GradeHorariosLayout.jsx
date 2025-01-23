import { BsCheck2, BsFillTrash3Fill } from "react-icons/bs"
import { BlocoHorarios } from "../../../pages/horarios_aula/bloco_horarios/BlocoHorarios"
import { SimpleButton } from "../../button/simple/SimpleButton"
import { TituloPaginas } from "../../text/titulo_paginas/TituloPaginas"
import PropTypes from 'prop-types';

export function GradeHorariosLayout({
    isLoading,
    title,
    description,
    onConfirm,



    professorManha,
    professorTarde,
    professorNoite,
    disciplinaManha,
    disciplinaTarde,
    disciplinaNoite,
    isJornadaDisciplina,
    isJornadaProfessor,



    onManhaChanged,
    onTardeChanged,
    onNoiteChanged,
    onClear,
    manha,
    tarde,
    noite,
    separarManha,
    separarTarde,
    separarNoite,
    isVisible,
    permiteClicar,
}) {

    GradeHorariosLayout.propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        onConfirm: PropTypes.func,
        separarManha: PropTypes.func,
        separarTarde: PropTypes.func,
        separarNoite: PropTypes.func,
        onManhaChanged: PropTypes.func,
        onTardeChanged: PropTypes.func,
        onNoiteChanged: PropTypes.func,


        professorManha: PropTypes.array.required,
        professorTarde: PropTypes.array.required,
        professorNoite: PropTypes.array.required,

        disciplinaManha: PropTypes.array,
        disciplinaTarde: PropTypes.array,
        disciplinaNoite: PropTypes.array,

        isJornadaDisciplina: PropTypes.bool,
        isJornadaProfessor: PropTypes.bool,



        isLoading: PropTypes.bool.required,
        manha: PropTypes.array.required,
        tarde: PropTypes.array.required,
        noite: PropTypes.array.required,
        isVisible: PropTypes.bool,
        permiteClicar: PropTypes.bool,
    }

    GradeHorariosLayout.defaultProps = {
        isVisible: true,
        permiteClicar: true,
        disciplinaManha: [],
        disciplinaTarde: [],
        disciplinaNoite: [],
        professorManha: [],
        professorTarde: [],
        professorNoite: [],
        isJornadaDisciplina: false,
        isJornadaProfessor: false,
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div className="padding_paginas">
            <TituloPaginas titulo={title} descricao={description} />
            <hr className="horizontal_divider" />
            <div className="espacamento_titulo_pagina"></div>
            <div className="pagina_estrutura_centralizada">
                <div style={{ width: '100%' }} className="container_branco_pagina">
                    {!isLoading && manha.length > 0 &&
                        <BlocoHorarios
                            turno={'Matutino'}
                            horarios={manha}
                            mostrarDia={true}


                            horariosProf={professorManha}
                            horariosDis={disciplinaManha}


                            isJornadaDisciplina={isJornadaDisciplina}
                            isJornadaProfessor={isJornadaProfessor}



                            permiteClicar={permiteClicar}
                            onSubmit={onManhaChanged ? onManhaChanged : undefined}
                            repassarLista={separarManha}
                        />
                    }
                    {!isLoading && tarde.length > 0 &&
                        <BlocoHorarios
                            turno={'Vespertino'}
                            horarios={tarde}
                            mostrarDia={false}

                            horariosProf={professorTarde}
                            horariosDis={disciplinaTarde}


                            isJornadaDisciplina={isJornadaDisciplina}
                            isJornadaProfessor={isJornadaProfessor}




                            permiteClicar={permiteClicar}
                            onSubmit={onTardeChanged ? onTardeChanged : undefined}
                            repassarLista={separarTarde}
                        />

                    }
                    {!isLoading && noite.length > 0 &&
                        <BlocoHorarios
                            turno={'Noturno'}
                            horarios={noite}
                            mostrarDia={false}




                            horariosProf={professorNoite}
                            horariosDis={disciplinaNoite}

                            isJornadaDisciplina={isJornadaDisciplina}
                            isJornadaProfessor={isJornadaProfessor}




                            permiteClicar={permiteClicar}
                            onSubmit={onNoiteChanged ? onNoiteChanged : undefined}
                            repassarLista={separarNoite}
                        />
                    }
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <SimpleButton title={"Limpar"} color={"var(--color-laranja-escuro)"} icon={<BsFillTrash3Fill />} onClick={onClear} />
                        <div className="espacamento_horizontal_botoes"></div>
                        <SimpleButton title={"Confirmar"} color={"var(--color-laranja-escuro)"} icon={<BsCheck2 />} onClick={onConfirm} />
                    </div>
                </div>
            </div>
        </div>
    )
}