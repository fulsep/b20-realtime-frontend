import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from '../helpers/socket'
import axios from 'axios'

const {REACT_APP_BACKEND_URL} = process.env

class Root extends Component {
    getChatView = (name, sender) =>{
        this.props.dispatch(async (dispatch)=>{
          const response = await axios.get(`${REACT_APP_BACKEND_URL}/chat/${name}?from=${sender}`)
          // this.setState({chatView: response.data.results, chatFocus: sender})
          dispatch({type: 'GET_CHAT_VIEW', payload: response.data.results})
        })
        // this.chatBody.current.scrollTop = this.chatBody.current.scrollHeight
      }
    componentDidMount(){
        io.onAny(()=> {
            const {loggedAs} = this.props.user
            const {chatFocus} = this.props.chat
            if(loggedAs !== ''){
              io.once(loggedAs, (msg)=> {
                this.getChatView(loggedAs, chatFocus)
              })
            }
          })
    }
    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default connect(state=>({user:state.user,chat:state.chat}),dispatch=>({dispatch}))(Root)
