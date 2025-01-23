import { SimpleButton } from "../button/simple/SimpleButton"

export function Modal({ message, isError, isAlert, isSuccess, onClick }) {

    const [isModal, setIsModal] = useState(false);

    const mostrarModal = () => {
        setIsModal(!isModal);
    }

    if (isModal){
        document.body.classList.add('modal-active')
    }else{
        document.body.classList.remove('modal-active')
    }

    return (
        <div className="overlay">
            <h2>{isError ? 'OPS!' : isAlert ? 'ATENÇÃO!' : isSuccess ? 'SUCESSO!' : ''}</h2>
            <span>{message}</span>
            <SimpleButton
                title={'Cancelar'}
                onClick={mostrarModal}
                color={"var(--color-laranja-escuro)"}
            />
            <SimpleButton
                title={'OK'}
                onClick={onClick}
                color={isError ? "var(--color-vermelho-escuro)" : isAlert ? "var(--color-laranja-escuro)" : "var(--color-verde-escuro)"}
            />
        </div>
    )
}