
import ImageCard from "../ImageCard/ImageCard"
import css from "./ImageGallery.module.css";


export default function ImageGallery({ items, onOpen }) {


    return (
        <ul className={css.list}>

            {items.map((item) => (
                <li className={css.item} key={item.id}>
                    <ImageCard onOpen={onOpen} urls={item.urls} alt_description={item.alt_description} />
                </li>
            ))}

        </ul>
    )
}
