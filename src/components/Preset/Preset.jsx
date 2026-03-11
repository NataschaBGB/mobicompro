import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PresetSetting from "./PresetSetting";
import { PresetData } from "./PresetData";
import './Preset.sass'



export default function Preset() {

    // activeSettings is an object that contains the current state of each preset (home, away, sleep)
    // setActiveSettings is the function to change the state of each preset
    // useLocalStorage is a custom hook that we made to save the state in local storage, so when user refreshes the page, they don't lose their settings
    const [activeSettings, setActiveSettings] = useLocalStorage("presetSettings", {});

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