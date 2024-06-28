import css from "./ErrorMessage.module.css"

export default function ErrorMessage() {
    return (<div className={css.error}>
        <p>
            Please reload the page or enter a valid query!!!
        </p>
    </div>);
}
