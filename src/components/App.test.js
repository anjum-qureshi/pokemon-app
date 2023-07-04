import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
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
    const container = await render(<App />);
    await act(async () => {});
    expect(container).toMatchSnapshot();
    // const { getAllByTestId } = container;

    // await waitFor(async () => {
    //   const tiles = await getAllByTestId('pokemon-tile');
    //   expect(tiles).toHaveLength(2);
    // });
  });

  //   it('Should render first two pokemons when app is rendered', async () => {
  //     const container = await render(<App />);
  //     await act(async () => {});

  //     const { getAllByTestId, queryAllByTestId } = container;
  //     const tiles = await getAllByTestId('pokemon-tile');
  //     expect(tiles).toHaveLength(2);
  //   });
});
