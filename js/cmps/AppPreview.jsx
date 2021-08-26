const { Link } = ReactRouterDOM;

export function AppPreview(props) {
    return (
        <div className="app-preview">
           <h2>{props.txt}</h2>
           <p>Keep Notes of All of Your Favourite Stuff</p>
           <img src={props.imgUrl} />
           <Link>Go to Keep App</Link>
        </div>
    )
}
