import React from 'react'
import '../../views/Estates/Estates.css';
import EstatesList from '../../components/Estate/EstatesList/EstatesList';
import EstatesFilter from'../../components/Estate/EstatesFilter/EstatesFilter';
function Estates() {
    return (
        <div className="EstateList">
            <h1>Liste des bien</h1>
            <EstatesFilter></EstatesFilter>
            <EstatesList></EstatesList>
        </div>
    )
}

export default Estates
