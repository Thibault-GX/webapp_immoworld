import React from 'react'
import '../../components/Estate/Estate.css'
import Logo from '../../assets/img/examples/clem-onojegaw.jpg'
import { Panel} from 'rsuite';

function Estate({estates}) {
    return (
        <div className="show-grid EstatesCard">
            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                <img src="https://via.placeholder.com/240x240" height="240" />
                <Panel header="Maison de campagne">
                <p>
                    <p>terrain constructible</p>
                    <p>rawSurface 1200</p>
                    <p>livingSurface 0</p>
                    <p>constructionDate "1980-02-12"</p>
                    <p>price 80000</p>
                    <p>parking 0</p>
                    <button className="EstateButton">Voir le bien</button>
                </p>
                </Panel>
            </Panel>
        </div>
    )
}

export default Estate
