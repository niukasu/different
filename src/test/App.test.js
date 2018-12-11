import React from 'react';
import ReactDom from 'react-dom';
import LeaseList from '../components/lease_list';

it('render without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<LeaseList />, div);
  ReactDom.unmountComponentAtNode(div);
})