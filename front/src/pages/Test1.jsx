import React from 'react'
import './Test1.css'
export default function Test1() {
    return (
        <div className='post-main-container'>
            <div className='post-container'>
                <div className='details'>
                    <div className='title'>
                        <h3>Hello, I need food help for flood disaster. We have been suffering for very long </h3>
                        <h5>Urgency: <span>very urgent</span></h5>
                    </div>
                </div>
                <div className='details'>
                    <div className='name-time'>
                        <p>Date</p><p><span>User Name</span></p>
                        <p>within duration<span>  12 days</span></p>
                        <p>Request Type <span> food</span></p>
                    </div>
                    <h4>Amount</h4>
                    <h4>Pednding<span>500</span></h4>
                    <h4>location</h4>
                </div>
                <button>Donate</button>
                <button>Read More</button>



            </div>

        </div>
    )
}
