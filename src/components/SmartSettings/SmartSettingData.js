// This data is used in one of the sections/boxes in SmartSettings.jsx.
// It contains the title of the section and the items that should be shown in that section.
// Each item has an id and a label. The id is used to keep track of the state of each item (whether it's on or off) and the label is what is shown to the user.


export const light_livingroom = [
    
    {
        title: "Lys i Stuen",
        items: [
            { 
                id: "light_livingroom_allLights",
                label: "Alt Lys"
            },
            { 
                id: "light_livingroom_ceilingLight",
                label: "Loftlampe"
            },
            {
                id: "light_livingroom_tableLamp1",
                label: "Bordlampe 1"
            },
            {
                id: "light_livingroom_tableLamp2",
                label: "Bordlampe 2"
            },
        ]
    }

];

// If we want to add a section with more than one title, we can do it like this:
export const light_kitchen = [
    {
        title: "Lys i Køkken",
        items: [
            {
                id: "light_kitchen_table",
                label: "Køkkenbord"
            },
            {
                id: "light_kitchen_ceilingLight",
                label: "Loftlampe"
            }
        ]
    },
    {
        title: "Varme i Køkken",
        items: [
            {
                id: "heat_kitchen_fanCoil",
                label: "Fan Coil"
            }
        ]
    }
]

export const light_driveway = [
    {
        title: "Lys i Indkørsel",
        items: [
            {
                id: "light_driveway_wallLamps",
                label: "Væglamper"
            },
            {
                id: "light_driveway_Bedlamps",
                label: "Bedlamper"
            }
        ]
    },
    {
        title: "Lys i Garage",
        items: [
            {
                id: "light_garage_allLight",
                label: "Alt lys"
            }
        ]
    }
]




export const heat_livingroom = [
    {
        title: "Varme i Stuen",
        items: [
            {
                id: "heat_livingroom_fan_coil",
                label: "Fan Coil"
            },
        ],
        degrees: 22,
        mode: "Manuel",
        link: "/heat",
    }
]

export const heat_bedroom = [
    {
        title: "Varme i Soveværelse",
        items: [
            {
                id: "heat_bedroom_radiator",
                label: "Radiator"
            },
        ],
        degrees: 17,
        mode: "Tidsplan",
        link: "/",
    }
]

export const heat_bathroom = [
    {
        title: "Varme i Badeværelse",
        items: [
            {
                id: "heat_bathroom_floor",
                label: "Gulvvarme"
            },
        ],
        degrees: 21,
        mode: "Tidsplan",
        link: "/",
    }
]