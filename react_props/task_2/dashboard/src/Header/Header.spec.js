import Header from './Header';
import { shallow } from 'enzyme';

describe('Testing <Header /> component', () => {
    describe('Header renders without crashing', () => {
        it ('should render Header withour crashing', () => {
            const wrapper = shallow(<Header />);
            expect(wrapper.exists()).toEqual(true);
        });
    });
    describe('Header renders an img element', () => {
        it ('should render an img in Header component', () => {
            const wrapper = shallow(<Header />);
            wrapper.update();
            expect(wrapper.find('img')).toHaveLength(1);
        });
    });
    describe('Header renders a h1 element', () => {
        it ('should render a h1 in Header component', () => {
            const wrapper = shallow(<Header />);
            wrapper.update();
            expect(wrapper.find('h1')).toHaveLength(1);
        });
    });
});