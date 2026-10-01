import { shallow } from 'enzyme';
import App from './App';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Notification from '../Notifications/Notification';
import Login from '../Login/Login';


describe('Testing <App /> component', () => {
    describe('App renders without crashing', () => {
        it ('should render App withour crashing', () => {
            const wrapper = shallow(<App />);
            expect(wrapper.exists()).toEqual(true);
        });
    });
    describe('Test Notification component', () => {
        it ('It should contain the Notifications component', () => {
            const wrapper = shallow(<App />);
            wrapper.update()
            expect(wrapper.exists(Notification)).toEqual(true);
        });
    });
    describe('Test Header component', () => {
        it ('It should contain the Header component', () => {
            const wrapper = shallow(<App />);
            wrapper.update()
            expect(wrapper.exists(Header)).toEqual(true);
        });
    });
    describe('Test Login component', () => {
        it ('It should contain the Login component', () => {
            const wrapper = shallow(<App />);
            wrapper.update()
            expect(wrapper.exists(Login)).toEqual(true);
        });
    });
    describe('Test Footer component', () => {
        it ('It should contain the Footer component', () => {
            const wrapper = shallow(<App />);
            wrapper.update()
            expect(wrapper.exists(Footer)).toEqual(true);
        });
    });
})