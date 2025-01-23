import './Sidebar.css';
import { SidebarButton } from "../button/sidebar/SidebarButton.jsx";
import { ProfileMenu } from '../button/profile/ProfileMenu.jsx';
import { HomeIcon } from '../../assets/icons/HomeIcon.jsx';
import { ProfessorIcon } from '../../assets/icons/ProfessorIcon.jsx';
import { CoordenadorIcon } from '../../assets/icons/CoordenadorIcon.jsx';
import { CursoIcon } from '../../assets/icons/CursoIcon.jsx';
import { DisciplinaIcon } from '../../assets/icons/DisciplinaIcon.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

export function Sidebar() {

    const navigateTo = useNavigate();
    const urlAtual = useLocation();

    const clickPage = (path) => {
        navigateTo(path);
    }

    const iconeSelecionado = (path) => {
        return urlAtual.pathname.includes(path);
    }

    return (
        <div className='estrutura'>
            <img className='logo' src="/src/assets/images/logo.png" />
            <ProfileMenu />
            <SidebarButton 
                title='Início' 
                icon={<HomeIcon />}
                onClick={() => clickPage("/home")}
                isSelected={iconeSelecionado("/home")}
            />
            <SidebarButton 
                title='Professor' 
                icon={<ProfessorIcon />}
                onClick={() => clickPage("/professores/")}
                isSelected={iconeSelecionado("/professores")}
            />
            <SidebarButton 
                title='Coordenador' 
                icon={<CoordenadorIcon />}
                onClick={() => clickPage("/coordenadores/")}
                isSelected={iconeSelecionado("/coordenadores")}
            />
            <SidebarButton 
                title='Curso' 
                icon={<CursoIcon />}
                onClick={() => clickPage("/cursos/")}
                isSelected={iconeSelecionado("/cursos/")}
            />
            <SidebarButton 
                title='Disciplina' 
                icon={<DisciplinaIcon />}
                onClick={() => clickPage("/disciplinas/")}
                isSelected={iconeSelecionado("/disciplinas/")}
            />
        </div>
    )
}