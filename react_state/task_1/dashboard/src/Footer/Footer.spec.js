import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear } from '../utils/utils';

describe('Footer Component', () => {
    test('renders copyright with current year and Holberton School when isIndex=true', () => {
        const year = getCurrentYear();
        render(<Footer />);

        // The correct text should be "Holberton School", not "Holberton School main dashboard"
        const paragraph = screen.getByText(
            `Copyright ${year} - Holberton School`,
            { exact: false }
        );

        expect(paragraph).toBeInTheDocument();
    });
});