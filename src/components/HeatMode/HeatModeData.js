import { BsHandIndex } from "react-icons/bs";
import { PiClockLight } from "react-icons/pi";
import { RxRocket } from "react-icons/rx";

// Available modes: "manual", "timed", "boost" to change between
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