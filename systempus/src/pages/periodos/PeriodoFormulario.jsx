import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveAndGetAll, getEntidadeId, atualizarEntidade } from '../../service/api.js';
import { FormStructure } from '../../components/form/form_structure.jsx';


export function PeriodoFormulario(){

    let { isCadastro, id } = useParams();
    const navigateTo = useNavigate();
    const [turno, setTurno] = useState(0);
    const [inicioHorario, setInicioHorario] = useState();
    const [fimHorario, setFimHorario] = useState();
    const [inicioIntervalo, setInicioIntervalo] = useState();
    const [fimIntervalo, setFimIntervalo] = useState();
    const endpointPeriodo = 'periodo/';

    const pegarDados = async () => {
        const data = await getEntidadeId(endpointPeriodo, id);
        setTurno(data.turno);
        setInicioHorario(data.inicioHorario);
        setFimHorario(data.fimHorario);
        setInicioIntervalo(data.inicioIntervalo);
        setFimIntervalo(data.fimIntervalo);
    }

    useState(() => {
        if (isCadastro === 'editar') {
            pegarDados();
        }
    })

    const onSubmit = async () => {
        const dadosForm = {
            turno: turno,
            inicioHorario: inicioHorario,
            fimHorario: fimHorario,
            inicioIntervalo: inicioIntervalo,
            fimIntervalo: fimIntervalo,
            curso: {"id": id},
        }

        console.log(JSON.stringify(dadosForm));

        if (validarTurnoHorario()){
            if (isCadastro === 'cadastrar'){
                try {
                    await saveAndGetAll(endpointPeriodo, dadosForm);
                    alert(`Período cadastrado com sucesso!`);
                    navigateTo('/cursos/');
                } catch (e){
                    alert(e.message);
                }
            }else{
                try {
                    await atualizarEntidade(endpointPeriodo, dadosForm);
                    alert(`Período atualizado com sucesso!`);
                    navigateTo('/cursos/');
                } catch (e){
                    alert(e.message);
                }
            }
        }else{
            alert("Os horários selecionados não condizem com o turno selecionado.");
        }

    }

    const validarTurnoHorario = () => {
        const [hours1, minutes1] = inicioHorario.split(':').map(Number);
        const [hours2, minutes2] = fimHorario.split(':').map(Number);
        const horaInicio = new Date();
        const horaFim = new Date();
        horaInicio.setHours(hours1, minutes1);
        horaFim.setHours(hours2, minutes2);

        const turnoManha = new Date();
        const turnoTarde = new Date();
        const turnoNoite = new Date();
        const fimNoite = new Date();
    
        turnoManha.setHours(0, 0, 0, 0);         // 00:00
        turnoTarde.setHours(12, 0, 0, 0);        // 12:00
        turnoNoite.setHours(17, 59, 0, 0);       // 17:59
        fimNoite.setHours(23, 59, 0, 0);      

        switch (turno) {
            case '0':
                if (turno == '0' && (horaInicio > turnoManha && horaFim < turnoTarde)){
                    return true;
                }else{
                    return false;
                }
            case '1':
                if (turno == '1' && (horaInicio > turnoTarde && horaFim < turnoNoite)){
                    return true;
                }else{
                    return false;
                }
            case '2':
                if (turno == '2' && (horaInicio > turnoNoite && horaFim < fimNoite)){
                    return true;
                }else{
                    return false;
                }
        }
    }

    return (
        <div>
            <FormStructure
                title={'Cadastro de Períodos'}
                onSubmit={onSubmit}
                content={
                    <div>
                        <label>Início Horário</label>
                    <input
                        className="input_formulario"
                        id='inicioHorario'
                        type="time"
                        value={inicioHorario}
                        onChange={(e) => {
                            setInicioHorario(e.target.value);
                        }}
                    />
                    <label>Fim Horário</label>
                    <input
                        className="input_formulario"
                        id='fimHorario'
                        type="time"
                        value={fimHorario}
                        onChange={(e) => {
                            setFimHorario(e.target.value);
                        }}
                        />
                    <label>Início Intervalo</label>
                    <input
                        className="input_formulario"
                        id='inicioIntervalo'
                        type="time"
                        value={inicioIntervalo}
                        onChange={(e) => {
                            setInicioIntervalo(e.target.value);
                        }}
                    />
                    <label>Fim Intervalo</label>
                    <input
                        className="input_formulario"
                        id='fimIntervalo'
                        type="time"
                        value={fimIntervalo}
                        onChange={(e) => {
                            setFimIntervalo(e.target.value);
                        }}
                    />
                    <div style={{paddingLeft: "15px"}} className='select-estrutura'>
                        <label style={{paddingRight: "15px"}}>Turno: </label>
                        <select style={{width: '220px'}} className='select-style' name="" id="" value={turno} onChange={(e) => setTurno(e.target.value)}>
                            <option value="0">Matutino</option>
                            <option value="1">Vespertino</option>
                            <option value="2">Noturno</option>
                        </select>
                    </div>
                    </div>
                }
            />
        </div>
    )
}