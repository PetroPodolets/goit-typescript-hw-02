import css from "./ImageCard.module.css"


export default function ImageCard({ urls, alt_description, onOpen }) {
    return (
        <div>

            <img className={css.image} onClick={() => onOpen(urls.regular)} src={urls.small} alt={alt_description} />


        </div>)
}
