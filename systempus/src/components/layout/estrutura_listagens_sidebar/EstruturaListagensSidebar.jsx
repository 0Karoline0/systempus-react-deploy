import { TituloPaginas } from '../../text/titulo_paginas/TituloPaginas';
import './EstruturaListagensSidebar.css';

export function EstruturaListagensSidebar({title, content, isVisible}){
    if (!isVisible) {
        return null;
    }
    return (
        <div className={'estrutura_listagens_sidebar'}>
            <TituloPaginas titulo={title}></TituloPaginas>
            <div className="content_sidebar_structure">
                {content}
            </div>
        </div>
    )
}