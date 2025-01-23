import { EstruturaFormulario } from "../../components/layout/estrutura_formulario/EstruturaFormulario";

export function ProfessoresFormulario(){

    const endpointProfessor = `professor/`;

    return (
        <EstruturaFormulario endpoint={endpointProfessor} nomeEntidade={'Professor'} />
    )
}