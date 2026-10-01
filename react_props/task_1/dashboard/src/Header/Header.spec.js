import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header component', () => {
    it('renders the Holberton logo', () => {
        const wrapper = shallow(<Header />);
        const img = wrapper.find('img');
        expect(img.prop('alt')).toBe('Holberton logo');
    });

    it('renders the heading text', () => {
        const wrapper = shallow(<Header />);
        const heading = wrapper.find('h1');
        expect(heading.text()).toBe('School dashboard');
    });
});
