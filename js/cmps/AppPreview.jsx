const { Link } = ReactRouterDOM;

export function AppPreview(props) {
    const {title,txt,imgUrl} = props;
    return (
        <div className="app-preview">
           <h2>{title}</h2>
           <p>{txt}</p>
           <img src={imgUrl} />
           <Link to={`/${title.toLowerCase()}/`}>Go to {title} App</Link>
        </div>
    )
}
