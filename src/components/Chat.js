import styled from 'styled-components'

export const ChatView = styled.div`
  height: 100vh;
  border-left: 2px solid #e5e5e5;
`
export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #EBEBEB;
  padding: 0px 10px;
  height: 70px;
  && img {
    border-radius: 25px;
    margin-right: 20px;
  }
  && div {
    display: flex;
    flex-direction: column;
  }
  && .name {
    font-size: 18px;
  }
  && .status{
    font-size: 13px;
  }
`

export const ChatBody = styled.div`
  overflow: scroll;
  height: calc(100% - 70px - 50px);
  background-color: #ded5d2;
  padding: 10px;
`

export const ChatBubble = styled.div`
  display: inline-block;
  background-color: #fff;
  padding: 10px;
  margin: 5px 0;
  border-radius: 3px;
  ${p=>p.self && `
    background-color: #d6f7c1;
  `}
`

export const ChatBubbleContainer = styled.div`
  ${p=>p.self && `
    text-align: right;
  `}
`
export const ChatFooter = styled.div`
  background-color: #EBEBEB;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
`