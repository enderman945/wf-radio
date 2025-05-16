import { h } from 'preact';
import { useState } from 'preact/hooks';

// Components
import Button from '../components/Buttons/button'

// Images
import Logo from '../assets/logo.png'
import Add from '../assets/add.svg'

// Styles
import styles from '../styles/dashboard.module.css'

function DashboardPage() {

    const handleCreate = () => {
        window.location.href('/create/mod');
    }

    return (
        <>
            <a href='/' target="_blank">
                    <img src={Logo} class="logoSmall img" alt="WF" />
                    <p class="logoSmall text"> dashboard </p>
            </a>

            <div class='container'>
                <div className={styles.category}>
                    <p className={styles.title}>
                        Favorites
                    </p>
                    <div className={styles.tiles}>
                        <div className={styles.emptyTile}>
                            <p className={styles.emptyTileText}>
                                You have no favorites for the moment
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.category}>
                    <p className={styles.title}>
                        Your creations
                    </p>
                    <div className={styles.tiles}>
                        <a className={styles.emptyTile} href='/create/mod'>
                            <p className={styles.emptyTileText}>
                                <img src={Add} ></img>
                            </p>
                        </a>
                    </div>
                </div>
                <div className={styles.toolbar}>
                    <div className={styles.toolbarRightItems}>
                        <Button 
                            className={styles.createButton} 
                            href='/create/mod'
                            > 
                                Create 
                            </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;