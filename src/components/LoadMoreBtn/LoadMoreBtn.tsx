import css from "./LoadMoreBtn.module.css"

interface More {
    onRef?: React.Ref<HTMLButtonElement>;
    onAdd: () => void,
}

export default function LoadMoreBtn({ onRef, onAdd }: More) {
    return (<button className={css.loadMore} ref={onRef} onClick={onAdd}>Load More</button>)
}
