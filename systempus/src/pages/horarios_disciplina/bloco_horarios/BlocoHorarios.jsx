import { useEffect, useState, useRef } from "react";
import { DiaHorarios } from "../dia_horarios/DiaHorarios";

export function BlocoHorarios ({turno, horarios, mostrarDia, onSubmit, horariosMarcados, repassarLista}){

    const [horariosProfessor, setHorariosProfessor] = useState(horariosMarcados);

    let diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const [segunda, setSegunda] = useState([]);
    const [terca, setTerca] = useState([]);
    const [quarta, setQuarta] = useState([]);
    const [quinta, setQuinta] = useState([]);
    const [sexta, setSexta] = useState([]);
    const [sabado, setSabado] = useState([]);

    const segundaRef = useRef([]);
    const tercaRef = useRef([]);
    const quartaRef = useRef([]);
    const quintaRef = useRef([]);
    const sextaRef = useRef([]);
    const sabadoRef = useRef([]);

    useEffect(()=>{}, [horariosProfessor])

    const teste = (h) => {
        repassarLista(h);
    };

    const separarDias = (listaHorarios, dia) => {
        addListaDia(listaHorarios, dia);
    }

    useEffect(() => {}, [segunda]);

    const addListaDia = (listaHorarios, dia) => {
        switch (dia.toLowerCase()) {
            case 'segunda':
                segundaRef.current = listaHorarios;
                break;
            case 'terça':
                tercaRef.current = listaHorarios;
                break;
            case 'quarta':
                quartaRef.current = listaHorarios;
                break;
            case 'quinta':
                quintaRef.current = listaHorarios;
                break;
            case 'sexta':
                sextaRef.current = listaHorarios;
                break;
            case 'sábado':
                sabadoRef.current = listaHorarios;
                break;
        }
        passarLista();
    };

    const passarLista = () => {
        const listaGeral = [
            ...segundaRef.current,
            ...tercaRef.current,
            ...quartaRef.current,
            ...quintaRef.current,
            ...sextaRef.current,
            ...sabadoRef.current,
        ];
        onSubmit(listaGeral);
        teste(listaGeral);
    }

    // useEffect(() => {
    //     const listaGeral = [
    //         ...segundaRef.current,
    //         ...tercaRef.current,
    //         ...quartaRef.current,
    //         ...quintaRef.current,
    //         ...sextaRef.current,
    //         ...sabadoRef.current,
    //     ];
    //     console.log('ref: ' + JSON.stringify(listaGeral));
    //     onSubmit(listaGeral);
    //     teste(listaGeral);
    // }, [segundaRef, tercaRef, quartaRef, quintaRef, sextaRef, sabadoRef]);

    const getHorariosMarcados = (index) => {
        let horariosTemp = [];

        for (let h of horariosProfessor){
            if (h.diaSemana == index){
                horariosTemp.push(h);
            }
        }

        return horariosTemp;
    }

    return (
        <div style={{display: 'flex', flexDirection: "column", width: "100%", position: "relative", padding: "10px 15px"}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "10px"}}>
                <h3 style={{color: "var(--color-azul-escuro)", width: "90px"}}>{turno}</h3>
                {diasSemana.map((dia, index) => (
                    <DiaHorarios
                      key={index}
                      mostrarDia={mostrarDia}
                      dia={dia}
                      horarios={horarios}
                      numeroDia={index}
                      horariosMarcados={getHorariosMarcados(diasSemana.indexOf(dia))}
                      onSelectedButton={(horario) => addListaDia(horario, dia)}
                      repassarLista={(h) => separarDias(h, dia)}
                    />
                ))}
            </div>
            <hr className="horizontal_divider" />
        </div>
    )
}