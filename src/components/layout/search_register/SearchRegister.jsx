import { SimpleButton } from '../../button/simple/SimpleButton';
import { SearchBar } from '../../inputs/search_bar/SearchBar';
import { CreateIcon } from '../../../assets/icons/CreateIcon';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import "./SearchRegister.css";

export function SearchRegister({buttonTitle, onClickCadastro, isCadastroBtn, componente}) {
    return (
        <div className="search_register_structure">
            <SearchBar />
            {componente}
            <SimpleButton isHidden={!isCadastroBtn} icon={<CreateIcon />} title={buttonTitle} color="var(--color-laranja-escuro)" onClick={onClickCadastro} />
        </div>
    )
}