import { useEffect, useState } from "react";
import { BotaoHorarios } from "../../../components/button/horarios/BotaoHorarios"
import { objectExists } from '../../../utils/helper';

export function DiaHorarios({dia, horarios, mostrarDia, onSelectedButton, isJornadaDisciplina, isJornadaProfessor, horariosProf, horariosDis, numeroDia, repassarLista, permiteClicar}){

    const [horariosProfessor, setHorariosProfessor] = useState(horariosProf);
    const [horariosDisciplina, setHorariosDisciplina] = useState(horariosDis);
    const [listaHorarioAula, setListaHorarioAula] = useState([]);

    const [lista, setLista] = useState([]);
    
    useEffect(() => {}, [lista, horariosProfessor, horariosDisciplina]);

    useEffect(() => {
        setarHorariosExistentes();
    }, []);

    useEffect(() => {
        if (typeof repassarLista === 'function'){
            repassarLista(horariosProfessor);
        }
    }, []);

    const setarHorariosExistentes = () => {
        let listaTemp = [];

        for (let horario of horarios){
            for (let horarioMarcado of horariosProf){
                if (horarioMarcado.horarioAulaId == horario.id){
                    listaTemp.push(horario);
                }
            }
        }

        setListaHorarioAula(listaTemp);
    };

    const onSelected = (horario) => {

        let lista = [];

        if (isJornadaProfessor){
            lista = horariosProfessor;
        } else {
            lista = horariosDisciplina;
        }

        let horarioPost = convertToPost(horario);
        
        if (objectExists(lista, horarioPost)){
            var index = lista.findIndex(horarioProf => horarioProf.horarioAulaId === horarioPost.horarioAulaId);
            lista.splice(index, 1);
        } else {
            lista.push(horarioPost);
        }

        setLista([...lista]);
        onSelectedButton(lista);
    }

    const convertToPost = (horario) => {
        return {
            'diaSemana': numeroDia,
            'horarioAulaId': horario['id']
        }
    }

    const isMarcado = (horarioTabela, lista) => {
        if (lista.length > 0){

            const horario = lista.find(item => item.horarioAulaId === horarioTabela.id && item.diaSemana == numeroDia);

            if (horario != null){
                if (horarioTabela['id'] == horario['horarioAulaId']){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    const isHorarioCompativel = (horarioGrade) => {

        const horarioProfessorReferenteGrade = horariosProfessor.find(item => item.horarioAulaId === horarioGrade.id && item.diaSemana == numeroDia);
        const horarioDisciplinaReferenteGrade = horariosDisciplina.find(item => item.horarioAulaId === horarioGrade.id && item.diaSemana == numeroDia);

        return horarioProfessorReferenteGrade != null && horarioDisciplinaReferenteGrade != null;

    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "0px 5px"}}>
            {mostrarDia && (
                <div>
                    <h4 style={{color: "var(--color-azul-escuro)", fontWeight: "bold"}}>{dia}</h4>
                    <div style={{paddingBottom: '15px'}}></div>
                </div>
            )}
            {horarios.map((horario, index) => (
                <BotaoHorarios
                    key={index}
                    permiteClicar={permiteClicar}
                    hour={`${horario['inicioAula']} - ${horario['fimAula']}`}
                    data={horario['id']}
                    horario={horario}

                    isMarcadoParaProf={isMarcado(horario, horariosProfessor)}
                    isMarcadoParaDis={isMarcado(horario, horariosDisciplina)}

                    onSelect={(horario) => onSelected(horario)}

                    isJornadaDisciplina={isJornadaDisciplina}
                    isJornadaProfessor={isJornadaProfessor}


                    
                    
                    isCompativel={isHorarioCompativel(horario)}
                />
            ))}
        </div>
    )
}