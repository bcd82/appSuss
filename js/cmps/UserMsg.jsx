import { eventBusService } from "../services/event.bus.service.js";

export class UserMsg extends React.Component {
  state = {
    msg: null,
  };
  removeEventBus;
  timeoutId;

  componentDidMount() {
    this.removeEventBus = eventBusService.on("user-msg", (msg) => {
      this.setState({ msg }, () => {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.onCloseMsg, 5000);
      });
    });
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  onCloseMsg = () => {
    this.setState({ msg: null });
    clearTimeout(this.timeoutId);
  };

  getDisplayImg = () => {
    if(this.state.msg.type === 'success'){
     return "./assets/imgs/cmps/check-animated.gif"
    } if (this.state.msg.type === 'delete'){
      return "./assets/imgs/cmps/trash.gif"
  }
  }
  render() {
    const { msg } = this.state;
    if (!msg) return <React.Fragment></React.Fragment>;
    console.log(msg)
    return (
      <section className="user-msg" className={`user-msg ${msg.type}`}>
        <img src={this.getDisplayImg()} />
        <h1>{msg.txt}</h1>
        <button onClick={this.onCloseMsg}>X</button>
      </section>
    );
  }
}
