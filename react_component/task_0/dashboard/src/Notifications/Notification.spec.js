import { shallow } from 'enzyme';
import Notification from './Notification';
import NotificationItem from './NotificationItem';


describe('Testing <Notification /> component', () => {
    describe('Notification renders without crashing', () => {
        it ('should render Notification withour crashing', () => {
            const wrapper = shallow(<Notification />);
            expect(wrapper.exists()).toEqual(true);
        });
    });
    describe('Notification renders three list items', () => {
        it ('should render three list items', () => {
            const wrapper = shallow(<Notification displayDrawer={true} />);
            wrapper.update();
            const list = wrapper.find(NotificationItem);
            expect(list).toBeDefined();
            expect(list).first().html().toEqual('<li data-notification-type="default">New course available</li>');
        });
    });
    describe('Notification renders a text', () => {
        it ('should render a given text', () => {
            const wrapper = shallow(<Notification displayDrawer={true} />);
            wrapper.update();
            expect(wrapper.find('.Notification p').text()).toEqual('Here is the list of notifications');
        });
    });
    describe('Notification menu item being displayed', () => {
        it ('should show menuItem when displayDrawer is false', () => {
            const wrapper = shallow(<Notification />);
            wrapper.update();
            expect(wrapper.find('div.menuItem')).toHaveLength(1);
        });
        it ('should not show notifications when displayDrawer is false', () => {
            const wrapper = shallow(<Notification />);
            wrapper.update();
            expect(wrapper.find('div.Notifications')).toHaveLength(0);
        });
        it ('should show menuItem when displayDrawer is true', () => {
            const wrapper = shallow(<Notification />);
            wrapper.update();
            expect(wrapper.find('div.menuItem')).toHaveLength(1);
        });
        it ('should show notifications when displayDrawer is true', () => {
            const wrapper = shallow(<Notification />);
            wrapper.update();
            expect(wrapper.find('div.Notifications')).toHaveLength(1);
        });
    });
})