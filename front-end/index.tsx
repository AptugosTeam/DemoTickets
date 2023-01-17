import { createBrowserHistory } from 'history'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { Router } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

import { Provider } from 'react-redux'
import store from './store/store'

import * as serviceWorker from './serviceWorker'

import App from './App'

const hist = createBrowserHistory()

const rootElement = document.getElementById('app')
const app = (
  <Provider store={store}>
    <Router history={hist}>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>
)

if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement)
} else {
  render(app, rootElement)
}

serviceWorker.register()
