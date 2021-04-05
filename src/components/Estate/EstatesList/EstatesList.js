import React from 'react'
import Estate from '../Estate'
import '../../Estate/EstatesList/EstatesList.css'
import { Children } from 'react';

function EstatesList({children}) {
    return (
        <div className="EstatesList">
            {children}
        </div>
    )
}

export default EstatesList
