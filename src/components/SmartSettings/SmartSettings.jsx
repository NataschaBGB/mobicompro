// import { useLoaderData } from 'react-router';
import useLocalStorage from "../hooks/useLocalStorage";
import SmartSettingsLight from './SmartSettingsLight';
import { livingRoomLight, kitchenLight } from './SmartSettingData'
import './SmartSettings.sass';



export default function SmartSettings() {

    // lightSettings is an object that contains the current state of each light (on or off)
    // get the initial settings from useLocalStorage hook
    const [lightSettings, setLightSettings] = useLocalStorage("lightSettings", {});

    // when user clicks on a toggle button, we want to change whether its on or not
    const toggleLight = (id) => {
        // setLightSettings updates the state
        // // ...prev makes sure the previous states stays as is
        setLightSettings(prev => ({
        ...prev,
        [id]: !prev[id]
        }));
    };

    return (
        <section className="smart-settings">
            <h2 className="smart-settings__title">Smart Indstillinger</h2>

            <section className="smart-settings__settings">
                
                {/* div to contain all light components */}
                <div className="smart-settings__light">

                    {/* article to contain a single light component */}
                    <article className="light-article">
                        {/* loop through livingRoomLight object in SmartSettingData.js */}
                        {livingRoomLight.map((section) => (
                            <div key={section.title} className="light-article-box">

                                <h3 className="light-article-box-title">{section.title}</h3>

                                {section.items.map((item) => (
                                    <SmartSettingsLight
                                        key={item.id}
                                        label={item.label}
                                        isActive={lightSettings[item.id]}
                                        onClick={() => toggleLight(item.id)}
                                    />
                                ))}

                            </div>
                        ))}
                    </article>

                    <article className="light-article">
                        {/* loop through kitchenLight object in SmartSettingData.js */}
                        {kitchenLight.map((section) => (
                            <div key={section.title} className="light-article-box">

                                <h3 className="light-article-box-title">{section.title}</h3>

                                {section.items.map((item) => (
                                    <SmartSettingsLight
                                        key={item.id}
                                        label={item.label}
                                        isActive={lightSettings[item.id]}
                                        onClick={() => toggleLight(item.id)}
                                    />
                                ))}

                            </div>
                        ))}
                    </article>

                    <article className="light-article">
                        {kitchenLight.map((section) => (
                            <div key={section.title} className="light-article-box">

                                <h3 className="light-article-box-title">{section.title}</h3>

                                {section.items.map((item) => (
                                    <SmartSettingsLight
                                        key={item.id}
                                        label={item.label}
                                        isActive={lightSettings[item.id]}
                                        onClick={() => toggleLight(item.id)}
                                    />
                                ))}

                            </div>
                        ))}
                    </article>

                </div>

                {/* div to contain all heat components */}
                {/* OBS - Is temporarily filled with light components for styling purposes */}
                <div className="smart-settings__heat">

                    <article className="light-article">
                        {kitchenLight.map((section) => (
                            <div key={section.title} className="light-article-box">

                                <h3 className="light-article-box-title">{section.title}</h3>

                                {section.items.map((item) => (
                                    <SmartSettingsLight
                                        key={item.id}
                                        label={item.label}
                                        isActive={lightSettings[item.id]}
                                        onClick={() => toggleLight(item.id)}
                                    />
                                ))}

                            </div>
                        ))}
                    </article>

                    <article className="light-article">
                        {kitchenLight.map((section) => (
                            <div key={section.title} className="light-article-box">

                                <h3 className="light-article-box-title">{section.title}</h3>

                                {section.items.map((item) => (
                                    <SmartSettingsLight
                                        key={item.id}
                                        label={item.label}
                                        isActive={lightSettings[item.id]}
                                        onClick={() => toggleLight(item.id)}
                                    />
                                ))}

                            </div>
                        ))}
                    </article>

                </div>
            </section>
        </section>
    );

}