
export  class MailSearch extends React.Component {
    
    state = {
        query:''
    }
    handleInput = ({target}) =>{
        this.setState({query:target.value},()=>this.props.handleSearch(target.value))
    }
    render() {

        const {query} = this.state
        return (
            <div className="mail-search">
                <input type="search" placeholder="Search emails..." value={query} onChange={this.handleInput}/>
            </div>
        )
    }
}

