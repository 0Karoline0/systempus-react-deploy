import { useState } from 'react';
import { SimpleButton } from '../../components/button/simple/SimpleButton.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { SaveIcon } from '../../assets/icons/SaveIcon.jsx';
import { getEntidadeId, atualizarEntidadeParcial } from '../../service/api.js';
import { FormStructure } from '../../components/form/form_structure.jsx';

export function ModuloFormulario() {

    let { isCadastro, id } = useParams();
    const navigateTo = useNavigate();
    const [numero, setNumero] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState("");
    const endpointModulo = 'modulo/';
    const endpointCadastroModulo = 'curso/modulo/';

    const pegarDados = async () => {
        const data = await getEntidadeId(endpointModulo, id);
        setNumero(data.numero);
        setDataInicio(data.dataInicio);
        setDataFim(data.dataFim);
    }

    useState(() => {
        if (isCadastro === 'editar') {
            pegarDados();
        }
    })

    const onSubmit = async () => {
        const dadosForm = {
            // ...(isCadastro === 'cadastrar' ? {} : {id}),
            numero: numero,
            dataInicio: dataInicio,
            dataFim: dataFim,
        }

        if (isCadastro === 'cadastrar') {
            try {
                await atualizarEntidadeParcial(endpointCadastroModulo + id, dadosForm);
                alert(`Módulo cadastrado com sucesso!`);
                navigateTo('/cursos/');
            } catch (e) {
                alert(e.message);
            }
        } else {
            try {
                await atualizarEntidadeParcial(endpointModulo + id, dadosForm);
                alert(`Módulo atualizado com sucesso!`);
                navigateTo('/modulos/');
            } catch (e) {
                alert(e.message);
            }
        }
    }

    return (
        <div>
            <FormStructure
                title={'Cadastro de Módulo'}
                onSubmit={onSubmit}
                content={
                    <div>
                        <input
                            className="input_formulario"
                            id='numero'
                            placeholder='Número'
                            type="number"
                            value={numero}
                            onChange={(e) => {
                                setNumero(e.target.value);
                            }}
                        />
                        <label>Data Início</label>
                        <input
                            className="input_formulario"
                            id='dataInicio'
                            placeholder='Data Início'
                            type="date"
                            value={dataInicio}
                            onChange={(e) => {
                                setDataInicio(e.target.value);
                            }}
                        />
                        <label>Data Fim</label>
                        <input
                            className="input_formulario"
                            id='dataFim'
                            placeholder='Data Fim'
                            type="date"
                            value={dataFim}
                            onChange={(e) => {
                                setDataFim(e.target.value);
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