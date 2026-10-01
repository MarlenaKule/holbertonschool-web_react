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

    describe('Notification renders without crashing', () => {
        it('should render Notification without crashing', () => {
            const wrapper = shallow(<Notification />);
            expect(wrapper.exists()).toEqual(true);
        });
    });

    describe('Notification renders three list items', () => {
        it('should render three NotificationItem components', () => {
            const wrapper = shallow(<Notification notifications={notificationsList} />);
            const list = wrapper.find(NotificationItem);
            expect(list).toHaveLength(3);
        });

        it('first item should have correct props', () => {
            const wrapper = shallow(<Notification notifications={notificationsList} />);
            const firstItem = wrapper.find(NotificationItem).at(0);
            expect(firstItem.prop('type')).toEqual('default');
            expect(firstItem.prop('value')).toEqual('New course available');
        });
    });

    describe('Notification renders a text', () => {
        it('should render a given text', () => {
            const wrapper = shallow(<Notification notifications={notificationsList} />);
            expect(wrapper.find('.Notifications p').text()).toEqual(
                'Here is the list of notifications'
            );
        });
    });
});
