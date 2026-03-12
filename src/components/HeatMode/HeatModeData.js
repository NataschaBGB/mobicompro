import { BsHandIndex } from "react-icons/bs";
import { PiClockLight } from "react-icons/pi";
import { RxRocket } from "react-icons/rx";

// Available modes: "manual", "timed", "boost" to change between
// is not placed inside the export, to prevent it from being recreated every time the component re-renders, since it is static data that doesn't change, so we only need to create it once and can reuse it every time the component re-renders
export const heatModes = [
    {
        id: "manual",
        label: "Manuel",
        icon: BsHandIndex
    },
    {
        id: "timed",
        label: "Tidsplan",
        icon: PiClockLight
    },
    {
        id: "boost",
        label: "Boost",
        icon: RxRocket
    }
];