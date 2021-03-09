import React, { Component } from 'react'
import { Button, Container, Form, Modal, Nav, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import {BiSmile} from 'react-icons/bi'
import {
    ChatView,
    ChatHeader,
    ChatBody,
    ChatFooter,
    ChatBubbleContainer,
    ChatBubble
} from '../components/Chat'
import styled from 'styled-components'
import { connect } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env



class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedAs: '',
      chatList: [],
      chatView: [],
      chatFocus: ''
    }

    this.input = React.createRef()
    this.message = React.createRef()
    this.recipient = React.createRef()
    this.chatBody = React.createRef()

    this.login = this.login.bind(this)
    this.getChatList = this.getChatList.bind(this)
    this.getChatView = this.getChatView.bind(this)
    this.sendChat = this.sendChat.bind(this)
    this.focus = this.focus.bind(this)
  }
  componentDidMount(){
    const {loggedAs} = this.props.user
    if(loggedAs!==''){
      this.getChatList(loggedAs)
    }
  }
  async getChatList(name){
    this.props.dispatch(async (dispatch)=>{
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/chat/${name}`)
      const payload = response.data.results.filter(o=>o!==name)
      dispatch({type:'GET_CHAT_LIST', payload})
    })
  }
  async getChatView(name, sender, e){
    if(e){
      e.preventDefault()
    }
    this.props.dispatch(async (dispatch)=>{
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/chat/${name}?from=${sender}`)
      // this.setState({chatView: response.data.results, chatFocus: sender})
      dispatch({type: 'GET_CHAT_VIEW', payload: response.data.results})
    })
    // this.chatBody.current.scrollTop = this.chatBody.current.scrollHeight
  }
  focus(e){
    e.preventDefault()
    // this.setState({chatFocus: this.recipient.current.value})
    this.props.dispatch({type: 'SET_CHAT_FOCUS', payload: this.recipient.current.value})
  }
  async sendChat(e){
    e.preventDefault()
    const {loggedAs: sender} = this.props.user
    const {chatFocus: recipient} = this.props.chat
    const {value: message} = this.message.current
    const data = new URLSearchParams()
    data.append('from', sender)
    data.append('message', message)
    await axios.post(`${REACT_APP_BACKEND_URL}/chat/${recipient}`, data)
    await this.getChatView(sender, recipient)
    this.message.current.value = ""
    this.chatBody.current.scrollTop = this.chatBody.current.scrollHeight
  }
  async login(e){
    e.preventDefault()
    const {value: loggedAs} = this.input.current
    this.props.dispatch({type: 'LOGIN', payload: loggedAs})
    await this.getChatList(loggedAs)
    this.setState({loggedAs})
  }
  render() {
    const {loggedAs} = this.props.user
    const {chatList, chatFocus, chatView} = this.props.chat
    return (
      <React.Fragment>
        <Container>
          <Row noGutters>
            <Col md={4}>
              <ProfileNav>
                <img src="https://via.placeholder.com/50" alt="User" />
                <span>{loggedAs}</span>
              </ProfileNav>
              <Form onSubmit={this.focus}>
                <Form.Control ref={this.recipient} placeholder="Input recipient" type="text" />
              </Form>
              <Nav className="flex-column">
                {chatList.map((chat,idx)=> (
                  <React.Fragment key={String(chat)}>
                    <NavUser onClick={(e)=>this.getChatView(loggedAs, chat, e)}>
                      <img src="https://via.placeholder.com/50" alt="User" />
                      <span>{chat}</span>
                    </NavUser>
                  </React.Fragment>
                ))}
                <Nav.Link className="btn btn-primary" onClick={async (e)=>{
                  e.preventDefault()
                  await this.getChatList(loggedAs)
                }}>Refresh</Nav.Link>
              </Nav>
            </Col>
            <Col md={8}>
                {chatFocus!=='' && <ChatView>
                <ChatHeader>
                  <img src="https://via.placeholder.com/50" alt="User" />
                  <div>
                    <span className="name">{chatFocus}</span>
                    <span className="status text-muted">Available</span>
                  </div>
                </ChatHeader>
                <ChatBody ref={this.chatBody}>
                  {chatView.map((chat,idx)=>{
                    const self = chat.from === loggedAs
                    return (
                      <ChatBubbleContainer self={self}>
                        <ChatBubble self={self}>{chat.message}</ChatBubble>
                      </ChatBubbleContainer>
                    )
                  })}
                </ChatBody>
                <ChatFooter>
                  <BiSmile size={30} />
                  <Form className="flex-fill mr-3 ml-3" onSubmit={this.sendChat}>
                    <Form.Control ref={this.message} type="text" />
                    <Button style={{display:'none'}} type="submit">Send</Button>
                  </Form>
                </ChatFooter>
              </ChatView>}
            </Col>  
          </Row>
        </Container>
        <Modal show={loggedAs===''}>
          <Modal.Header>
            <Modal.Title>Login as</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.login}>
              <Form.Group>
                <Form.Label>Your Name:</Form.Label>
                <Form.Control ref={this.input} type="text" />
              </Form.Group>
              <Button type="submit" block>Login</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    )
  }
}

export default connect(state=>({chat:state.chat, user: state.user}), dispatch => ({dispatch}))(Main)

const ProfileNav = styled.div`
  height: 70px;
  background-color: #EBEBEB;
  display: flex;
  align-items: center;
  padding: 0 10px;
  && img {
    border-radius: 25px;
    margin-right: 10px;
  }
`

const NavUser = styled(Nav.Link)`
  height: 70px;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  && img {
    border-radius: 25px;
    margin-right: 10px;
  }
`