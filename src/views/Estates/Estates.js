import React from 'react'
import '../../views/Estates/Estates.css';
import EstatesList from '../../components/Estate/EstatesList/EstatesList';
import Estate from '../../components/Estate/Estate';
import { Button, Col,Grid ,Row} from 'rsuite';
import API from 'api';
import AddEstate from './../../components/Estate/AddEstate/AddEstate'

import AvatarGeneration from 'components/Avatar/Avatar';


function Estates() {
    const [async, setAsync] = React.useState(false);
    const [estates,setEstates] = React.useState([]);
    const [estatestypes,setData] = React.useState([]);
    const [formValues,setFormValues] = React.useState({
        parking : false,
        swimingPool : false,
        terrases: false,
        garage : false,
        garden : false,
        basement:false,
        price: 200000,
        RawSurface : 1200,
        surface : 120
    })

    React.useEffect(function(){
        API.get('estates', {
        })
            .then(function (response) {
                const {estates:data} = response.data;
                setEstates(data);
                setAsync(true);
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        // setError("Vous n'êtes pas connecté");
                    }
                }
            });
    },[async,setAsync]);
    
    React.useEffect(function(){
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
    },[])

    const handleChangeFilter = (e) => {
        if (e.target.type == "range") {
            formValues[e.target.id] = e.target.value;
            setFormValues({...formValues});
        }else{
            formValues[e.target.id] = e.target.checked;
            setFormValues({...formValues});
        }
        API.get(`estates?filter[WherePrice]=${0}&filter[WhereMaxPrice]=${formValues.price}&filter[WhereLivingSurfaceMin]=${0}&filter[WhereLivingSurfaceMax]=${formValues.surface}&filter[Garden]=${formValues.garden}&filter[Garage]=${formValues.garage}&filter[Terrace]=${formValues.terrases}&filter[Swimmingpool]=${formValues.swimingPool}&filter[Parking]=${formValues.parking}&filter[Basement]=${formValues.basement}`,{
        })
        .then(function (response) {
            const {estates:data} = response.data;
            setEstates(data);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    // setError("Vous n'êtes pas connecté");
                }
            }
        });
    }

    const [showFilter, setShowFilter] = React.useState(false);
    const [screen, setScreen] = React.useState({
        x : window.screen.width,
        y : window.screen.height
    })
    const [change,setChange] = React.useState(false);

    React.useEffect(function() {
        window.addEventListener('resize', function(){
            setScreen({ x : window.screen.width, y : window.screen.height});
        });
    },[change,setChange])

const show = () =>{
    showFilter ? setShowFilter(false) : setShowFilter(true)
}

    return (
        <div className="EstateList">
            <h1 className="light-title">Liste des biens</h1>
            <Grid fluid className="show-container">
                <Row className="show-grid" justify="center">
                    <Col xs={screen.x > 415 ? 8 : 24}>
                        <p>
                            Prix entre 0€ et {formValues.price}€
                            <input
                                min={0}
                                max={1000000}
                                className="rs-slider-bar rs-input"
                                style={{width: '100%'}}
                                type="range"
                                id="price"
                                value={formValues.price}
                                onChange={(e) => handleChangeFilter(e)}
                            />
                        </p>
                    </Col>
                    <Col xs={screen.x > 415 ? 8 : 24}>
                        <p>
                            Surface habitable 0m² et {formValues.surface}m²
                            <input
                                min={0}
                                max={1200}
                                className="rs-slider-bar rs-input"
                                style={{width: '100%'}}
                                type="range"
                                id="surface"
                                value={formValues.surface}
                                onChange={(e) => handleChangeFilter(e)}
                            />
                        </p>
                    </Col>
                    <Col xs={screen.x > 415 ? 8 : 24}>
                        <p>
                            Surface du terrain 0m² et {formValues.RawSurface}m²
                            <input
                                min={0}
                                max={30000}
                                className="rs-slider-bar rs-input"
                                style={{width: '100%'}}
                                type="range"
                                id="RawSurface"
                                value={formValues.RawSurface}
                                onChange={(e) => handleChangeFilter(e)}
                            />
                        </p>
                    </Col>
                </Row>
                {screen.x < 750 ? 
                <Button 
                    onClick={(e) => show()}
                    style={{borderRadius:'25px',boxShadow:'0px 0px 11px -3px black',color:'blue', marginTop : '2%', marginBottom : '1%'}}
                    > { showFilter ? 'Moin de filtres' : 'Plus de filtres'}
                </Button> : ""}
                <div 
                    style={{display: 
                        (showFilter || screen.x > 750 )? 'block' : 'none'
                    }}
                >
                    <Row className="show-grid marginTop-2" style={{flexWrap:"wrap"}}>
                        <Col sm={4} xs={8} className="marginTop-2">
                            <p>
                                <span>Parking </span>
                                <input 
                                    type="checkbox" 
                                    id="parking"
                                    name="parking"
                                    defaultChecked={formValues.parking}
                                    onChange={(e) => handleChangeFilter(e)}
                                />
                            </p>
                        </Col>
                        <Col sm={4} xs={8} className="marginTop-2">
                            <p>
                                <span>Piscine </span>
                                <input 
                                    type="checkbox" 
                                    id="swimingPool"
                                    name="swimingPool"
                                    defaultChecked={formValues.swimingPool}
                                    onChange={(e) => handleChangeFilter(e)}
                                />
                            </p> 
                        </Col>
                        <Col sm={4} xs={8} className="marginTop-2">
                            <p>
                                <span>Terrasse </span>
                                <input 
                                    type="checkbox" 
                                    id="terrases"
                                    name="terrases"
                                    defaultChecked={formValues.terrases}
                                    onChange={(e) => handleChangeFilter(e)}
                                />
                            </p> 
                        </Col>
                        <Col sm={4} xs={8} className="marginTop-2">
                        <p>
                                <span>Garage </span>
                                <input 
                                    type="checkbox" 
                                    id="garage"
                                    name="garage"
                                    defaultChecked={formValues.garage}
                                    onChange={(e) => handleChangeFilter(e)}
                                />
                            </p> 
                        </Col>
                        <Col sm={4} xs={8} className="marginTop-2">
                            <p>
                                <span>Jardin </span>
                                <input 
                                    className=""
                                    type="checkbox" 
                                    id="garden"
                                    name="garden"
                                    defaultChecked={formValues.garden}
                                    onChange={(e) => handleChangeFilter(e)}
                                />
                            </p> 
                        </Col>
                        <Col sm={4} xs={8} className="marginTop-2">
                            <p>
                                <span>Sous-sol </span>
                                <input 
                                    className=""
                                    type="checkbox" 
                                    id="basement"
                                    name="garden"
                                    defaultChecked={formValues.basement}
                                    onChange={(e) => handleChangeFilter(e)}
                                />
                            </p> 
                        </Col>
                    </Row>
                    <Row className="show-grid marginTop-2 marginBottom-1 wrap" style={{flexWrap:"wrap"}}>
                        <Col sm={6} xs={24} className="marginTop-2">
                            <input 
                                name="ZipCode"
                                placeholder="Code postal"
                                type="text"
                                className="rs-input"
                            />
                        </Col>
                        <Col sm={6} xs={24} className="marginTop-2" >
                            <input 
                                name="bedRoom"
                                placeholder="Nombre de chambre"
                                type="number"
                                className="rs-input"
                            />
                        </Col>
                        <Col sm={6} xs={24} className="marginTop-2" >
                            <input 
                                name="numberRoom"
                                placeholder="Nombre de salle de bain"
                                type="number"
                                className="rs-input"
                            />
                        </Col>
                        <Col sm={6} xs={24} className="marginTop-2" >
                            <select className="rs-input">
                            <option>Type de biens</option>
                            {estatestypes.map( function(estateType){
                                return <option 
                                value={estateType.id} 
                                key={estateType.id} 
                                >{estateType.name}</option>
                            } )}
                            </select>
                        </Col>
                    </Row>
                </div>
            </Grid>
            <EstatesList>
                {estates.map((estate, i) => {
                    return(<Estate estate={estate} key={i}></Estate>)
                })}
            </EstatesList>
            <AddEstate/>
        </div>
    )
}

export default Estates
