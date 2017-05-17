import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
import $ from 'jquery'

import App from './components/app/App';
const proxyStore = new Store({portName: 'oneformall'});

    render(<Provider store={proxyStore}>
      <App />
    </Provider>,document.getElementById('app'));
