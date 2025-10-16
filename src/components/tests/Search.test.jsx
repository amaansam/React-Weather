// Purpose: Tests for Search component
import '@testing-library/jest-dom';
// Search.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../Search';

function SearchWithState(props) {
  const [location, setLocation] = React.useState('');
  return (
    <Search
      location={location}
      setLocation={(value) => { setLocation(value); props.onSet?.(value); }}
      onKeyDown={jest.fn()}
      selectedDate=""
      onDateChange={jest.fn()}
      disabled={false}
      today="2025-10-16"
      fiveDaysAhead="2025-10-21"
    />
  );
}

describe('Search', () => {

  test('renders location input, date input, and info button', () => {
    render(
      <Search
        location=""
        setLocation={jest.fn()}
        onKeyDown={jest.fn()}
        selectedDate=""
        onDateChange={jest.fn()}
        disabled={false}
        today="2025-10-16"
        fiveDaysAhead="2025-10-21"
      />
    );

    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/forecast date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /date help/i })).toBeInTheDocument();
  });

  test('typing into location updates visible value (stateful usage)', async () => {
    const onSet = jest.fn();
    render(<SearchWithState onSet={onSet} />);

    const input = screen.getByLabelText(/location/i);
    await userEvent.type(input, 'London');

    expect(onSet).toHaveBeenCalled();
    expect(onSet).toHaveBeenLastCalledWith('London');
    expect(input).toHaveValue('London');
  });


  test('pressing Enter in location input calls onKeyDown with Enter event', async () => {
    const onKeyDown = jest.fn();
    render(
      <Search
        location="Paris"
        setLocation={jest.fn()}
        onKeyDown={onKeyDown}
        selectedDate=""
        onDateChange={jest.fn()}
        disabled={false}
        today="2025-10-16"
        fiveDaysAhead="2025-10-21"
      />
    );

    const input = screen.getByLabelText(/location/i);
    input.focus();
    await userEvent.keyboard('{Enter}');

    expect(onKeyDown).toHaveBeenCalled();
    const eventArg = onKeyDown.mock.calls[0][0];
    expect(eventArg.key).toBe('Enter');
  });


  test('date input is disabled when disabled prop is true', () => {
    render(
      <Search
        location=""
        setLocation={jest.fn()}
        onKeyDown={jest.fn()}
        selectedDate=""
        onDateChange={jest.fn()}
        disabled={true}
        today="2025-10-16"
        fiveDaysAhead="2025-10-21"
      />
    );

    expect(screen.getByLabelText(/forecast date/i)).toBeDisabled();
  });


  test('changing the date calls onDateChange', async () => {
    const onDateChange = jest.fn();
    render(
      <Search
        location="Rome"
        setLocation={jest.fn()}
        onKeyDown={jest.fn()}
        selectedDate=""
        onDateChange={onDateChange}
        disabled={false}
        today="2025-10-16"
        fiveDaysAhead="2025-10-21"
      />
    );

    const dateInput = screen.getByLabelText(/forecast date/i);
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-18');

    expect(onDateChange).toHaveBeenCalled();
  });
});