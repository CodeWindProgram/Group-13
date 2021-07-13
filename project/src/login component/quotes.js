import React from 'react'
import elon1 from '../login component/pictures/elon1.jpg'
import steve1 from '../login component/pictures/steve1.jpg'
import kalam from '../login component/pictures/kalam.jpg'
import gandhi from '../login component/pictures/gandhi.jpg'
import mandela from '../login component/pictures/mandela.jpg'

import './styles/quotes.css'

export const Quotes = () => {

    let quotes = [{
        writer: "Elon Musk",
        text: 'When something is important enough, you do it even if the odds are not in your favor.',
        image: elon1
    },
    {
        writer: "Steve Jobs",
        text: 'Don’t let the noise of others’ opinions drown out your own inner voice.',
        image: steve1
    },
    {
        writer: "APJ Abdul Kalam",
        text: 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.',
        image: kalam
    },
    {
        writer: "Mahatma Gandhi",
        text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
        image: gandhi
    },
    {
        writer: "Nelson Mandela",
        text: 'Education is the most powerful weapon which you can use to change the world.',
        image: mandela
    }
    ]

    var rand = Math.floor(Math.random() * 5) + 1;


    return (
        <>
            <img src={quotes[rand - 1].image} alt="" data-aos="zoom-out" />
            <div className="outer-quoting">
                <div className="quoting">
                    <h3 className="quote" data-aos="fade-right" data-aos-duration="2000"><span>" </span>{quotes[rand - 1].text}<span> "</span> </h3>
                    <h4 className="writer" data-aos="fade-right"> <span>—</span> {quotes[rand - 1].writer}</h4>
                </div>
            </div>
        </>
    )
}
