import '../profile/ProfileMenu.css'

export function ProfileMenu(){
    return (
        <div className="estrutura_profile_button">            
            <img className="profile_picture" src="/src/assets/images/susana.png"/>
            <span className='profile_name'>Susana Monteiro Carvalho</span>
            <span className='profile_role'>Professora</span>
        </div>
    )
}