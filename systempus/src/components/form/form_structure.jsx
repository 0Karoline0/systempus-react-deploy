import { SimpleButton } from '../../components/button/simple/SimpleButton.jsx';
import { SaveIcon } from '../../assets/icons/SaveIcon.jsx';

export function FormStructure ({title, content, onSubmit, heightPercent}){
    return (
        <div className='estrutura_formulario'>
            <div style={{height: heightPercent ? heightPercent : "75%"}} className='container_formulario'>
                <div style={{justifyContent: "start"}} className='input_div'>
                    <h3>{title}</h3>
                    {content}                    
                </div>
                <SimpleButton color={"var(--color-verde-escuro)"} title={"SALVAR"} icon={<SaveIcon />} onClick={()=>{onSubmit()}} />
            </div>
        </div>
    )
}