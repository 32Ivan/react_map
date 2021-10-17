import React from 'react'
import Button from '../component/Button'

function Kraj(props) {
    return (
        <div>
            <h1>Vaša prijava je uspješno poslana</h1>
            <Button onClick={props.closeModalHandler}>Zatvori</Button>
        </div>
    )
}

export default Kraj
