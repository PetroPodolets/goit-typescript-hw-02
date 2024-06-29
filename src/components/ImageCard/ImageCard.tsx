import css from './ImageCard.module.css';

interface ImageCardProps {
    urls: {
        regular: string;
        small: string;
    };
    alt_description: string;
    onOpen: (url: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ urls, alt_description, onOpen }) => {
    return (
        <div>
            <img
                className={css.image}
                onClick={() => onOpen(urls.regular)}
                src={urls.small}
                alt={alt_description}
            />
        </div>
    );
};

export default ImageCard;