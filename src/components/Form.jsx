import React, { useState } from 'react'

export default function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [submissionMessage, setSubmissionMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            if (response.ok) {
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                })
                setShowPopup(true)
                setSubmissionMessage('Thank you!')
                setTimeout(() => {
                    setShowPopup(false)
                    setSubmissionMessage('')
                    setIsSubmitted(false)
                }, 2000)
                setIsSubmitted(true)
            } else {
                console.error('Form submission error')
            }
        }).catch((error) => {
            console.error('Form submission error', error)
        })
    }

    return (
        <div>
            {showPopup && (
                <div className="popup">
                    <p>{submissionMessage}</p>
                </div>
            )}
            {!isSubmitted && (
                <form onSubmit={handleSubmit} className="form" id="form">
                    <label htmlFor="name" className="label" id="first-name-label">Name</label>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        id="name"
                        required
                        minLength="3"
                        maxLength="20"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="email" className="label">Email</label>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="message" className="label">Message</label>
                    <textarea
                        className="textarea"
                        name="message"
                        id="message"
                        type="text"
                        maxLength="250"
                        required
                        value={formData.message}
                        onChange={handleChange}
                    />

                    <input type="submit" name="submit" value="SUBMIT" id="submit" className="submit" />
                </form>
            )}
        </div>
    )
}