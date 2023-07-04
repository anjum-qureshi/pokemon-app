import React from 'react';
import { render, act } from '@testing-library/react';
import App from './App';
import { allPokemonsResponse, pokemonData } from './testData';

describe('App test', () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve(allPokemonsResponse);
          },
        });
      })
      .mockImplementation(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve(pokemonData);
          },
        });
      });
  });

  afterEach(() => {
    global.fetch.mockClear();
    jest.restoreAllMocks();
  });

  it('Generate snapshot for App', async () => {
    const container = render(<App />);
    await act(async () => {});
    expect(container).toMatchSnapshot();
  });
});
