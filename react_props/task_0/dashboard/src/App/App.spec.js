import { shallow } from 'enzyme';
import App from './App';


describe('Testing <App /> component', () => {
    describe('App renders without crashing', () => {
        it ('should render App withour crashing', () => {
            const wrapper = shallow(<App />);
            expect(wrapper.exists()).toEqual(true);
        });
    });
})