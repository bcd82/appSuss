
export  class MailSearch extends React.Component {
    
    state = {
        query:''
    }

    handleInput = ({target}) =>{
        console.log(target.value)
        this.setState({query:target.value})
    }
    render() {

        const {query} = this.state
        return (
            <div>
                <form>
                <input  placeholder="Search emails..." value={query} onChange={this.handleInput}/>
                </form>
            </div>
        )
    }
}

