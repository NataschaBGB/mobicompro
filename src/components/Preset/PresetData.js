// import icons from react-icons to show different icons for each preset
import { BsHouseCheck, BsHouseSlash } from "react-icons/bs";
import { GiNightSleep } from "react-icons/gi";


// List of presets that we want to show in the app
// if we want to add more presets, we just need to add more objects to this list
export const PresetData = [
    {
        id: "home",
        label: "Hjemme",
        icon: BsHouseCheck
    },
    {
        id: "away",
        label: "Ude",
        icon: BsHouseSlash
    },
    {
        id: "sleep",
        label: "Sover",
        icon: GiNightSleep
    }
];