
export  class MailSearch extends React.Component {
    
    state = {
        query:'',
    }
    handleInput = ({target}) =>{
        this.setState({query:target.value},()=>this.props.handleSearch(target.value))
    }
    render() {

        const {query, sort} = this.state
        return (
            <div className="mail-search">
                <input name="query" type="search" placeholder="Search by subject , text or email" value={query} onChange={this.handleInput}/>
                <label htmlFor="sort">
                    Sort By 
                </label>
                <select value={this.props.sortVal} onChange={(ev)=>this.props.onSortMail(ev)}>
                    <option value="date">
                        Date
                    </option>
                    <option value="mail">
                        Email Name
                    </option>
                    <option value="subject">
                        Alphabetical
                    </option>
                </select>
            </div>
        )
    }
}

