export function HomeProfile(props) {
  return (
    <div className="home-profile">
      <div className="profile-details">
        <img className="profile-img" src={props.imgUrl} />
        <h2>{props.name}</h2>
        <p>{props.title}</p>
        <div className="links">
          <a href={props.fbUrl} target="blank">
            <img src="./assets/imgs/cmps/fb.png" />
          </a>
          <a href={props.ghUrl} target="blank">
            <img src="./assets/imgs/cmps/gh.png" />
          </a>
          <a href={props.liUrl} target="blank">
            <img src="./assets/imgs/cmps/li.png" />
          </a>
        </div>
      </div>
      <div className="profile-text">
        <p>
          <i>
            " Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptatum et officiis aut reiciendis alias rerum nemo qui dolores
            debitis error, ipsam quasi, unde, officia enim."
          </i>
        </p>
      </div>
    </div>
  );
}
