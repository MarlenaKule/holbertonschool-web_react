import Login from './Login';
import { shallow } from 'enzyme';

describe('Testing <Login /> component', () => {
    describe('Login renders without crashing', () => {
        it ('should render Login withour crashing', () => {
            const wrapper = shallow(<Login />);
            expect(wrapper.exists()).toEqual(true);
        });
    });
    describe('Login renders an input element', () => {
        it ('should render an input in Login component', () => {
            const wrapper = shallow(<Login />);
            wrapper.update();
            expect(wrapper.find('input')).toHaveLength(2);
        });
    });
    describe('Header renders a label element', () => {
        it ('should render a label in Header component', () => {
            const wrapper = shallow(<Header />);
            wrapper.update();
            expect(wrapper.find('label')).toHaveLength(2);
        });
    });
});