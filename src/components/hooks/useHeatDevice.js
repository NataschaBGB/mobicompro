import { useState, useEffect, useRef } from "react";


export default function useHeatDevice(device) {
    
    // mode = current mode to show as active mode
    // setMode = function to change mode
    // useState(device.work_mode) = initial value of mode is the current work_mode of the device, so when we open the heat mode page, it shows the correct active mode based on the device's current work_mode
    const [targetTemp, setTargetTemp] = useState(() => device.target_temp);
    const [ventLevel, setVentLevel] = useState(device.vent_level);
    const [mode, setMode] = useState(device.work_mode);

    // get the bearer token to access the api
    const API_TOKEN = import.meta.env.VITE_MOBICOM_API_TOKEN;

    const isUpdating = useRef(false);

    // Sync mode hvis device.work_mode ændrer sig
    // useEffect makes sure that every time device.work_mode changes, we update our local mode state to match it, so if the device's mode is changed from somewhere else in the app, it will still show the correct active mode when we open the heat mode page
    useEffect(() => {

        if (isUpdating.current) return;

        setTargetTemp(device.target_temp);
        setVentLevel(device.vent_level);
        setMode(device.work_mode);

    }, [device]);

    // updateDevice function to change the work_mode and/or vent_level of the device, takes in the new mode/new vent level as an argument
    const updateDevice = async (newTargetTemp, newVentLevel, newMode) => {

        isUpdating.current = true;

        // save previous level and mode in case the update fails
        const previousTemp = targetTemp;
        const previousVent = ventLevel;
        const previousMode = mode;

        // set the new temp, level and mode optimistically, so the UI updates immediately when we click on a button, and if the API call fails, we can revert back to the previous level and mode
        setTargetTemp(newTargetTemp);
        setVentLevel(newVentLevel);
        setMode(newMode);

        try {

            console.log("Updating device:", {
                id: device.id,
                body: {
                    name: device.name,
                    target_temp: newTargetTemp,
                    vent_level: newVentLevel,
                    work_mode: newMode
                }
            });

            const response = await fetch(
                `https://exercise.mobicom-pro.com/api/devices/${device.id}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_TOKEN}`
                    },
                    body: JSON.stringify({
                        name: device.name,
                        target_temp: newTargetTemp,
                        vent_level: newVentLevel,
                        work_mode: newMode
                    })
                }
            );

            // if response is not ok, throw an error to be caught in the catch block
            if (!response.ok) throw new Error("Failed to update device");

        }
        catch (error) {
            // if an error has been thrown, revert back to the previous level and mode, so the UI shows the correct active mode and vent level, since the update failed and the mode and vent level in the API has not been changed
            setTargetTemp(previousTemp);
            setVentLevel(previousVent);
            setMode(previousMode);
            console.error(error);
        }
        isUpdating.current = false;
    };


    const debounceRef = useRef(null);

    const updateTargetTemp = (newTemp) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            updateDevice(newTemp, ventLevel, mode);
        }, 300);
    };

    const updateVentLevel = (newVent) => {
        if (newVent === ventLevel) return;
        updateDevice(targetTemp, newVent, mode);
    };

    // functions to call when we click on a mode button or vent level button
    // takes in the new mode/new vent level as an argument, and calls updateDevice with the new mode/new vent level to update it in the API
    const updateMode = (newMode) => {
        // if the newMode/the clicked button's mode is the same as the current active mode, we don't need to do anything, so we return early and don't call updateDevice, to avoid making an unnecessary API call and updating the state to the same value, which would cause a re-render without any actual change
        if (newMode === mode) return;
        // if the newMode is different from the current mode, we call updateDevice with the new mode and the current vent level, since we only want to update the mode in this case, and keep the vent level the same, so we pass in the current vent level as the second argument to updateDevice, to avoid changing the vent level when we only want to change the mode
        updateDevice(targetTemp, ventLevel, newMode);
    };

    // return mode, ventLevel, updateMode and updateVentLevel to use in HeatMode.jsx
    return {
        targetTemp,
        ventLevel,
        mode,
        updateTargetTemp,
        updateVentLevel,
        updateMode
    };

}