import { fetchEntidades } from "./api";

export const getProfessores = async () => {
    try {
        return await fetchEntidades('professor/')
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const getProfessoresByCurso = async (id) => {
    try {
        return await fetchEntidades(`curso/professores/${id}`)
    } catch (e) {
        console.error(e);
        return [];
    }
}