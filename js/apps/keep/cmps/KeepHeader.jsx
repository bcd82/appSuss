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
            className='modal-add-btn'
            onClick={() => {
              this.toggleOpenAdd();
            }}
          >
            Add
          </button>
        </nav>

        <section
          className={isAddOpen ? 'modal-bg' : 'modal-bg close-modal'}
          onClick={() => {
            this.toggleOpenAdd();
          }}
        >
          {isAddOpen && <KeepAdd />}
        </section>
      </section>
    );
  }
}
export const KeepHeader = withRouter(_KeepHeader);
