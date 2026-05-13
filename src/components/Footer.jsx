import React from 'react'

export default function Footer(){
    return (
        <section className="footer">
            <p className="copyright"> 
                &#169; Pixerious {new Date().getFullYear()} 
            </p>
        </section>
    )
}