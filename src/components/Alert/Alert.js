import React from "react";
import './Alert.css'

export default function Alert(props) {
    const {message,impact} = props;

    return (
        <div className={`Alert ${impact}`}>
            <p>{message}</p>
        </div>
    );
}
