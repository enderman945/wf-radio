// Preact
import { h } from 'preact' // Necessary ?
// Components
import Button from '../Buttons/button'
// Styles
import styles from './row.module.css'
// Images
import Thumbnail from '../../assets/mod.svg'
import DownloadIcon from '../../assets/download_alt.svg'

function GridCard({item}) {
    const item_page = "/mods/" + item.name;
    return (
        <div className={styles.rowCard}>
            <a href={item_page}>
                <img src={Thumbnail} className={styles.thumbnail}></img>
            </a>
                <p className={styles.description}>   {item.description}
            </p>
            <div className={styles.titleDiv}>
                <a className={styles.title} href={item_page}> {item.display_name}</a>
                <a className={styles.author}> By {item.author}</a>
            </div>
            <Button href={item_page} className={styles.downloadButton}>
                <img src={DownloadIcon} className={styles.downloadIcon}></img>
                Download
            </Button>
        </div>
    )
}

export default GridCard;