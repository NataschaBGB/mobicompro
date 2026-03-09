// Vi importerer de ikoner vi vil bruge til vores presets
import { BsHouseCheck, BsHouseSlash } from "react-icons/bs";
import { GiNightSleep } from "react-icons/gi";

/*
Denne liste indeholder alle de presets som appen skal vise.

Hver preset består af:
- id → et unikt navn som koden bruger
- label → den tekst brugeren ser
- icon → hvilket ikon der vises

Fordelen ved at samle dem her er,
at vi kun skal ændre ét sted hvis vi vil
tilføje eller ændre en preset.
*/

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