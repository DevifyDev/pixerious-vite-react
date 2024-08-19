import React from 'react'

export default function Banner({ headings, id }) {
    return (
        <section className="banner" id={id}>
            {headings.map((heading, index) => (
                <h2 key={index} className="heading">{heading}</h2>
            ))}
        </section>
    )
}