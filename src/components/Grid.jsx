import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'

export default function Grid() {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)  

    const supabaseApiUrl = import.meta.env.VITE_API_URL
    
    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch(`${supabaseApiUrl}/articles`)
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
                const regexToStripHtmlTags = content.replace(/<[^>]+>/g, '').trim()
                const textChunk = regexToStripHtmlTags.split(' ').slice(0,20).join(' ')
                const supabaseBucketImgUrl = import.meta.env.VITE_SUPABASE_BLOG_IMAGE_URL
                
                return (
                    <div className="grid" key={id}>
                        <div className="gridBox">
                            <figure className="gridImgContainer">
                                <img className="gridImg" src={`${supabaseBucketImgUrl}/${img}`} alt={alt} loading="lazy" />
                            </figure>
                            <div className="gridTextContainer">
                                <p className="gridText1">{text1}</p>
                                <p className="gridText2">{text2}</p>
                            <h3 className="gridTitle">{title}</h3>
                            <p className="gridContent">{textChunk}</p>
                            <Link to={`/article/${id}`} className="ctaBtn">
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