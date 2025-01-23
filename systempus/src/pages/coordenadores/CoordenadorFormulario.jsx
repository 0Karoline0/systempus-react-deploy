import { EstruturaFormulario } from "../../components/layout/estrutura_formulario/EstruturaFormulario";

export function CoordenadorFormulario(){

    const endpoint = `coordenador/`;

    return (
        <EstruturaFormulario endpoint={endpoint} nomeEntidade={'Coordenador'} />
    )
}