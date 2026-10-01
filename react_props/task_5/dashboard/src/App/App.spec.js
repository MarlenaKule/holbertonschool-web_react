import { shallow } from 'enzyme';
import App from './App';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Notification from '../Notifications/Notification';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';


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
    describe('Test CourseList component', () => {
        it ('It should not display CourseList when isLoggedIn false by default', () => {
            const wrapper = shallow(<App />);
            wrapper.update()
            expect(wrapper.exists(CourseList)).toEqual(false); 
        });
    });
    describe('Test CourseList component', () => {
        it ('It should display CourseList when isLoggedIn true', () => {
            const wrapper = shallow(<App isLoggedIn={true} />);
            wrapper.update()
            expect(wrapper.exists(CourseList)).toEqual(true); 
        });
    });
})