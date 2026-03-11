import './SmartSettingsLight.sass';


export default function SmartSettingsLight ({ label, isActive, onClick }) {
    
    return (
        
        <section className="smart-settings-light">
            <label className="smart-settings-light__label">{label}</label>
            <button
                className={`toggle-area ${isActive ? "toggle-area--on" : ""}`}
                onClick={onClick}
            >
                <span className="toggle-area__circle"></span>
            </button>
        </section>
    );

}