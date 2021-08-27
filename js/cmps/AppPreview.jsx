const { Link } = ReactRouterDOM;

export function AppPreview(props) {
    const {title,txt,imgUrl,url} = props;
    return (
         <Link to={url}>
        <div className="app-preview">
           <h2>{title}</h2>
           <p>{txt}</p>
           <img src={imgUrl} className="preview-img"/>
          To {title} App
        </div></Link>
    )
}
