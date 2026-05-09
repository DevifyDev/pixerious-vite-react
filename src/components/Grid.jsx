import { Link } from 'react-router-dom'
import { data } from './data/grid.js'

export default function Grid() {
      
    return (
        <section className="gridParentContainer" id="grid">
            {data.map((x) => {
                let { id, img, alt, text1, text2, title, content } = x
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
                            <p className="gridContent">{content}</p>
                            <Link
                                to={`./article/${id}`}
                                className="ctaBtn"
                                >
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