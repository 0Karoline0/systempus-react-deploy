import './StatusContainer.css';

export function StatusContainer({status}){

    const getStatusCompleto = (status) => {
        switch (status){
            case 0:
                return "Ativo";
            case 1:
                return "Desativado";
            case 2:
                return "Licença";
            default:
                return '';
        }
    }

    return (
        <div className={status == 0 ? "status_container_ativo" : status == 1 ? "status_container_inativo" : "status_container_licenca"}>
            <span>{getStatusCompleto(status)}</span>
        </div>
    )
}