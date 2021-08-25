
export function AppPreview(props) {
    return (
        <div className="app-preview">
           <h2>{props.txt}</h2>
           <img src={props.imgUrl} />
        </div>
    )
}
