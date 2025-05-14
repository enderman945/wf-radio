// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// Functions
import { createMod } from '../services/api';

// Components
import InputField from '../components/Fields/input_field'

// Images
import logo from '../assets/logo.png'
import profile from '../assets/profile.svg'

// Styles
import styles from '../styles/content_creation.module.css'
import Button from '../components/Buttons/button';

function ModCreationPage() {

    const user = "guill" //TODO

    const mod_infos = {
        name: ""
    }

    return (
        <>
            <a href="/">
                <img src={logo} class="logo img" alt="WF" />
                <p class="logo text"> creator </p>
            </a>

            <div className={styles.container}>
                <div className={styles.form}>

                    {/* Name */}
                    <InputField
                        id="name"
                        name="name"
                        value={mod_infos.name}
                        // onChange={handleNameChange}
                        // error={nameError}
                        placeholder="name"
                        required
                        className={styles.smallField}
                        >
                        </InputField>

                        {/* Display name */}
                        <InputField
                        id="display_name"
                        name="display_name"
                        value={mod_infos.display_name}
                        // onChange={handleNameChange}
                        // error={nameError}
                        placeholder="display_name"
                        className={styles.smallField}
                        >
                    </InputField>

                    <Button className={styles.createButton}>
                        Create
                    </Button>
                </div>
                

                <div className={styles.infosPanel}>

                    <a href={"/users/" + user}>
                        <img src={profile} className={styles.profilePicture}></img>
                        <p className={styles.author}>{user}</p>
                    </a>

                </div>
            </div>

        </>)
}

export default ModCreationPage