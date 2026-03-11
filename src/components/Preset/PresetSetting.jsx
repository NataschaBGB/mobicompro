import './PresetSetting.sass';


// This component is a 'box' that shows the preset (home, away, sleep) and whether it's active or not. When you click on it, it changes whether it's active or not.
export default function PresetSetting({ label, Icon, isActive, onClick }) {

    // it returns a div with the class "setting".
    // If the preset is active, it also adds the class "setting--active".
    // When you click on it, it calls the onClick function that was sent in via props.
    return (
        <div
            // it can see if preset is active from props, which gets its value from the Preset.jsx file, where we send isActice={activeSettings[setting.id]}
            className={`setting ${isActive ? "setting--active" : ""}`}

            // when clicking, the function in Preset.jsx gets send in via props
            onClick={onClick}
        >
            <Icon className="icon" />

            <p>{label}</p>
        </div>
    );

}