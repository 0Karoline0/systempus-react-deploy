import { useEffect, useState } from 'react';
// import './EstruturaFormulario.css';
import { SimpleButton } from '../../button/simple/SimpleButton.jsx';
import { SaveIcon } from "../../../assets/icons/SaveIcon.jsx";
import { atualizarEntidade, getEntidadeId, fetchEntidades } from '../../../service/api.js';
import { useParams, useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import { BsCheck2 } from "react-icons/bs";

export function FormularioAcademico({ url, urlRetorno, nomeEntidade }) {

    const endpointCurso = 'curso/';
    const endpointDisciplina = 'disciplina/';

    let id = useParams();
    const navigateTo = useNavigate();
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();
    const [foto, setFoto] = useState();
    const [status, setStatus] = useState(1);
    const [cursos, setCursos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    const pegarDados = async () => {
        const data = await getEntidadeId(url, id);
        setNome(data.nome);
        setCpf(data.cpf);
        setFoto(data.foto);
        setTelefone(data.telefone);
        setEmail(data.email);
        setStatus(data.status);
    }

    const pegarDisciplinas = async () => {
        const data = await fetchEntidades(endpointDisciplina);
        setDisciplinas(data);
    }

    const pegarCursos = async () => {
        const data = await fetchEntidades(endpointCurso);
        setCursos(data);
    }


    useEffect(() => {
        pegarDados();
        pegarCursos();
        pegarDisciplinas();
    }, [])

    const onSubmit = async () => {
        const dadosForm = {
            id: id,
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            email: email,
            foto: foto,
            status: status,
        }

        try {
            await atualizarEntidade(url, dadosForm);
            alert(`${nomeEntidade} atualizado com sucesso!`);
            navigateTo(urlRetorno);
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className='estrutura_formulario'>
            <div className='container_formulario'>
                <div className='input_div'>
                    <h3>Cursos e Disciplinas - {nome}</h3>
                    {
                       cursos.map((item, index) => (
                        <div key={index} style={{display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "15px"}}>
                            <span style={{paddingBottom: "10px"}}>{item.nome}</span>
                            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: "10px"}}>
                                <Chip label="Chip Outlined" color='primary'deleteIcon={<BsCheck2 />} onDelete={()=>{}} />
                                <Chip label="Chip Outlined" color='primary' />
                            </div>
                        </div>
                       )) 
                    }
                </div>
                <br />
                <br />
                <SimpleButton color={"var(--color-verde-escuro)"} title={"SALVAR"} icon={<SaveIcon />} onClick={() => { onSubmit() }} />
            </div>
        </div>
    )
}