import './EmployeeContainer.css';
import { SimpleButton } from '../../button/simple/SimpleButton';
import { EditIcon } from '../../../assets/icons/EditIcon';
import { StatusContainer } from '../status_container/StatusContainer';
import { IconText } from '../../text/icon_text/IconText';
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { mascaraTelefone } from '../../../utils/helper.js';

export function EmployeeContainer({status, nome, curso, telefone, email, img, onClickEdit, onDelete, isHorarios, onClickHorarios}) {
    return (
        <div className='employee_container_structure'>
            <div className='employee_container_header'>
                <svg onClick={onDelete} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill={"var(--color-vermelho-escuro)"} viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
                <StatusContainer status={status}/>
            </div>
            <img className='employee_container_picture' src={img ?? '/src/assets/images/alt_img.png'} alt='imagem perfil' />
            <h5 style={{textAlign: "center"}}>{nome}</h5>
            <span style={{textAlign: "center"}}>{curso}</span>
            <div className='employee_container_infos'>
                <IconText icon={<BsFillTelephoneFill />} text={mascaraTelefone(telefone) ?? 'Não informado'} />
                <IconText icon={<BsFillEnvelopeFill />} text={email ?? 'Não informado'} />
            </div>
            <SimpleButton title={'Editar'} color={"var(--color-laranja-escuro)"} icon={<EditIcon />} onClick={onClickEdit} />
            <div className='espacamento_vertical_botoes'></div>
            {isHorarios && (
                <SimpleButton title={'Horários'} color={"var(--color-azul-escuro)"} icon={<BsClock />} onClick={onClickHorarios} />
            )}
            
        </div>
    )
}