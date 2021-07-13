import React from 'react'
import './notfound.css'
import { Link } from 'react-router-dom'


export const NotFound = () => {
    return (
        <>
            <div className="container">
                <div className="innerContainer">
                    <div className="bolding">
                        <h1 id="notfound-header">404</h1>
                    </div>
                    <div className="boldtext">
                        <h2 id="notfound-sec">UH OH! You're lost.</h2>
                    </div>
                    <div id="forms-para">
                        <p>The page you are looking for does not exist.How you got here is a mystery. <br />
                            But you can click the button below to go back to the homepage.</p>
                    </div>
                    <div id="forms-buttons">
                        <Link to='/' className='btn btn-outline-success'>Home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}


// 
// The page you are looking for does not exist.How you got here is a mystery.
// But you can click the button below to go back to the homepage.