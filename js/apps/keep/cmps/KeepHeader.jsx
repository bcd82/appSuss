const { NavLink, withRouter } = ReactRouterDOM;
import {ToggleKeepMenu} from '../cmps/ToggleKeepMenu.jsx'

class _KeepHeader extends React.Component {
   
    state = { 
        isOpen:false
    }
    
    render() {
        return (
      <section className='main-layout keep-header'>
        <h1 onClick={() => this.props.history.goBack()} className='keep-logo'>
          <span>K</span>eep
        </h1>
        <nav>
            <button onClick={() =>{
                <ToggleKeepMenu />
            }}>☰</button>
            
          
        </nav>
      </section>
    );
  }
}
export const KeepHeader = withRouter(_KeepHeader);