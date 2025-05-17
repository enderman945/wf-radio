// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

// Functions
import { createMod } from '../services/mods';

// Components
import InputField from '../components/Fields/input_field'
import TextArea from '../components/Fields/text_area'

// Images
import logo from '../assets/logo.png'
import profile from '../assets/profile.svg'

// Styles
import styles from '../styles/content_creation.module.css'
import Button from '../components/Buttons/button';

function ModCreationPage() {
    //TODO add missing fields

    const null_fields = {
        name: null,
        display_name: null,
        description: null,
        mod_infos: {
            full_description: null
        }
    }

    //TODO use a service
    let user;
    const token = Cookies.get('authToken'); 
    if (token) {
        const decoded_token = jwtDecode(token);
        if (decoded_token) {
            user = decoded_token.username;
        } else {
            location.replace('/login')
        }
    } else {
        location.replace('/login')
    }

    const [name, setName] = useState('');
    const [display_name, setDisplayName] = useState('');
    const [description, setDescription] = useState('');
    const [full_description, setFullDescription] = useState('');

    const [publish_status, setPublishStatus] = useState(null);
    const [field_errors, setFieldErrors] = useState(null_fields);


    // Handle fields changes

    const handleNameChange = (event) => {
        setName(event.target.value);
        // Reset error
        setFieldErrors(prevErrors => ({ ...prevErrors, name: null }));
    };
    const handleDisplayNameChange = (event) => {
        setDisplayName(event.target.value);
        setFieldErrors(prevErrors => ({ ...prevErrors, display_name: null }));
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setFieldErrors(prevErrors => ({ ...prevErrors, description: null }));
    };
    const handleFullDescriptionChange = (event) => {
        setFullDescription(event.target.value);
        console.debug(event.target.value);
        setFieldErrors(prevErrors => ({ ...prevErrors, full_description: null }));
    };

    // Submission

    const handleSubmit = async (event) => {
            event.preventDefault();
            setFieldErrors(null_fields);
    
            setPublishStatus('publishing');
    
            try {
                // Gather data                
                const mod_data = {
                    name: name,
                    display_name: display_name,
                    description: description,
                    mod_infos: {
                        full_description: full_description,
                        //TODO handle all possible fields
                        "license": {
                            "type": "none"
                        },
                        "links": []
                    }
                }

                // Query
                const response = await createMod(mod_data);
                
                // On success
                console.debug('Published successfully:', response);
                setPublishStatus('success');
                window.location.replace("/mods/" + name); //TODO no page reloading
    
            } catch (error) {
    
                console.error('Creation failed:', error);
                setPublishStatus('error');
    
                //TODO handle different codes differently
                setFieldErrors({
                    name: ' ',
                    display_name: ' ',
                    description: ' ',
                    mod_infos: {
                        full_description: ' '
                    }
                });
            }
            finally {
                setPublishStatus(null);
            }
        };

    return (
        <>
            <a href="/">
                <img src={logo} class="logo img" alt="WF" />
                <p class="logo text"> creator </p>
            </a>

            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.topFields}>
                        <div>
                            {/* Name */}
                            <InputField
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                error={field_errors.name}
                                placeholder="name"
                                required
                                className={styles.smallField}
                                >
                                </InputField>

                                {/* Display name */}
                                <InputField
                                id="display_name"
                                name="display_name"
                                value={display_name}
                                onChange={handleDisplayNameChange}
                                error={field_errors.display_name}
                                placeholder="display_name"
                                className={styles.smallField}
                                >
                            </InputField>
                        </div>

                        {/* Description */}
                        <TextArea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        error={field_errors.description}
                        placeholder="description"
                        containerClass={styles.descriptionField}
                        >
                    </TextArea>
                    </div>

                    <div className={styles.middleFields}>
                        {/* Full description */}
                        <TextArea
                        id="full_description"
                        name="full_description"
                        value={full_description}
                        onChange={handleFullDescriptionChange}
                        error={field_errors.mod_infos.full_description}
                        placeholder="full_description"
                        containerClass={styles.fullDescriptionField}
                        >
                        </TextArea>

                    </div>

                    <Button className={styles.createButton}>
                        Publish
                    </Button>
                </form>
                

                <div className={styles.infosPanel}>

                    <img src={profile} className={styles.profilePicture}></img>
                    <p className={styles.author}>{user}</p>

                </div>
            </div>

        </>)
}

export default ModCreationPage