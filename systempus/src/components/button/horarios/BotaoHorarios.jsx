import { useEffect, useState } from 'react';
import './BotaoHorarios.css';

export function BotaoHorarios({ hour, onSelect, horario, isJornadaProfessor, isJornadaDisciplina, isMarcadoParaProf, isMarcadoParaDis, isCompativel, isProfessor, permiteClicar }) {

    let [isProfSelected, setIsProfSelected] = useState(isMarcadoParaProf);
    let [isDisSelected, setIsDisSelected] = useState(isMarcadoParaDis);

    useEffect(() => {
        setIsProfSelected(isMarcadoParaProf);
        setIsDisSelected(isMarcadoParaDis);
    }, [isMarcadoParaProf, isMarcadoParaDis]);

    const selected = () => {
        setIsProfSelected(!isProfSelected);
        setIsDisSelected(!isDisSelected);
        onSelect(horario);
    }

    const getJornadaProfessorColor = () => {
        if (isMarcadoParaProf){
            return 'botao_horario professor';
        }
        return 'botao_horario';
    }
    
    const getJornadaDisciplinaColor = () => {
        if (isMarcadoParaDis){
            return 'botao_horario disciplina';
        }
        return 'botao_horario';
    }

    const getJornadaHorarioDocenteColor = () => {
        if (isCompativel) {
            return 'botao_horario compativel';
        } else {
            if (isMarcadoParaProf) {
                return 'botao_horario professor';
            } else if (isMarcadoParaDis) {
                return 'botao_horario disciplina';
            }
            return 'botao_horario';
        }
    }

    const getButtonColor = () => {
        if (isJornadaProfessor){
            return getJornadaProfessorColor();
        } else if (isJornadaDisciplina){
            return getJornadaDisciplinaColor();
        } else {
            return getJornadaHorarioDocenteColor();
        }
    }

    return (
        <button disabled={!permiteClicar} className={getButtonColor()} onClick={selected}>
            <span>{hour}</span>
        </button>
    )
}