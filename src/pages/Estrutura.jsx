import {Sidebar} from '/src/components/sidebar/Sidebar.jsx';
import '../styles/GlobalStyle.css'
import './Estrutura.css';
import { HomePage } from './home/HomePage';
import { ProfessoresPage } from './professores/ProfessoresPage'
import { CoordenadoresPage } from './coordenadores/CoordenadoresPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfessoresFormulario } from './professores/ProfessoresFormulario';
import { CoordenadorFormulario } from './coordenadores/CoordenadorFormulario';
import { CursosPage } from './cursos/CursosPage';
import { CursoFormulario } from './cursos/CursoFormulario';
import { DisciplinasPage } from './disciplinas/DisciplinasPage';
import { ModuloPage } from './modulo/ModuloPage';
import { ModuloFormulario } from './modulo/ModuloFormulario';
import { DisciplinaFormulario } from './disciplinas/DisciplinaFormulario';
import { PeriodoFormulario } from './periodos/PeriodoFormulario';
import { HorariosDisciplinas } from './horarios_disciplina/HorariosDisciplinas';
import { Navbar } from '../components/navbar/Navbar';
import { HorariosDocente } from './horarios_docente/HorariosDocente';
import { DisponibilidadeProfessor } from './horarios_aula/DisponibilidadeProfessor';

export function Estrutura() {

    return (
        <div className='estrutura_principal'>
            <BrowserRouter>
                <Navbar className="estrutura_navbar"/>
                <div className='estrutura_background'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/professores/' element={<ProfessoresPage />} />
                        <Route path='/professores/formulario/:isCadastro/:id?' element={<ProfessoresFormulario />} />
                        <Route path='/coordenadores/' element={<CoordenadoresPage />} />
                        <Route path='/coordenadores/formulario/:isCadastro/:id?' element={<CoordenadorFormulario/>}/>
                        <Route path='/cursos/' element={<CursosPage />}/>
                        <Route path='/cursos/formulario/:isCadastro/:id?' element={<CursoFormulario />}/>
                        <Route path='/modulos/' element={<ModuloPage />}/>
                        <Route path='/modulos/formulario/:isCadastro/:id?' element={<ModuloFormulario />}/>
                        <Route path='/disciplinas/' element={<DisciplinasPage />}/>
                        <Route path='/disciplinas/formulario/:isCadastro/:id?' element={<DisciplinaFormulario />}/>
                        <Route path='/periodos/formulario/:isCadastro/:id?' element={<PeriodoFormulario/>}></Route>
                        <Route path='/professores/horarios/:idProfessor' element={<DisponibilidadeProfessor/>}></Route>
                        <Route path='/disciplinas/horarios/:idDisciplina' element={<HorariosDisciplinas/>}></Route>
                        <Route path='/horarios-docente/' element={<HorariosDocente/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

/* No React-Router-Dom versão 6 o Switch foi substituído por Route. Ao invés de se usar component, usa-se element */