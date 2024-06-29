
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
    items: {
        id: string;
        urls: {
            regular: string;
            small: string;
        };
        alt_description: string;
    }[];
    onOpen: (url: string) => void;
}

function ImageGallery({ items, onOpen }: ImageGalleryProps) {
    return (
        <ul className={css.list}>
            {items.map((item, index) => (
                <li className={css.item} key={`${item.id}-${index}`}>
                    <ImageCard onOpen={onOpen} urls={item.urls} alt_description={item.alt_description} />
                </li>
            ))}
        </ul>
    );
}

export default ImageGallery;
