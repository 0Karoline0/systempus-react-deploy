import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEntidadeId, atualizarEntidadeParcial } from '../../service/api.js';
import { FormStructure } from '../../components/form/form_structure.jsx';

export function DisciplinaFormulario() {

    let { isCadastro, id } = useParams();
    const navigateTo = useNavigate();
    const [nome, setNome] = useState('');
    const endpointDisciplina = 'disciplina/';
    const endpointCadastro = 'modulo/disciplina/';

    const pegarDados = async () => {
        const data = await getEntidadeId(endpointDisciplina, id);
        setNome(data.nome);
    }

    useState(() => {
        if (isCadastro === 'editar') {
            pegarDados();
        }
    })

    const onSubmit = async () => {
        const dadosForm = {
            nome: nome,
        }

        if (isCadastro === 'cadastrar') {
            try {
                await atualizarEntidadeParcial(endpointCadastro + id, dadosForm);
                alert(`Disciplina cadastrado com sucesso!`);
                navigateTo('/disciplinas/');
            } catch (e) {
                alert(e.message);
            }
        } else {
            try {
                await atualizarEntidadeParcial(endpointDisciplina + id, dadosForm);
                alert(`Disciplina atualizada com sucesso!`);
                navigateTo('/disciplinas/');
            } catch (e) {
                alert(e.message);
            }
        }
    }

    return (
        <div>
            <FormStructure
                title={'Cadastro de Disciplina'}
                heightPercent={'40%'}
                onSubmit={onSubmit}
                content={
                    <div>
                        <input
                            className="input_formulario"
                            id='numero'
                            placeholder='Nome'
                            type="text"
                            value={nome}
                            onChange={(e) => {
                                setNome(e.target.value);
                            }}
                        />
                        <form action="">
                        </form>
                    </div>
                }
            />
        </div>
    )
}