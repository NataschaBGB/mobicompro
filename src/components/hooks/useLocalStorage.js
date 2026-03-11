import { useState, useEffect } from "react";


// function to save state in local storage, so when user refreshes the page, they don't lose their settings
export default function useLocalStorage(key, initialValue) {

    // value is the current value of that setting, setValue is the function to change that value
    const [value, setValue] = useState(() => {
        // get the value from local storage
        // key is the name of the setting, for example "lightSettings" or "presetSettings"
        const stored = localStorage.getItem(key);
        // if there is a value in local storage, parse it and return it, otherwise return the initial value
        // the initial value is set in the component where we use this hook, so for example in SmartSettings.jsx, we set the default value of lightSettings to an empty object, so if there is no value in local storage, lightSettings will be an empty object
        return stored ? JSON.parse(stored) : initialValue;
    });

    // useEffect runs every time the value or key changes, so every time we change a setting, we want to save the new value in local storage
    useEffect(() => {
        // save the new value in localStorage and use the key to identify which setting we are saving, for example "lightSettings" or "presetSettings"
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // return the states, so when we use this hook in a component, we can get the current value of that setting and the function to change that value
    return [value, setValue];

}