import { DisponibilidadeHorarios } from "../models/DisponibilidadeHorarios";
import { GradeHorarios } from "../models/GradeHorarios";
import { fetchEntidades, getEntidadeId } from "./api";

export const getGradeByCurso = async (id) => {
    try {
        const data = await getEntidadeId('periodo/curso/', id)
        if (data.length > 0) {
            const horarios = GradeHorarios.fromJson(data);
            return {
                manha: GradeHorarios.getHorariosByTurno(horarios, 0),
                tarde: GradeHorarios.getHorariosByTurno(horarios, 1),
                noite: GradeHorarios.getHorariosByTurno(horarios, 2),
            }
        } else {
            return {
                "manha": [],
                "tarde": [],
                "noite": [],
            }
        }
    } catch (e) {
        console.error(e);
        return {
            "manha": [],
            "tarde": [],
            "noite": [],
        }
    }
}

export const getDisponibilidades = async (url) => {
    try {
        const data = await fetchEntidades(url);
        if (data.length > 0) {
            const disponibilidades = DisponibilidadeHorarios.fromJson(data);
            return {
                "manha": DisponibilidadeHorarios.getHorariosMarcadosByTurno(disponibilidades, 0),
                "tarde": DisponibilidadeHorarios.getHorariosMarcadosByTurno(disponibilidades, 1),
                "noite": DisponibilidadeHorarios.getHorariosMarcadosByTurno(disponibilidades, 2),
            }
        } else {
            return {
                "manha": [],
                "tarde": [],
                "noite": [],
            }
        }
    } catch (e) {
        console.error(e);
        return {
            "manha": [],
            "tarde": [],
            "noite": [],
        }
    }
}