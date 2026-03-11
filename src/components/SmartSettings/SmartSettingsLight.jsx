import './SmartSettingsLight.sass';


export default function SmartSettingsLight ({ label, isActive, onClick }) {
    
    return (
        
        <label className="smart-settings-light-label">
            {label}
            <button
                className={`toggle-area ${isActive ? "toggle-area--on" : ""}`}
                onClick={onClick}
            >
                <span className="toggle-area__circle"></span>
            </button>
        </label>
    
    );

}