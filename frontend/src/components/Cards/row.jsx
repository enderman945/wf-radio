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
    return (
        <div className={styles.rowCard}>
            <a href={'/mods/' + item.name}>
            <img src={Thumbnail} className={styles.thumbnail}></img>
            </a>    
                <p className={styles.description}>   {item.description}
            </p>
            <div className={styles.titleDiv}>
                <a className={styles.title}> {item.display_name}</a>
                <a className={styles.author}> By {item.author}</a>
            </div>
            <Button href={"/mods/" + item.name} className={styles.downloadButton}>
                <img src={DownloadIcon} className={styles.downloadIcon}></img>
                Download
            </Button>
        </div>
    )
}

export default GridCard;