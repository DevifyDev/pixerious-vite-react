import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'

export default function Grid() {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)  
    
    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch('http://localhost:3000/articles')
                    if (!response.ok) throw new Error('Network response not ok')
                const data = await response.json()
                setArticles(data)
            } catch (error) {
                console.error('Failed to fetch articles', error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }  
        fetchArticles()  
    }, [])

    if (loading) return <p>Loading articles</p>
    if (error) return <p>Failed to load articles: {error.message}</p>
    if (articles.length === 0) return <p>No articles found</p>

    return (
        <section className="gridParentContainer" id="grid">
            {articles.map((article) => {
                const { id, img, alt, text1, text2, title, content } = article
                
                return (
                    <div className="grid" key={id}>
                        <div className="gridBox">
                            <figure className="gridImgContainer">
                                <img className="gridImg" src={img} alt={alt} loading="lazy" />
                            </figure>
                            <div className="gridTextContainer">
                                <p className="gridText1">{text1}</p>
                                <p className="gridText2">{text2}</p>
                            <h3 className="gridTitle">{title}</h3>
                            <p className="gridContent" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}></p>
                            <Link to={`./article/${id}`} className="ctaBtn">
                                Read Full Article
                            </Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}