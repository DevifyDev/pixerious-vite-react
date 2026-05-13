import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
import Grid from '../components/Grid'
import Footer from '../components/Footer'

export default function Root(){
    const news = ["NEWS"]
    const selections = ["SELECTIONS"]

    return (
        <>
            <Helmet>
                <title>Pixerious</title>
                <meta name="description" content="Explore the captivating world of photography at Pixerious, your ultimate resource for everything from camera reviews and the latest in AI photography to historical insights and step-by-step editing tutorials. Whether you're a professional or a hobbyist, enrich your skills and passion for photography with our expert articles and guides" />
                <meta name="keywords" content="photography news, latest cameras, AI photography techniques, photo editing tips, photography history, improve photography skills, camera reviews, technical guides for photographers, professional photography tips, digital photography, photography tutorials, portrait photography, landscape photography, sports photography, wedding photography, camera settings guide, photography lighting techniques, best photography practices, beginner photography, advanced photography techniques" />
            </Helmet>
            
            <Header />
            <Main />
            <Banner headings={news} id="news" />
            <Grid />
            <Banner headings={selections} id="selections" />
            <Carousel />
            <Footer />
            <Outlet />
        </>
    )
}