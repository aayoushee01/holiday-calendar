import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar component', () => {
  test('renders with default location', () => {
    const { getByText } = render(<Calendar />);
    expect(getByText('Holiday Calendar')).toBeInTheDocument();
    expect(getByText('Location (Enter ISO 3166 code) :')).toBeInTheDocument();
    expect(getByText('Get Holidays')).toBeInTheDocument();
  });
  
  test('fetches holidays when component mounts', async () => {
    const fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(
        new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        })
      );
    render(<Calendar />);
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    fetchSpy.mockRestore();
  });

  test('fetches holidays when location changes', async () => {
    const fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(
        new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        })
      );
    const { getByText } = render(<Calendar />);
    fireEvent.click(getByText('Get Holidays'));
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
    fetchSpy.mockRestore();
  });
});
