
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ProductDetail } from './ProductDetail';
import * as api from '../../utils/api';

const mockResult = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
};

describe('ProductDetail', () => {
    it('does not render without productId', () => {
        render(<ProductDetail productId={undefined} setIsLoading={jest.fn()} />)

        expect(screen.queryByTestId('productdetail__container')).not.toBeInTheDocument();
    })

    it('does render with productId', async () => {
        const mockFetchProductDetial = jest.spyOn(api, 'fetchProductDetail');
        mockFetchProductDetial.mockResolvedValue(mockResult);
        render(<ProductDetail productId={1} setIsLoading={jest.fn()} />)

        await waitFor(() => {
            expect(screen.getByTestId('productdetail__container')).toBeInTheDocument();
            expect(screen.getByTestId('productdetail__img')).toBeInTheDocument();
            expect(screen.getByText(
                'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'
            )).toBeInTheDocument();
            expect(screen.getByText(
                'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday'
            )).toBeInTheDocument();
            expect(screen.getByText("£109.95")).toBeInTheDocument();
        });
    })

    it('shows error toast on api fail', async () => {
        render(<ProductDetail productId={1} setIsLoading={jest.fn()} />);

        await waitFor(() => {
            expect(screen.getByTestId('toast__container')).toBeInTheDocument();
        })
    })
})