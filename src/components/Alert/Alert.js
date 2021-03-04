import React from "react";
import './Alert.css'

export default function Alert(props) {
    const {error} = props;
    return (
        <div className="Alert">
            <p>{error}</p>
        </div>
    );
}
