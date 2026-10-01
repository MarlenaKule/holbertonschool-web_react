import { shallow, mount } from 'enzyme';
import NotificationItem from './NotificationItem';


describe('Testing <NotificationItem /> component', () => {
    describe('NotificationItem renders without crashing', () => {
        it ('should render NotificationItem withour crashing', () => {
            const wrapper = shallow(<NotificationItem />);
            expect(wrapper.exists()).toEqual(true);
        });
    });
    describe('Notification renders list by using props', () => {
        it ('should render a list item with props passed', () => {
            const wrapper = mount(<Notification type="default" value="test" />);
            expect(wrapper.props().type).toEqual('default');
            expect(wrapper.props().value).toEqual('test');
        });
    });
    describe('Notification renders list by using html prop', () => {
        it ('should render a list item with html prop passed', () => {
            const wrapper = mount(<Notification type="default" html={{ __html: '<u>test</u>' }} />);
            const list = wrapper.find('li');
            expect(list.html()).toEqual('<li><u>test</u></li>');
        });
    });
})