const { Link } = ReactRouterDOM;

export function AppPreview(props) {
    const {title,txt,imgUrl} = props;
    return (
         <Link to={`/${title.toLowerCase()}/`}>
        <div className="app-preview">
           <h2>{title}</h2>
           <p>{txt}</p>
           <img src={imgUrl} className="preview-img"/>
          To {title} App
        </div></Link>
    )
}
