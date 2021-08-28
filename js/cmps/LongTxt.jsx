export class LongTxt extends React.Component {
    state = {
      isLongTxtShown: false,
    };
  
    getTextToShow = (text) => {
      const { isLongTxtShown } = this.state;
      if (isLongTxtShown) return text;
      return text.substring(0, 35);
    };
  
    onToggleText = (ev) => {
        ev.stopPropagation()
        this.setState((prevState) => ({ isLongTxtShown: !prevState.isLongTxtShown }));
  
    };
  
    render() {
      const { isLongTxtShown } = this.state;
      const { text } = this.props;
      return (
        <span className="description">
          {
            this.getTextToShow(text)
          }
          {text.length > 100 && (
            <strong className="read-more" onClick={(ev) => this.onToggleText(ev)}>
              {isLongTxtShown ? " Less..." : " More..."}
            </strong>
          )}
        </span>
      );
    }
  }