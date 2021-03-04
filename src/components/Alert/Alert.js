import React from "react";
import './Alert.css'

export default function Alert(props) {
    const {error,impact} = props;

    return (
        <div className={`Alert ${impact}`}>
            <p>{error}</p>
        </div>
    );
}
