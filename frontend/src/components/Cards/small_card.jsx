// Preact
import { h } from 'preact' // Necessary ?

// Styles
import styles from './small_card.module.css'

// Images
import Thumbnail from '../../assets/mod.svg'
import Banner from '../../assets/example.jpg'

function SmallCard({item, variant, href}) {
    console.debug(variant, item);

    if (variant === 'empty') {
        return (
            <a className={styles.emptyCard} href={href}>  
                <p className={styles.emptyCardText}>{item}</p>
            </a>
        );
    } else if (variant === 'mod') {

        const item_page = "/mods/" + item.name;
        return (
            <a className={styles.Card} href={href}>  
                <div className={styles.CardText}>
                    {item.display_name}
                </div>
            </a>
        );
    }
    
}

export default SmallCard;