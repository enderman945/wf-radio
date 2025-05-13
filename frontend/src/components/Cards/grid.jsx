import { h } from 'preact' // Necessary ?
import styles from './grid.module.css'

function GridCard({item}) {
    return (
        <div className={styles.gridCard}>
            This is a card !
            {item.name}
        </div>
    )
}

export default GridCard;