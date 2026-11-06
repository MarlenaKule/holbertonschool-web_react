import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'jest-mock-axios';
import App from './App';

describe('App Component Tests', () => {
  afterEach(() => {
    axios.mock({ reset: true });
  });

  it('verify notification item deletion', () => {
    const wrapper = mount(<App />);
    
    // Simulojme thirrjen e API-së për njoftimet
    axios.mockResponse({ data: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ]});

    wrapper.update();

    // Verifikojmë fshirjen duke thirrur markAsRead
    const notificationsComponent = wrapper.find('Notifications');
    const markAsReadFunction = notificationsComponent.prop('markAsRead');
    
    markAsReadFunction(1);
    wrapper.update();

    // Kontrollojme nese njoftimi u hoq
    expect(wrapper.find('Notifications').prop('listNotifications').length).toEqual(1);
  });
});