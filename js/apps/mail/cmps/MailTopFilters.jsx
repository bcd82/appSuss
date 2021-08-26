
export  class MailTopFilters extends React.Component {
    
    state = {
        query:'',
    }
    handleInput = ({target}) =>{
        this.setState({query:target.value},()=>this.props.handleSearch(target.value))
    }
    render() {

        const {query, sort} = this.state
        return (
            <div className="mail-top-filters">
                <input name="query" type="search" placeholder="Search by subject , text or email" value={query} onChange={this.handleInput}/>
                <label htmlFor="sort">
                    Sort By 
                </label>
                <select className="select-box" value={this.props.sortVal} onChange={(ev)=>this.props.onSortMail(ev)}>
                    <option value="date">
                        Date
                    </option>
                    <option value="mail">
                        From
                    </option>
                    <option value="subject">
                        Subject
                    </option>
                </select>
            </div>
        )
    }
}

