// WeatherDisplay.test.jsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import WeatherDisplay from '../WeatherDisplay';

describe('WeatherDisplay', () => {
  test('renders location name and temperature', () => {
    render(
      <WeatherDisplay
        displayName="Paris"
        displayTemp={21}
        displayDesc="clear sky"
      />
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('21°C')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
  });
});