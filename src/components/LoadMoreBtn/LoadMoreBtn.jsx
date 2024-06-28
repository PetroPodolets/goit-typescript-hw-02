import css from "./LoadMoreBtn.module.css"

export default function LoadMoreBtn({ onRef, onAdd }) {
    return (<button className={css.loadMore} ref={onRef} onClick={onAdd}>Load More</button>)
}
