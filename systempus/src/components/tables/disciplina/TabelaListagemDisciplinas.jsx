import DeleteIcon from '../../../assets/icons/DeleteIcon';
import { BsClock } from "react-icons/bs";
import { EditIcon } from '../../../assets/icons/EditIcon';
import { SimpleButton } from '../../button/simple/SimpleButton';
import '../disciplina/TabelaListagemDisciplinas.css';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function TabelaListagemDisciplinas({lista, onEditClick, onDeleteClick, onHorarios}) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>ID</TableCell>
                        <TableCell align='center'>Nome</TableCell>
                        <TableCell align='center'>Opções</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align='center'>{row.id}</TableCell>
                            <TableCell align='center'>{row.nome}</TableCell>
                            <TableCell align='center'>
                                <div className='row-tb-opcoes'>
                                <SimpleButton width={"45px"} color={"var(--color-laranja-escuro)"} icon={<EditIcon />} onClick={() => onEditClick(row.id)} />
                                    <SimpleButton width={"45px"} color={"var(--color-vermelho-escuro)"} icon={<DeleteIcon />} onClick={() => onDeleteClick(row.id)} />
                                    <SimpleButton width={"45px"} color={"var(--color-azul-escuro)"} icon={<BsClock />} onClick={() => onHorarios(row.id, row.nome)} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}