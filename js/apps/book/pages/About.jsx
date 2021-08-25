export class About extends React.Component {
  state = {
    shownImg: 0,
  };

  imgUrls = [
    "./assets/img/books-about.jpeg",
    "./assets/img/books-about-2.jpg",
    "./assets/img/books-about3.jpeg",
  ];

  changeShownImg = () => {
    if (this.state.shownImg === 2) {
      this.setState({ shownImg: 0 });
    } else {
      this.setState({ shownImg: this.state.shownImg + 1 });
    }
  };

  getImageToShow = () => {
    return this.imgUrls[this.state.shownImg];
  };

  componentDidMount() {
    this.interval = setInterval(this.changeShownImg, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <section className="about">
        <div className="about-container main-layout">
          <h1>About Us</h1>
          <img src={this.getImageToShow()} className="about-img"></img>
          <div className="text-container">
            <h2>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis
            </h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis blanditiis praesentium alias aperiam deserunt, maiores
              aliquid dolor, ut fuga nisi velit iure, perferendis asperiores
              eaque modi voluptas culpa obcaecati. Sit?
            </p>
          </div>
        </div>
      </section>
    );
  }
}
