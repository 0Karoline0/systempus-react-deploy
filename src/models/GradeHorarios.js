export class GradeHorarios {

    constructor(id, turno, horariosAulaDTO){
        this.id = id;
        this.turno = turno;
        this.horariosAulaDTO = horariosAulaDTO;
    }

    static fromJson(json){
        let list = [];
        for (let horario of json){
            list.push(new GradeHorarios(horario.id, horario.turno, horario.horariosAulaDTO));
        }
        return list;
    }

    static getHorariosByTurno(data, turno){
        return this.getHorarios(data, turno);
    }

    static getHorarios(data, turno){
        for (let periodo of data) {
            if (periodo.turno === turno){
                return this.tratarHorarios(periodo.horariosAulaDTO);
            }
        }
        return [];
    }

    static tratarHorarios(data){
        let lista = [];
        for (let horario of data) {
            horario.inicioAula = horario.inicioAula.slice(0, -3);
            horario.fimAula = horario.fimAula.slice(0, -3);
            lista.push(horario);
        }
        return lista;
    }
}