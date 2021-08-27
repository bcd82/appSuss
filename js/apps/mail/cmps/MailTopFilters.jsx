
  const { withRouter } = ReactRouterDOM;

  
  class _MailTopFilters extends React.Component {
    
    state = {
        query:'',
    }
    handleInput = ({target}) =>{
        this.setState({query:target.value},()=>this.props.handleSearch(target.value))
    }
    handleFolderChange = ({target}) => {
        this.props.history.push(`/mail?filter=${target.value}`)
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
                <label>Folder
                <select className="select-box mobile" value={this.props.filterBy} onChange={this.handleFolderChange}>
                    <option value="inbox">
                        Inbox
                    </option>
                    <option value="unread">
                        Unread
                    </option>
                    <option value="starred">
                        Starred
                    </option>
                    <option value="draft">
                        Drafts
                    </option>
                    <option value="trash">
                        Trash
                    </option>
                </select>
                </label>
            </div>
        )
    }
}

export const MailTopFilters = withRouter(_MailTopFilters)

