import './SidebarButton.css';

export function SidebarButton({title, icon, isSelected, onClick}){
    return (
        <div onClick={onClick} className={isSelected ? 'sidebar_button_estrutura_selected' : 'sidebar_button_estrutura'}>
            <div className={isSelected ? 'sidebar_button_title_icon_selected' : 'sidebar_button_title_icon'}>
                <div className={isSelected ? 'sidebar_button_icon_selected' : 'sidebar_button_icon'}>
                    {icon}
                </div>
                <span className='sidebar_button_span'>{title}</span>
            </div>
            <hr className='horizontal_divider'/>
        </div>
    )
}