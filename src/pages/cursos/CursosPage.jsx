import { useState, useEffect } from "react";
import { EstruturaListagem } from "../../components/layout/estrutura_listagens/EstruturaListagem"
import { fetchEntidades, deletarEntidade } from "../../service/api";
import { useNavigate } from 'react-router-dom';
import { TabelaListagemCursos } from "../../components/tables/curso/TabelaListagemCursos";
import { Dialog } from 'primereact/dialog';
import { TabelaListagemModulo } from "../../components/tables/modulo/TabelaListagemModulo";
import { TabelaListagemPeriodo } from "../../components/tables/periodo/TabelaListagemPeriodo";

export function CursosPage(){

    const endpointCurso = 'curso/';
    const endpointGetPeriodos = 'periodo/curso/';
    const endpointPeriodos = 'periodo/';
    const navigateTo = useNavigate();
    const [cursos, setCursos] = useState([]);
    const [isCarregando, setIsCarregando] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [nomeCurso, setNomeCurso] = useState("");
    const [curso, setCurso] = useState();
    const [isModuloDialog, setIsModuloDialog] = useState(false);
    const [isPeriodoDialog, setIsPeriodoDialog] = useState(false);
    const [isCadastrar, setIsCadastrar] = useState(false);
    const [placeholderDropdown, setPlaceholderDropdown] = useState('');

    const cadastro = (path) => {
        navigateTo(path);
    }

    const setCursoSelecionado = (e) => {
        setCurso(e);
    }

    const deletar = async (id) => {
        try {
            await deletarEntidade(endpointCurso, id);
            alert('Curso deletado com sucesso!')
            fetchData();
        }catch (e){
            alert(e.message);
        }
    }

    const deletarPeriodo = async (id) => {
        try {
            await deletarEntidade(endpointPeriodos, id);
            alert('Período deletado com sucesso!')
            fetchData();
        }catch (e){
            alert(e.message);
        }
    }

    const getModulosByCurso = async (id) => {
        try {
            const data = await fetchEntidades(endpointCurso + id);
            setNomeCurso(data.nome);
            setModulos(data.modulos);
            setIsModuloDialog(true);
        } catch (e){
            console.error(e);
        }
    }

    const getPeriodosByCurso = async (id) => {
        try {
            const data = await fetchEntidades(endpointGetPeriodos + id);
            setPeriodos(data);
            setIsPeriodoDialog(true);
        } catch (e){
            console.error(e);
        }
    }

    const fetchData = async () => {
        setPlaceholderDropdown('Carregando...');
        setIsCarregando(true);
        try {
            const data = await fetchEntidades(endpointCurso)
            setCursos(data);
            setPlaceholderDropdown('Selecione um Curso');
            setIsCarregando(false);
            } catch (e) {
            setPlaceholderDropdown('Não foi possível carregar a lista, por favor, tente novamente mais tarde');
            setIsCarregando(false);
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const onCursoSelect = (curso) => {
        setCursoSelecionado(curso.value);
        setIsCadastrar(true)
    }

    const cadastrarModulo = (itemId) => {
        cadastro(`/modulos/formulario/cadastrar/${itemId}`);
    }

    const cadastrarPeriodo = (itemId) => {
        cadastro(`/periodos/formulario/cadastrar/${itemId}`);
    }

    return (
        <div>
            <Dialog header={`Módulos do Curso: ${nomeCurso}`} style={{width: "80vw"}} visible={isModuloDialog} onHide={() => {if (!isModuloDialog) return; setIsModuloDialog(false)}}>
                <TabelaListagemModulo
                    lista={modulos}
                    mostrarDisciplinas={false}
                    isCadastrarDisciplina={false}
                    onDeleteClick={(id) => deletar(id)}
                    onEditClick={(id) => cadastro(`/modulos/formulario/editar/${id}`)}
                />
            </Dialog>
            <Dialog header={`Períodos do Curso: ${nomeCurso}`} style={{width: "80vw"}} visible={isPeriodoDialog} onHide={() => {if (!isPeriodoDialog) return; setIsPeriodoDialog(false)}}>
                <TabelaListagemPeriodo
                    lista={periodos}
                    mostrarPeriodos={false}
                    isCadastrarPeriodo={false}
                    onDeleteClick={(id) => deletarPeriodo(id)}
                    onEditClick={(id) => cadastro(`/periodos/formulario/editar/${id}`)}
                />
            </Dialog>
            <EstruturaListagem
                tituloPagina={'Cursos'}
                descricaoPagina={'Aqui estão listados todos os cursos da faculdade'}
                lista={
                    <TabelaListagemCursos
                    lista={cursos}
                    onDeleteClick={(id) => deletar(id)}
                    onEditClick={(id) => cadastro(`/cursos/formulario/editar/${id}`)}
                    onCadastrarModulo={(id) => cadastrarModulo(id)}
                    verModulos={(id) => {getModulosByCurso(id)}}
                    onCadastrarPeriodo={(id) => cadastrarPeriodo(id)}
                    verPeriodos={(id) => {getPeriodosByCurso(id)}}
                />}
                clickCadastro={() => cadastro('/cursos/formulario/cadastrar/')}            
                isCarregando={isCarregando}
                isDropdown={false}
                isCadastroBtn={true}
                onChangedDropdown={onCursoSelect}
                valorDropdown={curso}
                placeholderDropdown={placeholderDropdown}
            />
        </div>
    )
}