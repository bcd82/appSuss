const { NavLink, withRouter } = ReactRouterDOM;
import { ToggleKeepMenu } from '../cmps/ToggleKeepMenu.jsx';
import { KeepAdd } from './KeepAdd.jsx';

class _KeepHeader extends React.Component {
  state = {
    isToggleOpen: false,
    isAddOpen: false,
  };

  toggleOpenAdd = () => {
    const { isAddOpen } = this.state;
    this.setState({ isAddOpen: !isAddOpen });
  };

  render() {
    const { isAddOpen } = this.state;
    return (
      <section className='main-layout keep-header'>
        <h1 onClick={() => this.props.history.goBack()} className='keep-logo'>
          <span>K</span>eep
        </h1>
        <nav>
          <button
            onClick={() => {
              <ToggleKeepMenu />;
            }}
          >
            ☰
          </button>
          <button
            onClick={() => {
              this.toggleOpenAdd();
            }}
          >
            Add
          </button>
        </nav>
        <section>{isAddOpen && <KeepAdd />}</section>
      </section>
    );
  }
}
export const KeepHeader = withRouter(_KeepHeader);
