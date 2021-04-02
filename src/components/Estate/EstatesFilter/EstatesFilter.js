import api from 'api';
import React from 'react'
import { RangeSlider,Toggle ,Col, TagPicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

function EstatesFilter() {
    const [price, setPrice] = React.useState([0,25000]);
    const [surface, setSurface] = React.useState([0,1200]);
    const [parking, setParking] =React.useState(false);
    const [swimingPool, setSwimingPool] =React.useState(true);
    let data = []


    const handleChange = (price) => {
        setPrice(price);
    }

    const handleChangeSurface = (surface) => {
        setSurface(surface);
    }

    const handleChangeParking = (parking) => {
        setParking(parking);
        console.log(parking);
    }

    const handleChangeSwimingPool = (swimingPool) => {
        setSwimingPool(swimingPool);
        console.log(swimingPool);
    }



    
    return (
        <div>
            <div className="show-grid">
                <Col md={12}>
                    <p>
                        Prix entre {price[0]}€ et {price[1]}€
                        <RangeSlider 
                            min={0}
                            max={100000}
                            value={price}
                            onChange={(value) => handleChange(value)}
                        />
                    </p>
                    </Col>
                    <Col md={12}>
                    <p>
                        Surface habitable {surface[0]}m² et {surface[1]}m²
                        <RangeSlider 
                            min={0}
                            max={1200}
                            value={surface}
                            onChange={(surface) => handleChangeSurface(surface)}
                        />
                    </p>
                </Col>
            </div>
            <div className="show-grid border">
                <Col md={2}>
                    <p>
                        Parking 
                        <Toggle 
                        size="lg" 
                        checkedChildren="Avec" 
                        unCheckedChildren="Sans"
                        defaultChecked={parking}
                        onChange={(parking) => handleChangeParking(parking)}
                        />
                    </p>
                </Col>
                <Col md={2}>
                    <p>
                        Piscine 
                        <Toggle 
                        size="lg" 
                        checkedChildren="Avec" 
                        unCheckedChildren="Sans"
                        defaultChecked={swimingPool}
                        onChange={(swimingPool) => handleChangeSwimingPool(swimingPool)}
                        />
                    </p> 
                </Col>
                <Col  md={2}>
                    <TagPicker data={data} style={{ width: 300 }}  />
                </Col>
            </div>
        </div>
    )
}

export default EstatesFilter
