import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Autocomplete } from './Autocomplete';
import * as api from '../../utils/api';

const mockResult = [{
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
}];
const searchTerm = 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'



describe('Autocomplete', () => {
  beforeEach(() => {
    render(<Autocomplete setProductId={jest.fn()} setIsLoading={jest.fn()}/>);
  })

  it('renders correctly', () => {
    const input = screen.getByTestId('autocomplete__search-box', { placeholder: /search for a product/i });

    expect(input).toBeInTheDocument();
  });

  it('takes input correctly', () => {
    const mockFetchSuggestions = jest.spyOn(api, 'fetchSuggestions');
    mockFetchSuggestions.mockResolvedValue(mockResult);
    const input = screen.getByTestId('autocomplete__search-box');
    fireEvent.change(input, {target: {value: searchTerm}});

    expect(input.value).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
  })

  it('displays search results correctly', async () => {
    const mockFetchSuggestions = jest.spyOn(api, 'fetchSuggestions');
    mockFetchSuggestions.mockResolvedValue(mockResult);
    const input = screen.getByTestId('autocomplete__search-box');
    fireEvent.change(input, {target: {value: searchTerm}});
    
    await waitFor(() => {
      expect(screen.getByTestId('autocomplete__result-1')).toBeInTheDocument();
    })
  })

  it('shows error toast on api fail', async () => {
    const input = screen.getByTestId('autocomplete__search-box');
    fireEvent.change(input, {target: {value: searchTerm}});
    
    await waitFor(() => {
      expect(screen.getByTestId('toast__container')).toBeInTheDocument();
    })
  })
});
