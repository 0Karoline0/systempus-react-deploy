import './IconText.css';

export function IconText({icon,text}){
    return (
        <div className="icon_text_structure">
            {icon}
            <span className='icon_text_span'>{text}</span>
        </div>
    )
}