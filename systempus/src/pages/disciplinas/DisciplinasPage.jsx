import { useState, useEffect } from "react";
import { EstruturaListagem } from "../../components/layout/estrutura_listagens/EstruturaListagem";
import { fetchEntidades, deletarEntidade } from "../../service/api";
import { useNavigate } from 'react-router-dom';
import { TabelaListagemDisciplinas } from "../../components/tables/disciplina/TabelaListagemDisciplinas";
import { Dropdown } from 'primereact/dropdown';

export function DisciplinasPage() {
    const endpointDisciplina = 'disciplina/';
    const endpointCurso = 'curso/';
    const endpointModulo = 'modulo/';
    const navigateTo = useNavigate();
    const [disciplinas, setDisciplinas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [isCarregando, setIsCarregando] = useState(false);
    const [isBtnCadastro, setIsBtnCadastro] = useState(false);
    const [carregandoCursos, setCarregandoCursos] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState(null);
    const [modulos, setModulos] = useState([]);
    const [moduloSelecionado, setModuloSelecionado] = useState(null);
    const [carregandoModulos, setCarregandoModulos] = useState(false);

    const cadastro = (path) => {
        navigateTo(path);
    }

    const horariosDisciplina = (idDisciplina, nomeDisciplina) => {
        navigateTo(`/disciplinas/horarios/${idDisciplina}`, {state: { nomeDisciplina }})
    }

    const getCursos = async () => {
        setCarregandoCursos(true);
        try {
            const data = await fetchEntidades(endpointCurso);
            const cursosFormatados = data.map(curso => ({ nome: curso.nome, value: curso }));
            setCursos(cursosFormatados);
        } catch (e) {
            console.log(e)
        }
        setCarregandoCursos(false);
    }

    const deletar = async (id) => {
        try {
            await deletarEntidade(endpointDisciplina, id);
            alert('Disciplina deletada com sucesso!')
            if (cursoSelecionado) {
                getDisciplinasIdCurso(cursoSelecionado);
            } else {
                getDisciplinasGeral();
            }
        } catch (e) {
            alert(e.message);
        }
    }

    const getDisciplinasGeral = async () => {
        setIsCarregando(true);
        try {
            const data = await fetchEntidades(endpointDisciplina);
            setDisciplinas(data);
            setIsCarregando(false);
        } catch (e) {
            setIsCarregando(false);
            console.error(e);
        }
    }

    const getDisciplinasIdCurso = async (curso) => {
        setIsCarregando(true);
        try {
            const data = await fetchEntidades(endpointDisciplina + 'curso/' + curso.id);
            setDisciplinas(data);
            setIsCarregando(false);
        } catch (e) {
            setIsCarregando(false);
            console.error(e);
        }
    }

    const getDisciplinasIdModulo = async (modulo) => {
        setIsCarregando(true);
        try {
            const data = await fetchEntidades(endpointModulo + modulo.id);
            setDisciplinas(data.disciplinas);
            setIsCarregando(false);
        } catch (e) {
            setIsCarregando(false);
            console.error(e);
        }
    }

    const onSelectCurso = (curso) => {
        setCursoSelecionado(curso);
        setModuloSelecionado(null);
        if (curso.modulos.length > 0) {
            const modulosFormatados = curso.modulos.map(modulo => ({ nome: modulo.nome, value: modulo }));
            setModulos(modulosFormatados);
        }
        getDisciplinasIdCurso(curso);
    }

    const onSelectModulo = (modulo) => {
        setModuloSelecionado(modulo);
        getDisciplinasIdModulo(modulo);
        setIsBtnCadastro(true);
    }

    useEffect(() => {
        getDisciplinasGeral();
        getCursos();
    }, []);

    return (
        <div>
            <EstruturaListagem
                tituloPagina={'Disciplinas'}
                isCarregando={isCarregando}
                descricaoPagina={'Aqui estão listados todas as disciplinas da faculdade'}
                lista={
                    <TabelaListagemDisciplinas
                        lista={disciplinas}
                        onDeleteClick={(id) => deletar(id)}
                        onEditClick={(id) => cadastro(`/disciplinas/formulario/editar/${id}`)}
                        onHorarios={(idDisciplina, nomeDisciplina) => horariosDisciplina(idDisciplina, nomeDisciplina)}
                    />
                }
                clickCadastro={() => cadastro(`/disciplinas/formulario/cadastrar/${moduloSelecionado ? moduloSelecionado.id : ''}`)}
                componente={
                    <div style={{ display: 'flex', flexDirection: 'row', columnGap: '20px', paddingRight: '10px', paddingLeft: '10px' }}>
                        <Dropdown
                            value={cursoSelecionado}
                            onChange={(e) => onSelectCurso(e.value)}
                            options={cursos}
                            loading={carregandoCursos}
                            emptyMessage={"Não há cursos cadastrados"}
                            optionLabel="nome"
                            placeholder={carregandoCursos ? "Carregando" : cursoSelecionado ? cursoSelecionado.nome : "Cursos"}
                            style={{ width: '300px' }}
                        />
                        {cursoSelecionado &&
                            <Dropdown
                                value={moduloSelecionado}
                                onChange={(e) => onSelectModulo(e.value)}
                                options={modulos}
                                emptyMessage={"Não há módulos cadastrados"}
                                loading={carregandoModulos}
                                optionLabel="nome"
                                placeholder={carregandoModulos ? "Carregando" : "Módulos"}
                                style={{ width: '200px' }}
                            />
                        }
                    </div>
                }
                isCadastroBtn={!!moduloSelecionado}
            />
        </div>
    );
}
