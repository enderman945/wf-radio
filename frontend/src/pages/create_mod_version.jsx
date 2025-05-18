// Preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

// Functions
import { createModVersion } from '../services/mods';

// Components
import InputField from '../components/Fields/input_field'
import TextArea from '../components/Fields/text_area'

// Images
import logo from '../assets/logo.png'
import profile from '../assets/profile.svg'

// Styles
import styles from '../styles/version_creation.module.css'
import Button from '../components/Buttons/button';

function ModVersionCreationPage({name}) {
    //TODO add missing fields

    const null_fields = {
        version_number: null,
        channel: null,
        changelog: null,
        game_version: null,
        platform: null,
        environment: null,
        url: null
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

    const [version_number, setVersionNumber] = useState('');
    const [channel, setChannel] = useState('');
    const [game_version, setGameVersion] = useState('');
    const [platform, setPlatform] = useState('');
    const [environment, setEnvironment] = useState('');
    const [changelog, setChangelog] = useState('');
    const [version_url, setVersionUrl] = useState('');

    const [publish_status, setPublishStatus] = useState(null);
    const [field_errors, setFieldErrors] = useState(null_fields);


    // Handle fields changes

    const handleVersionNumberChange = (event) => {
        setVersionNumber(event.target.value);
        // Reset error
        setFieldErrors(prevErrors => ({ ...prevErrors, version_number: null }));
    };
    const handleChannelChange = (event) => {
        setChannel(event.target.value);
        setFieldErrors(prevErrors => ({ ...prevErrors, channel: null }));
    };
    const handleGameVersionChange = (event) => {
        setGameVersion(event.target.value);
        setFieldErrors(prevErrors => ({ ...prevErrors, game_version: null }));
    };
    const handlePlatformChange = (event) => {
        setPlatform(event.target.value);
        console.debug(event.target.value);
        setFieldErrors(prevErrors => ({ ...prevErrors, platform: null }));
    };
    const handleEnvironmentChange = (event) => {
        setEnvironment(event.target.value);
        console.debug(event.target.value);
        setFieldErrors(prevErrors => ({ ...prevErrors, environment: null }));
    };
    const handleChangelogChange = (event) => {
        setChangelog(event.target.value);
        console.debug(event.target.value);
        setFieldErrors(prevErrors => ({ ...prevErrors, changelog: null }));
    };
    const handleVersionUrlChange = (event) => {
        setVersionUrl(event.target.value);
        console.debug(event.target.value);
        setFieldErrors(prevErrors => ({ ...prevErrors, version_url: null }));
    };

    // Submission

    const handleSubmit = async (event) => {
            event.preventDefault();
            setFieldErrors(null_fields);
    
            setPublishStatus('publishing');
    
            try {
                // Gather data                
                const version_data = {
                    version_number: version_number,
                    channel: channel,
                    changelog: changelog,
                    game_version: changelog,
                    platform: changelog,
                    environment: changelog,
                    url: version_url
                }

                // Query
                const response = await createModVersion(name, version_data);
                
                // On success
                console.debug('Published successfully:', response);
                setPublishStatus('success');
                window.location.replace("/mods/" + name + "/versions"); //TODO no page reloading
    
            } catch (error) {
    
                console.error('Creation failed:', error);
                setPublishStatus('error');
    
                //TODO handle different codes differently
                setFieldErrors({
                    version_number: ' ',
                    channel: ' ',
                    changelog: ' ',
                    game_version: ' ',
                    platform: ' ',
                    environment: ' ',
                    version_url: ' '
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
                        {/* Version number */}
                        <InputField
                            id="version_number"
                            name="version_number"
                            value={version_number}
                            onChange={handleVersionNumberChange}
                            error={field_errors.version_number}
                            placeholder="version_number"
                            required
                            className={styles.smallField}
                            >
                            </InputField>

                        {/* Channel */}
                        <InputField
                            id="channel"
                            name="channel"
                            value={channel}
                            onChange={handleChannelChange}
                            error={field_errors.channel}
                            placeholder="channel"
                            className={styles.smallField}
                            >
                            </InputField>
                        
                    </div>
                    <div className={styles.middleFields}>
                        {/* Game version */}
                        <InputField
                            id="game_version"
                            name="game_version"
                            value={game_version}
                            onChange={handleGameVersionChange}
                            error={field_errors.game_version}
                            placeholder="game_version"
                            className={styles.smallField}
                            >
                            </InputField>

                        {/* Platform */}
                        <InputField
                            id="platform"
                            name="platform"
                            value={platform}
                            onChange={handlePlatformChange}
                            error={field_errors.platform}
                            placeholder="platform"
                            className={styles.smallField}
                            >
                            </InputField>

                        {/* Environment */}
                        <InputField
                            id="environment"
                            name="environment"
                            value={environment}
                            onChange={handleEnvironmentChange}
                            error={field_errors.environment}
                            placeholder="environment"
                            className={styles.smallField}
                            >
                            </InputField>

                    </div>

                    <div className={styles.bottomFields}>
                        {/* Full description */}
                        <TextArea
                        id="changelog"
                        name="changelog"
                        value={changelog}
                        onChange={handleChangelogChange}
                        error={field_errors.changelog}
                        placeholder="changelog"
                        containerClass={styles.changelogField}
                        >
                        </TextArea>
                    </div>

                    <div className={styles.bottomBottomFields}>

                        {/* Version url */}
                        <InputField
                            id="version_url"
                            name="version_url"
                            value={version_url}
                            onChange={handleVersionUrlChange}
                            error={field_errors.version_url}
                            placeholder="version_url"
                            className={styles.smallField}
                            >
                            </InputField>

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

export default ModVersionCreationPage