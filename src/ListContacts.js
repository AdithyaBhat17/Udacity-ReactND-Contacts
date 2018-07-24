import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class ListContacts extends React.Component{
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state={
            query:''
        }
    }
    updateQuery = (query) => {
        this.setState(() => ({
            query:query.trim()
        }))
    }
    clearQuery = () => {
        this.updateQuery('')
    }

    render(){
        const {query} = this.state;
        const { contacts,onDeleteContact } = this.props;
        const showContacts = query === ''
        ? contacts
        : contacts.filter(c => (
            c.name.toLowerCase().includes(query.toLocaleLowerCase())
        ))

        return(
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input 
                        className="search-contacts"
                        type="text"
                        placeholder="Search Contacts"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                     to="/create"
                     className="add-contact"
                    >Add Contact
                    </Link>
                </div>

                {showContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now showing {showContacts.length} of {contacts.length}</span>
                        <button onClick={this.clearQuery}>
                            Show all
                        </button>
                    </div>
                )}

                <ol className="contact-list">
                {
                    showContacts.map((contact) =>(
                    <li key={contact.id} className="contact-list-item">
                        <div 
                        className="contact-avatar"
                        style={{
                            backgroundImage:`url(${contact.avatarURL})`
                        }}/>
                        <div className="contact-details">
                            <p>{contact.name}</p>
                            <p>{contact.handle}</p>
                        </div>
                        <button
                         onClick={()=>onDeleteContact(contact)}
                         className="contact-remove">
                            Remove
                        </button>
                    </li>
                )
                )}
                </ol>
            </div>
            
        )
    }
}



export default ListContacts;