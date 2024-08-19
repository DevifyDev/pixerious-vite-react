import React, { useEffect } from 'react'
import { 
    useLoaderData,
    useParams,
    Link,
 } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Footer from '../components/Footer'
import '../styles.css'
import { data } from '../components/data/grid.js'

export async function loader({ params }) {
    const articles = data 
    return { articles }
  }

export default function Article(){
    const { articles } = useLoaderData()
    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const articleToDisplay = articles.find(article => article.id === parseInt(id))
    console.log(articleToDisplay)

    return (
        <>
            <div className="articleContainer">
            <div className="returnIconContainer">
             <Link to="/" >  
                <div className="returnIconWrapper">
                    <img src="/icons/left-arrow-90.svg" alt="" />
                </div>
            </Link>
            </div>
            {articleToDisplay ? ( 
                <div className="article" key={articleToDisplay.id}>
                    {articleToDisplay.img && 
                    <figure className="articleImgContainer">
                        <img className="articleImg" src={articleToDisplay.img} alt={articleToDisplay.title} />
                    </figure>}
                    <div className="articleTextContainer">
                        <p className="articleText1">{articleToDisplay.text1}</p>
                        <p className="articleText2">{articleToDisplay.text2}</p>
                    </div>
                    <h2 className="articleTitle">{articleToDisplay.title}</h2>
                    <p className="articleContent" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articleToDisplay.content) }}></p>
                     <Link to="/">
                        <button className="ctaBtn">Home</button>
                    </Link>
               </div>
               ) : (
              <p>Article not found</p>
              )}
            </div>
            <Footer />
        </>
        
    )
}