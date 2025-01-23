import { useEffect } from 'react'
import { EstruturaEmployees } from '../../components/layout/estrutura_employees/EstruturaEmployees'
import { fetchEntidades, deletarEntidade } from '../../service/api.js'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfessores } from '../../service/professores_service.js';

export function ProfessoresPage() {

    const navigateTo = useNavigate();
    const [colaboradores, setColaboradores] = useState([]);
    const [isCarregando, setIsCarregando] = useState(false);

    const navigate = (path, nomeProfessor) => {
        navigateTo(path, { state: { nomeProfessor } });
    }

    const deletar = async (id) => {
        try {
            await deletarEntidade(endpointProfessor, id);
            alert('Professor deletado com sucesso!')
            getListaProfessores();
        } catch (e) {
            alert(e.message);
        }
    }

    const getListaProfessores = async () => {
        setIsCarregando(true);
        const data = await getProfessores();
        setColaboradores(data);
        setIsCarregando(false);
    }

    useEffect(() => {
        getListaProfessores();
    }, []);


    return (
        <EstruturaEmployees
            tituloPagina={'Professores'}
            descricaoPagina={"Aqui estão listados todos os professores cadastrados no sistema."}
            colaboradores={colaboradores}
            isCarregando={isCarregando}
            clickCadastro={() => navigate("/professores/formulario/cadastrar")}
            clickEdit={(id) => navigate(`/professores/formulario/editar/${id}`)}
            clickDelete={(id) => deletar(id)}
            isHorarios={true}
            onClickHorarios={(idProfessor, nomeProfessor) => navigate(`/professores/horarios/${idProfessor}`, nomeProfessor)}
        />
    )
}