import { shallow } from 'enzyme';
import Notification from './Notification';


describe('Testing <Notification /> component', () => {
    describe('Notification renders without crashing', () => {
        it ('should render Notification withour crashing', () => {
            const wrapper = shallow(<Notification />);
            expect(wrapper.exists()).toEqual(true);
        });
    });
    describe('Notification renders three list items', () => {
        it ('should render three list items', () => {
            const wrapper = shallow(<Notification />);
            wrapper.update();
            expect(wrapper.find('li')).toHaveLength(3);
        });
    });
    describe('Notification renders a text', () => {
        it ('should render a given text', () => {
            const wrapper = shallow(<Notification />);
            wrapper.update();
            expect(wrapper.find('.Notification p').text()).toEqual('Here is the list of notifications');
        });
    });
})