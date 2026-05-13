import React from 'react'
import AppRoutes from './routes/Routes'
import { Helmet } from 'react-helmet-async'
import './styles.css'

export default function App(){
  return (
    <>
    <Helmet>
        <title>Pixerious</title>
        <meta
          name="description"
          content="Explore the captivating world of photography at Pixerious, your ultimate resource for photography news, AI techniques, tutorials, and reviews."
        />
        <meta
          name="keywords"
          content="photography, cameras, AI photography, photo editing, tutorials, camera reviews"
        />
      </Helmet>
      
    <AppRoutes />
    </>
  ) 
}
