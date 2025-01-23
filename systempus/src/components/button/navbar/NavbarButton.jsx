import './NavbarButton.css';

export function NavbarButton({title, isSelected, onClick}){
    return (
        <div onClick={onClick} className={isSelected ? "navbar-button selected" : "navbar-button"}>
            <span>{title}</span>
        </div>
    )
}