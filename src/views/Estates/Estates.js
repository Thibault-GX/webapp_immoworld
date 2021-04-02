import React from 'react'
import '../../views/Estates/Estates.css';
import EstatesList from '../../components/Estate/EstatesList/EstatesList'
function Estates() {
    return (
        <div className="EstateList">
            <h1>Liste des bien</h1>
            <EstatesList></EstatesList>
        </div>
    )
}

export default Estates
