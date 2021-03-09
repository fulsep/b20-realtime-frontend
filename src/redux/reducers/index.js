import {combineReducers} from 'redux'

const initialUserState = {
    loggedAs: ''
}

const initialChatState = {
    chatList: [],
    chatView: [],
    chatFocus: ''
}

const reducer = combineReducers({
    user: (state=initialUserState, action) => {
        switch(action.type){
            case 'LOGIN': {
                return {
                    ...state,
                    loggedAs: action.payload
                }
            }
            default: {
                return state
            }
        }
    },
    chat: (state=initialChatState, action)=>{
        switch(action.type){
            case 'GET_CHAT_LIST': {
                return {
                    ...state,
                    chatList: action.payload
                }
            }
            case 'APPEND_CHAT_LIST': {
                return {
                    ...state,
                    chatList: [
                        state.chatList,
                        ...action.payload
                    ]
                }
            }
            case 'GET_CHAT_VIEW': {
                return {
                    ...state,
                    chatView: action.payload
                }
            }
            case 'APPEND_CHAT_VIEW': {
                return {
                    ...state,
                    chatView: [
                        ...state.chatView,
                        ...action.payload
                    ]
                }
            }
            case 'SET_CHAT_FOCUS': {
                return {
                    ...state,
                    chatFocus: action.payload
                }
            }
            default: {
                return state
            }
        }
    }
})

export default reducer