import React, { useEffect } from 'react'
import { 
    useLoaderData,
    useParams,
    Link,
 } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Footer from '../components/Footer'
import '../styles.css'
import { Helmet } from 'react-helmet-async'

export async function loader({params}){
    const response = await fetch(`http://localhost:3000/articles/${params.id}`)
    const article = await response.json()
    return { article }
}

export default function Article(){
    const { article } = useLoaderData()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {article && (
                <Helmet>
                    <title>{article.metaTitle}</title>
                    <meta name="description" content={article.description} />
                    <meta name="keywords" content={article.keywords} />
                    <link rel="canonical" href={article.href} />
                </Helmet>
            )}

            <div className="articleContainer">
            <div className="returnIconContainer">
             <Link to="/" >  
                <div className="returnIconWrapper">
                    <img src="/icons/left-arrow-90.svg" alt="" />
                </div>
            </Link>
            </div>
            {article ? ( 
                <div className="article" key={article.id}>
                    {article.img && 
                    <figure className="articleImgContainer">
                        <img className="articleImg" src={article.img} alt={article.title} />
                    </figure>}
                    <div className="articleTextContainer">
                        <p className="articleText1">{article.text1}</p>
                        <p className="articleText2">{article.text2}</p>
                    </div>
                    <h1 className="articleTitle">{article.title}</h1>
                    <p className="articleContent" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}></p>
                     <Link to="/" onClick={() => window.scrollTo(0,0)}>
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