import './PresetSetting.sass';


export default function PresetSetting({ label, Icon, isActive, onClick }) {

    /*
    Denne komponent modtager information fra sin "forælder".

    label → teksten der vises
    Icon → hvilket ikon der vises
    isActive → om preset er aktiv eller ej
    onClick → hvad der skal ske når man klikker
    */

    return (
        <div
            /*
            Her bestemmer vi hvilken CSS class elementet skal have.

            Hvis preset er aktiv:
            setting setting--active

            Hvis den ikke er aktiv:
            setting
            */
            className={`setting ${isActive ? "setting--active" : ""}`}

            /*
            Når brugeren klikker,
            kaldes den funktion der blev sendt ind via props.
            */
            onClick={onClick}
        >
            {/* Viser ikonet */}
            <Icon className="icon" />

            {/* Viser teksten */}
            <p>{label}</p>
        </div>
    );

}