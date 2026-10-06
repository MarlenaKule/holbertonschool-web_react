import { shallow } from 'enzyme';
import React from 'react';
import CourseListRow from './CourseListRow';

describe('CourseListRow', () => {
    it('should test CourseListRow component for no crashing', () => {
        const wrapper = shallow(<CourseListRow textFirstCell="test" />);
        expect(wrapper.exists()).toEqual(true);
    });
    it('should test CourseListRow component when isHeader is true and returns one cell', () => {
        const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" />);
        wrapper.update();
        const item = wrapper.find('th');
        expect(item).toHaveLength(1);
        expect(item.prop('colSpan')).toEqual("2");
    });
    it('should test CourseListRow component when isHeader is true and returns two cells', () => {
        const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" textSecondCell="test2" />);
        wrapper.update();
        const item = wrapper.find('th');
        expect(item).toHaveLength(2);
    });
    it('should test CourseListRow component when isHeader is false', () => {
        const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="test" textSecondCell="test2" />);
        wrapper.update();
        const item = wrapper.find('tr');
        expect(item).toHaveLength(1);
        expect(item.children("td")).toHaveLength(2);
    });
});