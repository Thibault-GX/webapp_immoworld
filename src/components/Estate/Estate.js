import React from 'react'
import '../../components/Estate/Estate.css'
import { Panel } from 'rsuite';

function Estate({estate}) {
    // console.log(estate);
    return (
        <div className="show-grid EstatesCard">
            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 300 }}>
                <img src="https://via.placeholder.com/240x240" alt="" height="300" />
                <Panel header={estate.label}>
                <p>
                    <p>Surface au sol : {estate.rawSurface} m²</p>
                    <p>Surface habitable : {estate.livingSurface} m²</p>
                    <p>Parking : {estate.parking ? "Oui" : "Non"}</p>
                    <p>Piscine : {estate.swimmingpool ? "Oui" : "Non"}</p>
                    <p>Terrasse : {estate.terrace ? "Oui" : "Non"}</p>
                    <p>Garage  : {estate.garage ? "Oui" : "Non"}</p>
                    <p>Jardin : {estate.garden ? "Oui" : "Non"}</p>
                    <p>Sous-sol : {estate.basement ? "Oui" : "Non"}</p>
                    <p>Prix : {estate.price} €</p>
                    <p>Code postal : {estate.zipCode}</p>
                    <button className="EstateButton">Voir le bien</button>
                </p>
                </Panel>
            </Panel>
        </div>
    )
}

export default Estate
