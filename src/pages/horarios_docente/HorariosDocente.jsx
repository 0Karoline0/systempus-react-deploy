import './HorariosDocente.css';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EstruturaListagensSidebar } from "../../components/layout/estrutura_listagens_sidebar/EstruturaListagensSidebar";
import { GradeHorariosLayout } from '../../components/layout/grade_horarios/GradeHorariosLayout.jsx';
import { getEntidadeId } from "../../service/api.js";
import { useEffect, useState, useRef } from "react";
import { getDisciplinasByCurso, getHorariosGrade } from "../../service/disciplina_service.js";
import { getDisponibilidades, getGradeByCurso } from "../../service/disponibilidades_service.js";
import { getProfessoresByCurso } from "../../service/professores_service.js";


export function HorariosDocente() {

    const [disciplinaMarcadasManha, setDisciplinaMarcadasManha] = useState([]);
    const [disciplinaMarcadasTarde, setDisciplinaMarcadasTarde] = useState([]);
    const [disciplinaMarcadasNoite, setDisciplinaMarcadasNoite] = useState([]);

    const [horariosProfessorManha, setHorariosProfessorManha] = useState([]);
    const [horariosProfessorTarde, setHorariosProfessorTarde] = useState([]);
    const [horariosProfessorNoite, setHorariosProfessorNoite] = useState([]);

    const [professores, setProfessores] = useState([]);

    const [isGradeVisivel, setIsGradeVisivel] = useState(false);

    const todosHorarios = useRef();

    const [carregando, setCarregando] = useState(true);

    const [professoresVisible, setProfessoresVisible] = useState(false);
    
    const [manha, setManha] = useState([]);
    const [tarde, setTarde] = useState([]);
    const [noite, setNoite] = useState([]);

    const [disciplinas, setDisciplinas] = useState([]);

    /*============== INICIALIZAÇÃO DA TELA =============== */
    useEffect(() => {
        getDisciplinas();
        getGrade();
    }, []);

    /*================ FUNÇÕES PRONTAS ================== */
    const getDisciplinas = async () => {
        const data = await getDisciplinasByCurso(1);
        console.log(data);
        setDisciplinas(data)
    }

    const getHorariosByDisciplinas = async (id) => {
        setCarregando(true);
        const data = await getDisponibilidades(`disciplina/${id}/horarios`);
        setDisciplinaMarcadasManha(data.manha);
        setDisciplinaMarcadasTarde(data.tarde);
        setDisciplinaMarcadasNoite(data.noite);
        setCarregando(false);
        setIsGradeVisivel(true);
    }
    
    const getGrade = async () => {
        const data = await getGradeByCurso(1);
        setManha(data.manha);
        setTarde(data.tarde);
        setNoite(data.noite);
    }

    const getProfessores = async () => {
        setProfessoresVisible(false);
        const data = await getProfessoresByCurso(1);
        setProfessores(data);
        setProfessoresVisible(true);

    }

    const getDisponibilidadeProfessor = async (id) => {
        setCarregando(true);
        const data = await getDisponibilidades(`professor/${id}/disponibilidades`);
        setHorariosProfessorManha(data.manha);
        setHorariosProfessorTarde(data.tarde);
        setHorariosProfessorNoite(data.noite);
        setCarregando(false);
    }
    
    /*============== FUNÇÕES PARA COMPONENTE =============== */
    const onTapDisciplina = (id) => {
        getHorariosByDisciplinas(id);
        getProfessores();
    }



    function tabela() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 50 }} aria-label="simple table">
                    <TableBody>
                        {disciplinas.map((row) => (
                            <TableRow key={row.id} >
                                <TableCell onClick={() => onTapDisciplina(row.id)} align='center'>{row.nome}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    function tabelaProfessores() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 50 }} aria-label="simple table">
                    <TableBody>
                        {professores.map((row) => (
                            <TableRow key={row.id} >
                                <TableCell onClick={() => getDisponibilidadeProfessor(row.id)} align='center'>{row.nome}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    useEffect(() => {}, [disciplinaMarcadasManha, disciplinaMarcadasTarde, disciplinaMarcadasNoite]);
    useEffect(() => {}, [manha, tarde, noite]);
    useEffect(() => {}, [disciplinas]);

    return (
        <div className="estrutura_horario_docente">
            <EstruturaListagensSidebar
                title={'Disciplinas'}
                content={tabela()}
                isStart={true}
                isVisible={true}
            />
            <GradeHorariosLayout
                isVisible={isGradeVisivel}
                title={'Disponibilidades'}
                isLoading={carregando}
                permiteClicar={false}
                manha={manha}
                tarde={tarde}
                noite={noite}

                disciplinaManha={disciplinaMarcadasManha}
                disciplinaTarde={disciplinaMarcadasTarde}
                disciplinaNoite={disciplinaMarcadasNoite}

                professorManha={horariosProfessorManha}
                professorTarde={horariosProfessorTarde}
                professorNoite={horariosProfessorNoite}


                
                onClear={() => {}}
                onConfirm={() => salvarDisponibilidade()}
            />
            <EstruturaListagensSidebar
                title={'Professores'}
                content={tabelaProfessores()}
                isStart={false}
                isVisible={professoresVisible}
            />
        </div>
    )
}