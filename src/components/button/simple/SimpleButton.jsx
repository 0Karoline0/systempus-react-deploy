import '../simple/SimpleButton.css'

export function SimpleButton({ title, icon, color, onClick, width, isHidden }) {

    const buttonColor = {
        backgroundColor: color,
        width: width ?? 150
    }

    return (
        <div hidden={isHidden}>
            <button className='simple_button' style={buttonColor} onClick={onClick}>
                <div className='simple_button_icon'>
                    {icon}
                </div>
                {title}
            </button>
        </div>
    )
}