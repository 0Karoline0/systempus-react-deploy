import { getEntidadeId, salvarEntidade, fetchEntidades, atualizarEntidade } from "../service/api.js";
import { GradeHorarios } from '../models/GradeHorarios';

export const getDisciplinasByCurso = async (id) => {
    try {
        const data = await getEntidadeId(`disciplina/curso/`, id);
        return data;
    } catch (e) {
        console.error(e);
        return [];
    }
}


export const getHorariosGrade = async (id) => {
    try {
        const data = await getEntidadeId('periodo/curso/', 1);
        if (data.length > 0) {
            const horarios = GradeHorarios.fromJson(data);
            return {
                manha: GradeHorarios.getHorariosByTurno(horarios, 0),
                tarde: GradeHorarios.getHorariosByTurno(horarios, 1),
                noite: GradeHorarios.getHorariosByTurno(horarios, 2),
            }
        }
        return {manha: [], tarde: [], noite: []};
    } catch (e) {
        console.error(e);
        return {manha: [], tarde: [], noite: []};
    }
}