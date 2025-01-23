import { useEffect, useState } from 'react';
import './EstruturaFormulario.css';
import { saveAndGetAll, atualizarEntidade, getEntidadeId } from '../../../service/api.js';
import { useParams, useNavigate } from 'react-router-dom';
import { FormStructure } from '../../form/form_structure.jsx';

export function EstruturaFormulario({ endpoint, nomeEntidade }) {

    let { isCadastro, id } = useParams();
    const navigateTo = useNavigate();
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();
    const [foto, setFoto] = useState();
    const [status, setStatus] = useState(1);
    const [idCadastrado, setIdCadastrado] = useState("");

    const pegarDados = async () => {
        const data = await getEntidadeId(endpoint, id);
        setNome(data.nome);
        setCpf(data.cpf);
        setFoto(data.foto);
        setTelefone(data.telefone);
        setEmail(data.email);
        setStatus(data.status);
    }


    useEffect(() => {
        if (isCadastro === 'cadastrar') {
            console.log('');
        } else if (isCadastro === 'editar') {
            pegarDados();
        }
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

        if (isCadastro === 'cadastrar') {
            try {
                const data = await saveAndGetAll(endpoint, dadosForm);
                setIdCadastrado(data.id);
                alert(`${nomeEntidade} cadastrado com sucesso!`);
                navigateTo(`/formulario/academico/${idCadastrado}`);
            } catch (e) {
                alert(e.message);
            }
        } else {
            try {
                await atualizarEntidade(endpoint, dadosForm);
                alert(`${nomeEntidade} atualizado com sucesso!`);
                navigateTo(`/formulario/academico/${id}`);
            } catch (e) {
                alert(e.message);
            }
        }
    }

    return (
        <div>
            <FormStructure
                title={`Cadastro de ${nomeEntidade}`}
                onSubmit={onSubmit}
                content={
                    <div>
                        <img className='employee_container_picture_form' src={foto ?? '/src/assets/images/alt_img.png'} />
                    <input
                        className="input_formulario"
                        id='nome'
                        placeholder='Nome'
                        type="text"
                        value={nome}
                        onChange={(e) => {
                            setNome(e.target.value);
                        }}
                        style={{ flex: '4' }}
                    />
                    <input
                        className="input_formulario"
                        id='cpf'
                        placeholder='CPF'
                        value={cpf}
                        onChange={(e) => {
                            setCpf(e.target.value);
                        }}
                        style={{ flex: '2' }}
                    />
                    <div style={{ display: "flex", width: "100%", position: "relative", gap: "10px", flexDirection: "row", justifyContent: "space-between" }}>
                        <input
                            className="input_formulario"
                            placeholder='Email'
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <input
                            className="input_formulario"
                            placeholder='Telefone'
                            value={telefone}
                            onChange={(e) => {
                                setTelefone(e.target.value);
                            }}
                        />
                    </div>
                    <input
                        className="input_formulario"
                        placeholder='Foto de Perfil'
                        type="text"
                        value={foto}
                        onChange={(e) => setFoto(e.target.value)}
                    />
                    <div className='select-estrutura'>
                        <select className='select-style' name="" id="" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Selecione um Status</option>
                            <option value="0">Ativo</option>
                            <option value="1">Desativado</option>
                            <option value="2">Licença</option>
                        </select>
                    </div>
                    </div>
                }
            />
        </div>
    )
}