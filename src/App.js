import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as contactAPI from './utils/ContactsAPI';
import CreateContacts from './CreateContacts';
import {Route} from 'react-router-dom';

class App extends Component {
  state={
    'contacts':[]
  }
  componentDidMount(){
    contactAPI.getAll()
    .then((contacts) =>{
      this.setState(()=>({
        contacts
      }))
    })
  }
  createContact = (contact) => {
    contactAPI.create(contact)
    .then((contact) => {
      this.setState((currentState) => ({
        contacts:currentState.contacts.concat([contact])
      }))
    })
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c)=>{
        return c.id!==contact.id  
      })
    }))
    contactAPI.remove(contact);
  }
  render() {
    return (
      <div>
        <Route exact path="/" render={()=>(
            <ListContacts 
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            />
        )}/>
        <Route path="/create" render={({history})=>(
          <CreateContacts
          onCreateContact={(contact)=>{
            this.createContact(contact)
            history.push("/")
          }          
        }        
        />        
        )} />
      </div>
    );
  }
}

export default App;
