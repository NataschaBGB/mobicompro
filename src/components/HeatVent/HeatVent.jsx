import './HeatVent.sass';


export default function HeatVent({ device }) {
    
    return (
    
        <section className="heat__vent">
            <h2>Ventilator</h2>
            <div className="vent-strength">
                vent icon
                <div className="vent-strength-value">
                    {/* if vent level = 0
                        no boxes have color
                    if vent level = 3
                        3 first boxes have color
                    on click on a box (click on box 2)
                        set vent level to 2 in api */}
                </div>
            </div>
        </section>

    );

}