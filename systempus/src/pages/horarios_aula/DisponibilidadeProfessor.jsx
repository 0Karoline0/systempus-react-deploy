import { getEntidadeId, salvarEntidade, fetchEntidades, atualizarEntidade } from "../../service/api";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { GradeHorarios } from '../../models/GradeHorarios';
import { DisponibilidadeHorarios } from "../../models/DisponibilidadeHorarios";
import { GradeHorariosLayout } from '../../components/layout/grade_horarios/GradeHorariosLayout.jsx';
import { getGradeByCurso, getDisponibilidades } from "../../service/disponibilidades_service.js";

export function DisponibilidadeProfessor() {

    const navigateTo = useNavigate();
    const location = useLocation();

    const { idProfessor } = useParams();
    
    const [nomeProfessor, setNomeProfessor] = useState('');

    const horariosManha = useRef();
    const horariosTarde = useRef();
    const horariosNoite = useRef();

    const [marcadosManha, setMarcadosManha] = useState([]);
    const [marcadosTarde, setMarcadosTarde] = useState([]);
    const [marcadosNoite, setMarcadosNoite] = useState([]);

    const todosHorarios = useRef();

    const [carregando, setCarregando] = useState(true);

    const [manha, setManha] = useState([]);
    const [tarde, setTarde] = useState([]);
    const [noite, setNoite] = useState([]);

    const [professorPossuiHorarios, setProfessorPossuiHorarios] = useState(true);

    let endpointDisponibilidades = `professor/${idProfessor}/disponibilidades`;

    useEffect(() => {
        getNomeProfessor();
        getGradeHorarios();
        getDisponibilidadeProfessor();        
    }, []);


    //================ CHAMADAS PRONTAS ================//
    const getGradeHorarios = async () => {
        const data = await getGradeByCurso(1);
        setManha(data.manha);
        setTarde(data.tarde);
        setNoite(data.noite);
        setProfessorPossuiHorarios(true);
    }

    const getDisponibilidadeProfessor = async () => {
        const data = await getDisponibilidades(`professor/${idProfessor}/disponibilidades`);
        setMarcadosManha(data.manha);
        setMarcadosTarde(data.tarde);
        setMarcadosNoite(data.noite);
        setCarregando(false);
    }















    const salvarDisponibilidade = async () => {
        unificarLista();

        if (professorPossuiHorarios) {
            atualizarDisponibilidades();
        } else {
            salvarDisponibilidades();
        }
    }

    const atualizarDisponibilidades = async () => {

        try {
            await atualizarEntidade(endpointDisponibilidades, todosHorarios.current);
            alert(`Disponibilidade salva com sucesso!`);
            navigateTo('/professores/');
        } catch (e) {
            console.error(e);
        }
    }
    
    const salvarDisponibilidades = async () => {
        try {
            await salvarEntidade(endpointDisponibilidades, todosHorarios);
            alert(`Disponibilidade salva com sucesso!`);
            navigateTo('/professores/');
        } catch (e) {
            console.error(e);
        }
    }

    const getNomeProfessor = () => {
        setNomeProfessor(location.state.nomeProfessor || "");
    }

    useEffect(()=>{},[nomeProfessor])
    useEffect(() => {}, [horariosManha, horariosTarde, horariosNoite]);
    useEffect(() => {}, [marcadosManha, marcadosTarde, marcadosNoite]);
    useEffect(() => {},[professorPossuiHorarios]);
    useEffect(() => {}, [manha, tarde, noite]);

    const separarManha = (listaGeral) => {
        horariosManha.current = listaGeral;
    }

    const separarTarde = (listaGeral) => {
        horariosTarde.current = listaGeral;
    }

    const separarNoite = (listaGeral) => {
        horariosNoite.current = listaGeral;
    }

    const unificarLista = () => {
        const lista = [
            ...horariosManha.current || [],
            ...horariosTarde.current || [],
            ...horariosNoite.current || [],
        ];
        
        todosHorarios.current = lista;
    }

    return (
        <GradeHorariosLayout
            title={'Disponibilidades'}
            description={`Clique nos horários de disponibilidade do professor: ${nomeProfessor}`}

            professorManha={marcadosManha}
            professorTarde={marcadosTarde}
            professorNoite={marcadosNoite}

            isJornadaProfessor={true}



            isLoading={carregando}
            manha={manha}
            separarManha={separarManha}
            onManhaChanged={(listaGeral) => separarManha(listaGeral)}
            tarde={tarde}
            separarTarde={separarTarde}
            onTardeChanged={(listaGeral => separarTarde(listaGeral))}
            noite={noite}
            separarNoite={separarNoite}
            onNoiteChanged={(listaGeral => separarNoite(listaGeral))}
            onClear={() => {}}
            onConfirm={() => salvarDisponibilidade()}
        />
    )
}