import React from 'react'
import '../../components/Estate/Estate.css'
import Logo from '../../assets/img/examples/clem-onojegaw.jpg'
import { Panel} from 'rsuite';

function Estate({estate}) {
    // console.log(estate);
    return (
        <div className="show-grid EstatesCard">
            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 250 }}>
                <img src="https://via.placeholder.com/240x240" height="250" />
                <Panel header={estate.label}>
                <p>
                    <p>Surface au sol : {estate.rawSurface} m²</p>
                    <p>Surface habitable : {estate.livingSurface} m²</p>
                    {/* <p>Date de construction : {estate.constructionDate}</p> */}
                    <p>Prix : {estate.price} €</p>
                    <button className="EstateButton">Voir le bien</button>
                </p>
                </Panel>
            </Panel>
        </div>
    )
}

export default Estate
