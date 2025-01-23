import { NavbarButton } from '../button/navbar/NavbarButton';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {

    const navigateTo = useNavigate();
    const urlAtual = useLocation();

    const clickPage = (path) => {
        navigateTo(path);
    }

    const iconeSelecionado = (path) => {
        return urlAtual.pathname.includes(path);
    }

    return (
        <div>
            <div className="navbar_structure">
                <img className='logo_navbar' src="/src/assets/images/logo.png" />
                <div className="navbar-menu">
                    <NavbarButton
                        title={"Início"}
                        onClick={() => clickPage("/home")}
                        isSelected={iconeSelecionado("/home")}
                    />
                    <NavbarButton
                        title={"Professores"}
                        isSelected={iconeSelecionado("/professores")}
                        onClick={() => clickPage("/professores/")}
                    />
                    <NavbarButton
                        title={"Coordenadores"}
                        isSelected={iconeSelecionado("/coordenadores")}
                        onClick={() => clickPage("/coordenadores/")}
                    />
                    <NavbarButton
                        title={"Cursos"}
                        isSelected={iconeSelecionado("/cursos/")}
                        onClick={() => clickPage("/cursos/")}
                    />
                    <NavbarButton
                        title={"Disciplinas"}
                        isSelected={iconeSelecionado("/disciplinas/")}
                        onClick={() => clickPage("/disciplinas/")}
                    />
                    <NavbarButton
                        title={"Horarios Docente"}
                        isSelected={iconeSelecionado("/horarios-docente/")}
                        onClick={() => clickPage("/horarios-docente/")}
                    />
                </div>
            </div>
        </div>
    );
}