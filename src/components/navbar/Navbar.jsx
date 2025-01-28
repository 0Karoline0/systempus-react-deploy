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
                        onClick={() => clickPage("/systempus-react-deploy/home")}
                        isSelected={iconeSelecionado("/systempus-react-deploy/home")}
                    />
                    <NavbarButton
                        title={"Professores"}
                        isSelected={iconeSelecionado("/systempus-react-deploy/professores")}
                        onClick={() => clickPage("/systempus-react-deploy/professores/")}
                    />
                    <NavbarButton
                        title={"Coordenadores"}
                        isSelected={iconeSelecionado("/systempus-react-deploy/coordenadores")}
                        onClick={() => clickPage("/systempus-react-deploy/coordenadores/")}
                    />
                    <NavbarButton
                        title={"Cursos"}
                        isSelected={iconeSelecionado("/systempus-react-deploy/cursos/")}
                        onClick={() => clickPage("/systempus-react-deploy/cursos/")}
                    />
                    <NavbarButton
                        title={"Disciplinas"}
                        isSelected={iconeSelecionado("/systempus-react-deploy/disciplinas/")}
                        onClick={() => clickPage("/systempus-react-deploy/disciplinas/")}
                    />
                    <NavbarButton
                        title={"Horarios Docente"}
                        isSelected={iconeSelecionado("/systempus-react-deploy/horarios-docente/")}
                        onClick={() => clickPage("/systempus-react-deploy/horarios-docente/")}
                    />
                </div>
            </div>
        </div>
    );
}