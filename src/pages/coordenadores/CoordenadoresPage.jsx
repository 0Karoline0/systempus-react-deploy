import { useEffect, useState } from "react";
import { EstruturaEmployees } from "../../components/layout/estrutura_employees/EstruturaEmployees";
import { deletarEntidade, fetchEntidades } from '../../service/api.js';
import { useNavigate } from "react-router-dom";

export function CoordenadoresPage(){

    const navigateTo = useNavigate();
    const endpointCoordenador = 'coordenador/';
    const [colaboradores, setColaboradores] = useState([]);
    const [isCarregando, setIsCarregando] = useState(false);

    const cadastro = (path) => {
        navigateTo(path);
    }

    const deletar = async (id) => {
        try {
            await deletarEntidade(endpointCoordenador, id);
            alert('Coordenador deletado com sucesso!')
            fetchData();
        }catch (e){
            alert(e.message);
        }
    }

    const fetchData = async () => {
        setIsCarregando(true);
        try {
            const data = await fetchEntidades(endpointCoordenador)
            console.log(data);
            setColaboradores(data);
            setIsCarregando(false);
        } catch (e) {
            setIsCarregando(false);
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    useEffect(() => {
        setIsCarregando(true);
        const fetchData = async () => {
            try {
                const data = await fetchEntidades(endpointCoordenador)
                setColaboradores(data);
                setIsCarregando(false);
            } catch (e) {
                setIsCarregando(false);
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return (
        <EstruturaEmployees
            tituloPagina={"Coordenadores"}
            descricaoPagina={"Aqui estão listados todos os coordenadores cadastrados no sistema."}
            colaboradores={colaboradores}
            isCarregando={isCarregando}
            clickEdit={(id) => cadastro(`/coordenadores/formulario/editar/${id}`)}
            clickCadastro={() => cadastro('/coordenadores/formulario/cadastrar')}
            clickDelete={(id) => deletar(id)}
        />
    )
}