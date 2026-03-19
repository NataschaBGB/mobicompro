import useLocalStorage from "../../hooks/useLocalStorage";
import SmartSettingsLight from './SmartSettingsLight';
import SmartSettingsHeat from './SmartSettingsHeat';
import { light_livingroom, light_kitchen, light_driveway, heat_livingroom, heat_bedroom, heat_bathroom } from './SmartSettingData'
import './SmartSettings.sass';



export default function SmartSettings() {

    // lightSettings is an object that contains the current state of each light (on or off)
    // get the initial settings from useLocalStorage hook
    const [lightSettings, setLightSettings] = useLocalStorage("lightSettings", {});

    const [heatSettings, setHeatSettings] = useLocalStorage("heatSettings", {});

    // when user clicks on a toggle button, we want to change whether its on or not
    const toggleLight = (id) => {
        // setLightSettings updates the state
        // // ...prev makes sure the previous states stays as is
        setLightSettings(prev => ({
        ...prev,
        [id]: !prev[id]
        }));
    };

    const toggleHeat = (id) => {
        // setLightSettings updates the state
        // // ...prev makes sure the previous states stays as is
        setHeatSettings(prev => ({
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
                        {light_livingroom.map((section) => (
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
                        {light_kitchen.map((section) => (
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
                        {light_driveway.map((section) => (
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
                <div className="smart-settings__heat">

                    <article className="heat-article">
                        {heat_livingroom.map((section) => (
                            <div key={section.title} className="heat-article-box">

                                <h3 className="heat-article-box-title">{section.title}</h3>

                                {section.items.map((item) => (
                                    <SmartSettingsHeat
                                        key={item.id}
                                        label={item.label}
                                        isActive={heatSettings[item.id]}
                                        onClick={() => toggleHeat(item.id)}
                                        degrees={section.degrees}
                                        mode={section.mode}
                                        link={section.link}
                                    />
                                ))}

                            </div>
                        ))}
                    </article>

                    <article className="heat-article">
                        {heat_bedroom.map((section) => (
                            <div key={section.title} className="heat-article-box">

                                <h3 className="heat-article-box-title">{section.title}</h3>

                                {section.items.map((item) => (
                                    <SmartSettingsHeat
                                        key={item.id}
                                        label={item.label}
                                        isActive={heatSettings[item.id]}
                                        onClick={() => toggleHeat(item.id)}
                                        degrees={section.degrees}
                                        mode={section.mode}
                                        link={section.link}
                                    />
                                ))}

                            </div>
                        ))}
                    </article>

                    <article className="heat-article">
                        {heat_bathroom.map((section) => (
                            <div key={section.title} className="heat-article-box">

                                <h3 className="heat-article-box-title">{section.title}</h3>

                                {section.items.map((item) => (
                                    <SmartSettingsHeat
                                        key={item.id}
                                        label={item.label}
                                        isActive={heatSettings[item.id]}
                                        onClick={() => toggleHeat(item.id)}
                                        degrees={section.degrees}
                                        mode={section.mode}
                                        link={section.link}
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