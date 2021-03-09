import React, { Component } from 'react'
import Main from './pages/Main'

import store from './redux/store'
import { Provider } from 'react-redux'
import Root from './pages/Root'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          {/*your component here*/}
          <Main />
        </Root>
      </Provider>
    )
  }
}
