import { useState, useEffect } from "react";
import PresetSetting from "./PresetSetting";
import { PresetData } from "./PresetData";
import './Preset.sass'


export default function Preset() {

    // useState is used to save data in the component.
    // in this we save which presets are active.
    // Example on how data in activeSettings looks like:
    // {
    //     home: true,
    //     away: false,
    //     sleep: true
    // }
    const [activeSettings, setActiveSettings] = useState(() => {

        // check localStorage to see if there are saved settings
        const saved = localStorage.getItem("presetSettings");

        // if there is saved data:
        // convert it from text to a JavaScript object, so we can map through it to show the presets as active or not.
        // if there is no saved data:
        // start with an empty object
        return saved ? JSON.parse(saved) : {};
    });


    // when user clicks on a preset, we want to change whether it's active or not.
    const toggleActive = (id) => {

        // setActiveSettings updates the state
        setActiveSettings(prev => ({
            // ...prev keeps all previous values, so if we change "home" to true, we still keep the value of "away" and "sleep"
            ...prev,

            // [id] uses the value of id (home, away, sleep)
            // prev[id] gets the current value of that preset (true or false)
            // ! sets the value to the opposite of what that preset was
            // home = true, so change it to home = false
            [id]: !prev[id]
        }));
    };


    // useEffect runs automatically every time activeSettings changes
    useEffect(() => {

        // when the user clicks a preset, save the new value(s) in localStorage
        localStorage.setItem(
            "presetSettings",
            JSON.stringify(activeSettings)
        );

        // set activeSettings in localStorage to the value of activeSettings in this component, but convert it to text first, because localStorage can only save text.
    }, [activeSettings]);


    return (
        <section className="preset">

            <h2 className="preset__title">Forudindstillet</h2>

            <section className="preset__settings">

                {/* map through PresetData object in PresetData.js file */}
                {PresetData.map((setting) => {

                    return (
                        // add PresetSetting component made in PresetSetting.jsx file
                        <PresetSetting
                            // set key to id (home, away, sleep)
                            key={setting.id}

                            // setting text from .js
                            label={setting.label}

                            // setting icon from .js
                            Icon={setting.icon}

                            // activeSettings[setting.id] gets the value of that preset (true or false)
                            isActive={activeSettings[setting.id]}

                            // When clicking on a preset - > call the toggleActive function and send the id of that preset (home, away, sleep)
                            onClick={() => toggleActive(setting.id)}
                        />
                    );

                })}

            </section>

        </section>
    );

}