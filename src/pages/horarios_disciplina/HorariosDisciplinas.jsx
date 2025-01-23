import { getEntidadeId, salvarEntidade, fetchEntidades, atualizarEntidade } from "../../service/api";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { GradeHorariosLayout } from "../../components/layout/grade_horarios/GradeHorariosLayout";
import { GradeHorarios } from "../../models/GradeHorarios";

export function HorariosDisciplinas() {

    const navigateTo = useNavigate();
    const location = useLocation();
    const { idDisciplina } = useParams();

    //TODO: Considerar colocar na função onde elas estão sendo chamadas (São usadas apenas lá)
    const horariosManha = useRef();
    const horariosTarde = useRef();
    const horariosNoite = useRef();

    const [marcadosManha, setMarcadosManha] = useState([]);
    const [marcadosTarde, setMarcadosTarde] = useState([]);
    const [marcadosNoite, setMarcadosNoite] = useState([]);

    const [nomeDisciplina, setNomeDisciplina] = useState('');

    const todosHorarios = useRef();

    const [carregando, setCarregando] = useState(true);

    const [manha, setManha] = useState([]);
    const [tarde, setTarde] = useState([]);
    const [noite, setNoite] = useState([]);

    const [quantidadeCargas, setQuantidadeCargas] = useState(0);

    const [professorPossuiHorarios, setProfessorPossuiHorarios] = useState(true);

    const endpointHorarioAulas = 'periodo/curso/';
    const endpointMarcados = `disciplina/${idDisciplina}/horarios`;
    const endpointDisciplinaCarga = `disciplina/`;

    useEffect(() => { }, [quantidadeCargas, nomeDisciplina])

    const salvarDisponibilidade = async () => {
        unificarLista();

        if (professorPossuiHorarios) {
            atualizarDisponibilidades();
        } else {
            salvarDisponibilidades();
        }
    }

    const atualizarDisponibilidades = async () => {
        if (!validarCargas()) {
            return;
        }
        try {
            await atualizarEntidade(endpointMarcados, todosHorarios.current);
            alert(`Horários salvos com sucesso!`);
            navigateTo('/disciplinas/');
        } catch (e) {
            alert('Erro: ' + e.message);
        }
    }

    const salvarDisponibilidades = async () => {
        if (!validarCargas()) {
            return;
        }
        try {
            await salvarEntidade(endpointMarcados, todosHorarios);
            alert(`Horários salvos com sucesso!`);
            navigateTo('/disciplinas/');
        } catch (e) {
            alert('Erro: ' + e.message);
        }
    }

    const fetchHorarios = async () => {
        try {
            const data = await getEntidadeId(endpointHorarioAulas, 1)
            if (data.length > 0) {
                separarHorarios(data);
                setProfessorPossuiHorarios(true);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const validarCargas = () => {
        if (todosHorarios.current.length != quantidadeCargas) {
            console.log(quantidadeCargas);
            alert(`A quantidade de horários (${todosHorarios.current.length}) precisa ser igual à quantidade de cargas horárias da disciplina (${quantidadeCargas})`);
            return false;
        }
        return true;
    }

    const fetchCargaDisciplina = async () => {
        try {
            const data = await getEntidadeId(endpointDisciplinaCarga, idDisciplina);
            setQuantidadeCargas(data['quantidadeCarga'])
        } catch (e) {
            alert(e.message);
        }
    }

    const separarHorarios = (data) => {
        const horarios = GradeHorarios.fromJson(data);
        setManha(GradeHorarios.getHorariosByTurno(horarios, 0));
        setTarde(GradeHorarios.getHorariosByTurno(horarios, 1));
        setNoite(GradeHorarios.getHorariosByTurno(horarios, 2));
    }

    const getNomeDisciplina = () => {
        setNomeDisciplina(location.state.nomeDisciplina || "");
    }

    useEffect(() => {
        getNomeDisciplina();
        fetchCargaDisciplina();
        fetchHorarios();

        const retirarTurno = (lista) => {
            return lista.map((horario) => {
                delete horario.turno;
            });
        }

        const setarHorarios = (horarios) => {
            const manha = [];
            const tarde = [];
            const noite = [];

            for (let horario of horarios) {
                if (horario['turno'] == 0) {
                    manha.push(horario);
                }
                if (horario['turno'] == 1) {
                    tarde.push(horario);
                }
                if (horario['turno'] == 2) {
                    noite.push(horario);
                }
            }

            retirarTurno(manha);
            retirarTurno(tarde);
            retirarTurno(noite);

            setMarcadosManha(manha);
            setMarcadosTarde(tarde);
            setMarcadosNoite(noite);

            setCarregando(false);

        }

        async function horariosByDisciplina() {
            try {
                const data = await fetchEntidades(endpointMarcados);
                if (data.length > 0) {
                    setarHorarios(data);
                } else {
                    setCarregando(false);
                }
            } catch (e) {
                console.error(e);
            }
        }

        horariosByDisciplina();

    }, []);

    useEffect(() => { }, [horariosManha, horariosTarde, horariosNoite]);
    useEffect(() => { }, [marcadosManha, marcadosTarde, marcadosNoite]);
    useEffect(() => { }, [professorPossuiHorarios]);
    useEffect(() => { }, [manha, tarde, noite]);

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
            description={`Clique nos horários da disciplina: ${nomeDisciplina}`}
            isLoading={carregando}

            disciplinaManha={marcadosManha}
            disciplinaTarde={marcadosTarde}
            disciplinaNoite={marcadosNoite}

            isJornadaDisciplina={true}

            
            manha={manha}
            separarManha={separarManha}
            onManhaChanged={(listaGeral) => separarManha(listaGeral)}
            tarde={tarde}
            separarTarde={separarTarde}
            onTardeChanged={(listaGeral => separarTarde(listaGeral))}
            noite={noite}
            separarNoite={separarNoite}
            onNoiteChanged={(listaGeral => separarNoite(listaGeral))}
            onClear={() => { }}
            onConfirm={() => salvarDisponibilidade()}
        />
    )
}