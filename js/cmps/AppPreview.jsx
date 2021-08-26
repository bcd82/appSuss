const { Link } = ReactRouterDOM;

export function AppPreview(props) {
    const {title,txt,imgUrl} = props;
    return (
        <div className="app-preview">
           <h2>{title}</h2>
           <p>{txt}</p>
           <img src={imgUrl} className="preview-img"/>
           <Link to={`/${title.toLowerCase()}/`}>To {title} App<img className="mail" src="./assets/imgs/cmps/arrow.png"/></Link>
        </div>
    )
}
