import { useEffect, useState } from "react";
import { BotaoHorarios } from "../../../components/button/horarios/BotaoHorarios"
import { objectExists } from '../../../utils/helper';

export function DiaHorarios({dia, horarios, mostrarDia, onSelectedButton, horariosMarcados, numeroDia, repassarLista}){

    const [horariosProfessor, setHorariosProfessor] = useState(horariosMarcados);
    const [listaHorarioAula, setListaHorarioAula] = useState([]);
    
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
            for (let horarioMarcado of horariosMarcados){
                if (horarioMarcado.horarioAulaId == horario.id){
                    listaTemp.push(horario);
                }
            }
        }

        setListaHorarioAula(listaTemp);
    };

    const onSelected = (horario) => {

        let horarioPost = convertToPost(horario);
        
        if (objectExists(horariosProfessor, horarioPost)){
            var index = horariosProfessor.findIndex(horarioProf => horarioProf.horarioAulaId === horarioPost.horarioAulaId);
            horariosProfessor.splice(index, 1);
        } else {
            horariosProfessor.push(horarioPost);
        }

        setHorariosProfessor([...horariosProfessor]);
        onSelectedButton(horariosProfessor);
    }

    const convertToPost = (horario) => {
        return {
            'diaSemana': numeroDia,
            'horarioAulaId': horario['id']
        }
    }

    const isMarcado = (horarioTabela) => {
        if (horariosProfessor.length > 0){

            const horario = horariosProfessor.find(item => item.horarioAulaId === horarioTabela.id && item.diaSemana == numeroDia);

            if (horario != null){
                if (horarioTabela['id'] == horario['horarioAulaId']){
                    return true;
                } else {
                    return false;
                }
            }
        }
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
                    hour={`${horario['inicioAula']} - ${horario['fimAula']}`}
                    data={horario['id']}
                    horario={horario}
                    isMarcado={isMarcado(horario)}
                    onSelect={(horario) => onSelected(horario)}
                />
            ))}
        </div>
    )

}