import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './utils/api'

const mockFetchSuggestionResult = [{
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
}];
const searchTerm = 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
const mockFetchProductDetailResult = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
};

describe('App', () => {
    beforeEach(() => {
        const mockFetchSuggestions = jest.spyOn(api, 'fetchSuggestions');
        mockFetchSuggestions.mockResolvedValue(mockFetchSuggestionResult);
        const mockFetchProductDetial = jest.spyOn(api, 'fetchProductDetail');
        mockFetchProductDetial.mockResolvedValue(mockFetchProductDetailResult);
    })

    it('renders product detail on search and click', async () => {
        render(<App />);
        const input = screen.getByTestId('autocomplete__search-box', { placeholder: /search for a product/i });
        expect(input).toBeInTheDocument();
        fireEvent.change(input, {target: {value: searchTerm}});
        expect(input.value).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
        await waitFor(() => {
            const searchResult = screen.getByTestId('autocomplete__result-1');
            expect(searchResult).toBeInTheDocument();
            fireEvent.click(screen.getByTestId('autocomplete__result-1'));
        });
        await waitFor(() => {
            expect(screen.getByTestId('loadericon__container')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByTestId('productdetail__container')).toBeInTheDocument();;
        });
    });
});
