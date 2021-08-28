export function HomeProfile(props) {
  return (
    <div className="home-profile">
      <div className="profile-details">
        <img src={props.imgUrl} />
        <h2>{props.name}</h2>
        <p>{props.title}</p>
      </div>
      <div className="profile-text">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
          et officiis aut reiciendis alias rerum nemo qui dolores debitis error,
          ipsam quasi, unde, officia enim repudiandae sed explicabo assumenda
          corrupti quidem! Maxime error veritatis quisquam.
        </p>
      </div>
    </div>
  );
}
