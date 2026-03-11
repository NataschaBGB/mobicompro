// This data is used in one of the sections/boxes in SmartSettings.jsx.
// It contains the title of the section and the items that should be shown in that section.
// Each item has an id and a label. The id is used to keep track of the state of each item (whether it's on or off) and the label is what is shown to the user.

export const livingRoomLight = [
    
    {
        title: "Lys i Stuen",
        items: [
            { 
                id: "allLights",
                label: "Alt Lys"
            },
            { 
                id: "livingRoomCeilingLight",
                label: "Loftlampe"
            },
            {
                id: "tableLamp1",
                label: "Bordlampe 1"
            },
            {
                id: "tableLamp2",
                label: "Bordlampe 2"
            },
        ]
    }

];

// If we want to add a section with more than one title, we can do it like this:
export const kitchenLight = [
    {
        title: "Lys i Køkken",
        items: [
            {
                id: "kitchenTable",
                label: "Køkkenbord"
            },
            {
                id: "kitchenCeilingLight",
                label: "Loftlampe"
            }
        ]
    },
    {
        title: "Varme i Køkken",
        items: [
            {
                id: "kitcenFanCoil",
                label: "Fan Coil"
            }
        ]
    }
]