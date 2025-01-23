import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveAndGetAll, getEntidadeId, atualizarEntidade } from '../../service/api.js';
import { FormStructure } from '../../components/form/form_structure.jsx';

export function CursoFormulario() {

    let { isCadastro, id } = useParams();
    const navigateTo = useNavigate();
    const [nome, setNome] = useState('');
    const [qtdPeriodos, setQtdPeriodos] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState("");
    const [nivelEnsino, setNivelEnsino] = useState(1);
    const [modalidade, setModalidade] = useState(1);
    const endpointCurso = 'curso/';

    const pegarDados = async () => {
        const data = await getEntidadeId(endpointCurso, id);
        setNome(data.nome);
        setCargaHoraria(data.cargaTotal);
        setQtdPeriodos(data.qtdPeriodos);
        setNivelEnsino(data.nivelEnsino);
        setModalidade(data.modalidade);
    }

    useState(() => {
        if (isCadastro === 'cadastrar') {
            console.log('');
        } else if (isCadastro === 'editar') {
            pegarDados();
        }
    })

    const onSubmit = async () => {
        const dadosForm = {
            id: id,
            nome: nome,
            qtdPeriodos: qtdPeriodos,
            cargaTotal: cargaHoraria,
            nivelEnsino: nivelEnsino,
            modalidade: modalidade,
        }

        if (isCadastro === 'cadastrar') {
            try {
                await saveAndGetAll(endpointCurso, dadosForm);
                alert(`Curso cadastrado com sucesso!`);
                navigateTo('/cursos/');
            } catch (e) {
                alert(e.message);
            }
        } else {
            try {
                await atualizarEntidade(endpointCurso, dadosForm);
                alert(`Curso atualizado com sucesso!`);
                navigateTo('/cursos/');
            } catch (e) {
                alert(e.message);
            }
        }
    }

    return (
        <div>
            <FormStructure
                title={'Cadastro de Curso'}
                onSubmit={onSubmit}
                content={
                    <div>
                        <input
                            className="input_formulario"
                            id='nome'
                            placeholder='Nome'
                            type="text"
                            value={nome}
                            onChange={(e) => {
                                setNome(e.target.value);
                            }}
                        />
                        <input
                            className="input_formulario"
                            id='carga'
                            placeholder='Carga Horária Total'
                            type="number"
                            value={cargaHoraria}
                            onChange={(e) => {
                                setCargaHoraria(e.target.value);
                            }}
                        />
                        <input
                            className="input_formulario"
                            id='qtdPeriodos'
                            placeholder='Quantidade de Períodos'
                            type="number"
                            value={qtdPeriodos}
                            onChange={(e) => {
                                setQtdPeriodos(e.target.value);
                            }}
                        />
                        <div className='select-estrutura'>
                            <label>Modalidade: </label>
                            <select style={{ width: '250px' }} className='select-style' name="" id="" value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
                                <option value="0">Presencial</option>
                                <option value="1">Híbrido</option>
                                <option value="2">Ensino à Distância - EAD</option>
                            </select>
                        </div>
                        <div className='select-estrutura'>
                            <label>Nível de Ensino: </label>
                            <select style={{ width: '220px' }} className='select-style' name="" id="" value={nivelEnsino} onChange={(e) => setNivelEnsino(e.target.value)}>
                                <option value="0">Infantil</option>
                                <option value="1">Fundamental</option>
                                <option value="2">Médio</option>
                                <option value="3">Superior</option>
                                <option value="4">Pós-Graduação</option>
                            </select>
                        </div>
                        <form action="">
                        </form>
                    </div>
                }
            />
        </div>

    )
}