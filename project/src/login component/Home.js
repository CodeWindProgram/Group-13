import React from 'react'
import { Quotes } from './quotes'
import { Forms } from './forms'

export const Home = () => {

    let colStyles = {
        padding: '0px',
        margin: '0px',
        display: 'inline - block',
        overflow: 'hidden',
        position: 'relative',
    };

    let rowStyle = {
        margin: '0px',
        height: '100vh',
    }

    let formStyles = {
        padding: '30px',
    }
    return (
        <>
            <div className="row" style={rowStyle}>
                <div className="d-none d-lg-block col-lg-8  col-xl-9" style={colStyles}>
                    <Quotes />
                </div>
                <div className="col-lg-4 col-xl-3" style={formStyles}>
                    <div>
                    </div>
                    <Forms />
                </div>
            </div>
        </>
    )
}
