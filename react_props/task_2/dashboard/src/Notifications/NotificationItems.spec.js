import React from 'react';
import { shallow } from 'enzyme';
import Notification from './Notifications';
import NotificationItem from './NotificationItem';

describe('Testing <Notification /> component', () => {
    const notificationsList = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        {
            id: 3,
            type: 'urgent',
            html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' },
        },
    ];

    it('renders without crashing', () => {
        const wrapper = shallow(<Notification />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders three NotificationItem components when passed three notifications', () => {
        const wrapper = shallow(<Notification notifications={notificationsList} />);
        expect(wrapper.find(NotificationItem).length).toBe(3);
    });

    it('renders the correct text inside <p>', () => {
        const wrapper = shallow(<Notification notifications={notificationsList} />);
        expect(wrapper.find('.Notifications p').text()).toEqual(
            'Here is the list of notifications'
        );
    });
});
