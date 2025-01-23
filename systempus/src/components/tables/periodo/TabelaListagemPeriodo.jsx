import '../periodo/TabelaListagemPeriodo';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useRef } from 'react';

export function TabelaListagemPeriodo({lista, onEditClick, onDeleteClick, onCadastrarPeriodo, isCadastrarPeriodo, verPeriodos}) {

    const menuRefs = useRef({});
    const toast = useRef(null);

    const items = (itemId) => [
        {
            label: 'Opções',
            items: [
                isCadastrarPeriodo && {
                    label: 'Cadastrar Período',
                    icon: 'pi pi-refresh',
                    command: (event) => onCadastrarPeriodo(itemId),
                },
                isCadastrarPeriodo && {
                    label: 'Ver Períodos',
                    icon: 'pi pi-upload',
                    command: (event) => verPeriodos(itemId),
                },
                {
                    label: 'Editar',
                    icon: 'pi pi-upload',
                    command: (event) => onEditClick(itemId),
                },
                {
                    label: 'Excluir',
                    icon: 'pi pi-upload',
                    command: (event) => onDeleteClick(itemId),
                },
            ]
        }
    ];

    return (
        <div className="table-bg-white">
            <table style={{borderCollapse: 'collapse'}}>
                <thead className='tb-header'>
                    <tr>
                        <th>Início</th>
                        <th>Fim</th>
                        <th>Início Intervalo</th>
                        <th>Fim Intervalo Fim</th>
                        <th style={{textAlign: "center", justifyItems: "center", alignItems: "center"}} >Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((item, index) => (
                        <tr key={index}>
                            <td className="tb-centralizado">{item.inicioHorario}</td>
                            <td className="tb-centralizado">{item.fimHorario}</td>
                            <td className="tb-centralizado">{item.inicioIntervalo}</td>
                            <td className="tb-centralizado">{item.fimIntervalo}</td>
                            <br />
                            <td className="tb-centralizado">
                                <Toast ref={toast}></Toast>
                                <Menu
                                    model={items(item.id)}
                                    popup
                                    ref={(el) => menuRefs.current[item.id] = el}
                                    id={`popup_menu_right_${item.id}`}
                                    popupAlignment="right"
                                />
                                <Button
                                    label="Opções"
                                    icon="pi pi-align-right"
                                    className="mr-2"
                                    onClick={(event) => menuRefs.current[item.id].toggle(event)}
                                    aria-controls={`popup_menu_right_${item.id}`}
                                    aria-haspopup
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}