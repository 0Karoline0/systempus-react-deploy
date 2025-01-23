import { useState, useEffect } from "react";
import { EstruturaListagem } from "../../components/layout/estrutura_listagens/EstruturaListagem"
import { fetchEntidades, deletarEntidade } from "../../service/api";
import { useNavigate } from 'react-router-dom';
import { TabelaListagemModulo } from "../../components/tables/modulo/TabelaListagemModulo";
import { TabelaListagemDisciplinas } from '../../components/tables/disciplina/TabelaListagemDisciplinas';
import { Dialog } from 'primereact/dialog';

export function ModuloPage(){

    const endpointModulo = 'modulo/';
    const navigateTo = useNavigate();
    const [modulos, setModulos] = useState([]);
    const [isCarregando, setIsCarregando] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [numeroModulo, setNumeroModulo] = useState("");

    const cadastro = (path) => {
        navigateTo(path);
    }

    const deletar = async (id) => {
        try {
            await deletarEntidade(endpointModulo, id);
            alert('Módulo deletado com sucesso!')
            fetchData();
        }catch (e){
            alert(e.message);
        }
    }

    const getDisciplinasByModulo = async (id) => {
        try {
            const data = await fetchEntidades(endpointModulo + id);
            setNumeroModulo(data.numero);
            setDisciplinas(data.disciplinas);
            setVisibleDialog(true);
        } catch (e){
            console.error(e);
        }
    }

    const fetchData = async () => {
        setIsCarregando(true);
        try {
            const data = await fetchEntidades(endpointModulo)
            setModulos(data);
            setIsCarregando(false);
        } catch (e) {
            setIsCarregando(false);
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const cadastrarDisciplina = (id) => {
        cadastro(`/disciplinas/formulario/cadastrar/${id}`);
    }

    return (
        <div>
            <Dialog header={`Disciplinas do Módulo n°: ${numeroModulo}`} style={{width: "80vw"}} visible={visibleDialog} onHide={() => {if (!visibleDialog) return; setVisibleDialog(false)}}>
                <TabelaListagemDisciplinas
                    lista={disciplinas}
                    mostrarDisciplinas={false}
                    isCadastrarDisciplina={false}
                    onDeleteClick={(id) => deletar(id)}
                    onEditClick={(id) => cadastro(`/disciplinas/formulario/editar/${id}`)}
                />
            </Dialog>
            <EstruturaListagem
                tituloPagina={'Módulos'}
                isCadastroBtn={false}
                descricaoPagina={'Aqui estão listados todos os módulos da faculdade'}
                lista={
                    <TabelaListagemModulo
                        lista={modulos}
                        isCadastrarDisciplina={true}
                        mostrarDisciplinas={true}
                        onDeleteClick={(id) => deletar(id)}
                        verDisciplinas={(id) => getDisciplinasByModulo(id)}
                        onCadastrarDisciplina={(id) => cadastrarDisciplina(id)}
                        onEditClick={(id) => cadastro(`/modulos/formulario/editar/${id}`)}
                    />}
                clickCadastro={() => cadastro('/modulos/formulario/cadastrar/')}
                isCarregando={isCarregando}
            />
        </div>
    )
}