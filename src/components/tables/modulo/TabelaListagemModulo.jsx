import '../modulo/TabelaListagemModulo.css';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useRef } from 'react';

export function TabelaListagemModulo({lista, onEditClick, onDeleteClick, onCadastrarDisciplina, isCadastrarDisciplina, verDisciplinas}) {

    const menuRefs = useRef({});
    const toast = useRef(null);

    const items = (itemId) => [
        {
            label: 'Opções',
            items: [
                isCadastrarDisciplina && {
                    label: 'Cadastrar Disciplina',
                    icon: 'pi pi-refresh',
                    command: (event) => onCadastrarDisciplina(itemId),
                },
                isCadastrarDisciplina && {
                    label: 'Ver Disciplinas',
                    icon: 'pi pi-upload',
                    command: (event) => verDisciplinas(itemId),
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
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data Início</th>
                        <th>Data Fim</th>
                        <th style={{textAlign: "center", justifyItems: "center", alignItems: "center"}} >Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((item, index) => (
                        <tr key={index}>
                            <td className="tb-centralizado">{item.id}</td>
                            <td>{item.nome}</td>
                            <td className="tb-centralizado">{item.dataInicio}</td>
                            <td className="tb-centralizado">{item.dataFim}</td>
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