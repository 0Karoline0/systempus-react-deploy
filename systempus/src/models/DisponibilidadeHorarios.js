export class DisponibilidadeHorarios {

    constructor(diaSemana, horarioAulaId, turno){
        this.diaSemana = diaSemana;
        this.horarioAulaId = horarioAulaId;
        this.turno = turno;
    }

    static fromJson(json){
        let lista = [];
        for (let horario of json){
            lista.push(new DisponibilidadeHorarios(horario.diaSemana, horario.horarioAulaId, horario.turno));
        }
        return lista;
    }

    static getHorariosMarcadosByTurno(data, turno){
        let lista = this.separacaoByTurno(data, turno);
        this.retirarTurno(lista);
        return lista;
    }

    static separacaoByTurno(data, turno){
        let lista = [];
        for (let horario of data){
            if (horario.turno == turno){
                lista.push(horario);
            }
        }
        return lista;
    }

    static retirarTurno(data){
        return data.map((horario) => {
            delete horario.turno;
        });
    }



}