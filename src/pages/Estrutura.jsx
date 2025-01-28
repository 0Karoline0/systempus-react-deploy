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
                        <Route path='/systempus-react-deploy/' element={<HomePage />} />
                        <Route path='/systempus-react-deploy/home' element={<HomePage />} />
                        <Route path='/systempus-react-deploy/professores/' element={<ProfessoresPage />} />
                        <Route path='/systempus-react-deploy/professores/formulario/:isCadastro/:id?' element={<ProfessoresFormulario />} />
                        <Route path='/systempus-react-deploy/coordenadores/' element={<CoordenadoresPage />} />
                        <Route path='/systempus-react-deploy/coordenadores/formulario/:isCadastro/:id?' element={<CoordenadorFormulario/>}/>
                        <Route path='/systempus-react-deploy/cursos/' element={<CursosPage />}/>
                        <Route path='/systempus-react-deploy/cursos/formulario/:isCadastro/:id?' element={<CursoFormulario />}/>
                        <Route path='/systempus-react-deploy/modulos/' element={<ModuloPage />}/>
                        <Route path='/systempus-react-deploy/modulos/formulario/:isCadastro/:id?' element={<ModuloFormulario />}/>
                        <Route path='/systempus-react-deploy/disciplinas/' element={<DisciplinasPage />}/>
                        <Route path='/systempus-react-deploy/disciplinas/formulario/:isCadastro/:id?' element={<DisciplinaFormulario />}/>
                        <Route path='/systempus-react-deploy/periodos/formulario/:isCadastro/:id?' element={<PeriodoFormulario/>}></Route>
                        <Route path='/systempus-react-deploy/professores/horarios/:idProfessor' element={<DisponibilidadeProfessor/>}></Route>
                        <Route path='/systempus-react-deploy/disciplinas/horarios/:idDisciplina' element={<HorariosDisciplinas/>}></Route>
                        <Route path='/systempus-react-deploy/horarios-docente/' element={<HorariosDocente/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

/* No React-Router-Dom versão 6 o Switch foi substituído por Route. Ao invés de se usar component, usa-se element */