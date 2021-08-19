import { MeetingRoom } from '@material-ui/icons';
import API from 'api';
import React from 'react'
import { RangeSlider,Toggle ,Col, TagPicker ,Grid ,Row} from 'rsuite';
import EstateList from '../EstatesList/EstatesList'

function EstatesFilter() {
    const [price, setPrice] = React.useState([0,25000]);
    const [surface, setSurface] = React.useState([0,120]);
    const [RawSurface, setRawSurface] = React.useState([0,1200]);
    const [parking, setParking] =React.useState(false);
    const [swimingPool, setSwimingPool] =React.useState(true);
    const [link,setLink] = React.useState('estatestype');
    const [async, setAsync] = React.useState('ik');
    const [estatestypes,setData] = React.useState([]);
    const [estates,setEstates] = React.useState([]);

    
    React.useEffect(function(props){
        API.get('estatestype', {
        })
            .then(function (response) {
                const {estatetype:data} = response.data;
                
                setData(data);
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        // setError("Vous n'êtes pas connecté");
                    }
                }
            });
    },[link,setLink])

    const handleChange = (price) => {
        setPrice(price);
        API.get(`estates?filter[WherePrice]=${price[0]}&filter[WhereMaxPrice]=${price[1]}`,{
        })
        .then(function (response) {
            const {estates:data} = response.data;
            setEstates({...data});
            // console.log(estates);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    // setError("Vous n'êtes pas connecté");
                }
            }
        });
        console.log(price);
    }
    
    const handleChangeSurface = (surface) => {
        setSurface(surface);
    }

    const handleChangeRawSurface = (RawSurface) => {
        setRawSurface(RawSurface);
    }

    const handleChangeParking = (parking) => {
        setParking(parking);
    }

    const handleChangeSwimingPool = (swimingPool) => {
        setSwimingPool(swimingPool);
    }

    return (
        <div>
            <Grid fluid className="show-container">
                <Row className="show-grid" justify="center">
                    <Col xs={8}>
                        <p>
                            Prix entre {price[0]}€ et {price[1]}€
                            <RangeSlider 
                                min={0}
                                max={1000000}
                                value={price}
                                onChange={(value) => handleChange(value)}
                            />
                        </p>
                    </Col>
                    <Col xs={8}>
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
                    <Col xs={8}>
                        <p>
                            Surface du terrain {RawSurface[0]}m² et {RawSurface[1]}m²
                            <RangeSlider 
                                min={0}
                                max={30000}
                                value={RawSurface}
                                onChange={(RawSurface) => handleChangeRawSurface(RawSurface)}
                            />
                        </p>
                    </Col>
                </Row>
                <Row className="show-grid marginTop-2">
                    <Col xs={4}>
                        <p>
                            <span>Parking </span>
                            <Toggle 
                                size="lg" 
                                checkedChildren="Avec" 
                                unCheckedChildren="Sans"
                                defaultChecked={parking}
                                onChange={(parking) => handleChangeParking(parking)}
                            />
                        </p>
                    </Col>
                    <Col xs={4}>
                        <p>
                            <span>Piscine </span>
                            <Toggle 
                                size="lg" 
                                checkedChildren="Avec" 
                                unCheckedChildren="Sans"
                                defaultChecked={swimingPool}
                                onChange={(swimingPool) => handleChangeSwimingPool(swimingPool)}
                            />
                        </p> 
                    </Col>
                    <Col xs={4}>
                        <p>
                            <span>Terrasse </span>
                            <Toggle 
                            size="lg" 
                            checkedChildren="Avec" 
                            unCheckedChildren="Sans"
                            defaultChecked={swimingPool}
                            onChange={(swimingPool) => handleChangeSwimingPool(swimingPool)}
                            />
                        </p> 
                    </Col>
                    <Col xs={4}>
                    <p>
                            <span>Garage </span>
                            <Toggle 
                            size="lg" 
                            checkedChildren="Avec" 
                            unCheckedChildren="Sans"
                            defaultChecked={swimingPool}
                            onChange={(swimingPool) => handleChangeSwimingPool(swimingPool)}
                            />
                        </p> 
                    </Col>
                    <Col xs={4}>
                    <p>
                            <span>Jardin </span>
                            <Toggle 
                            size="lg" 
                            checkedChildren="Avec" 
                            unCheckedChildren="Sans"
                            defaultChecked={swimingPool}
                            onChange={(swimingPool) => handleChangeSwimingPool(swimingPool)}
                            />
                        </p> 
                    </Col>
                </Row>
                <Row className="show-grid marginTop-2 marginBottom-1">
                <Col xs={6}>
                        <input 
                            name="ZipCode"
                            placeholder="Code postal"
                            type="text"
                            className="rs-input"
                        />
                    </Col>
                    <Col xs={6}>
                        <input 
                            name="numberRoom"
                            placeholder="Nombre de piéce"
                            type="number"
                            className="rs-input"
                        />
                    </Col>
                    <Col xs={6}>
                        {/* <TagPicker data={estatestypes} style={{ width: 300 }}  /> */}
                        <select className="rs-input">
                        {estatestypes.map( function(estateType){
                            return <option 
                            value={estateType.id} 
                            key={estateType.id} 
                            >{estateType.name}</option>
                        } )}
                        </select>
                    </Col>
                </Row>
            </Grid>
            {/* <EstateList estates={estates}></EstateList> */}
        </div>
    )
}

export default EstatesFilter
