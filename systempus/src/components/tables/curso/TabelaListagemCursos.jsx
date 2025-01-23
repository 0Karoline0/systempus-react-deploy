import { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
        

export function TabelaListagemCursos({lista, onEditClick, onDeleteClick, onCadastrarModulo, verModulos, onCadastrarPeriodo, verPeriodos}) {

    const menuRefs = useRef({});
    const toast = useRef(null);

    const items = (itemId) => [
        {
            label: 'Opções',
            items: [
                {
                    label: 'Cadastrar Período',
                    icon: 'pi pi-refresh',
                    command: (event) => onCadastrarPeriodo(itemId),
                },
                {
                    label: 'Ver Períodos',
                    icon: 'pi pi-refresh',
                    command: (event) => verPeriodos(itemId),
                },
                {
                    label: 'Cadastrar Módulo',
                    icon: 'pi pi-refresh',
                    command: (event) => onCadastrarModulo(itemId),
                },
                {
                    label: 'Ver Módulos',
                    icon: 'pi pi-refresh',
                    command: (event) => verModulos(itemId),
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

    const getModalidade = (numero) => {
        if (numero == 0) return 'Presencial';
        if (numero == 1) return 'Híbrido';
        if (numero == 2) return 'Ensino à Distância - EAD';
        return numero;
    };

    const getNivelEnsino = (numero) => {
        if (numero == 0) return 'Infantil';
        if (numero == 1) return 'Fundamental';
        if (numero == 2) return 'Médio';
        if (numero == 3) return 'Superior';
        if (numero == 4) return 'Pós-Graduação';
        return numero;
    };

    return (
        <div className="table-bg-white">
            <table style={{borderCollapse: 'collapse'}}>
                <thead className='tb-header'>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Nível Ensino</th>
                        <th>Qtd Períodos</th>
                        <th>Modalidade</th>
                        <th>Carga Total</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <br />
                <tbody>
                    {lista.map((item, index) => (
                        <tr key={index}>
                            <td className="tb-centralizado">{item.id}</td>
                            <td>{item.nome}</td>
                            <td className="tb-centralizado">{getNivelEnsino(item.nivelEnsino)}</td>
                            <td className="tb-centralizado">{item.qtdPeriodos}</td>
                            <td className="tb-centralizado">{getModalidade(item.modalidade)}</td>
                            <td className="tb-centralizado">{item.cargaTotal}</td>
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