import Footer from './Footer';
import { shallow } from 'enzyme';

describe('Testing <Footer /> component', () => {
    describe('Footer renders without crashing', () => {
        it ('should render Footer withour crashing', () => {
            const wrapper = shallow(<Footer />);
            expect(wrapper.exists()).toEqual(true);
        });
    });
    describe('Footer renders a p element', () => {
        it ('should render a p element in Footer component', () => {
            const wrapper =  shallow(<Footer />);
            wrapper.update();
            expect(wrapper.find('p').text()).toEqual('Copyright 2023 - Holberton School');
        });
    });
});