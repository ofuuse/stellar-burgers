import { expect, test, describe } from '@jest/globals';
import { MOCK_INGREDIENTS } from '../../utils/constant';
import reducer, {
  initialState,
  addIngredient,
  upIngredient,
  downIngredient,
  removeIngredient,
  clearburgerAssembler,
  TBurgerAssemblerState
} from './burgetAssemblerSlice';

describe('burgerAssemblerSlice reducer', () => {
  test('should return the initial state', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('should add a non-bun ingredient', () => {
    const ingredient = { ...MOCK_INGREDIENTS[0], type: 'sauce' };
    const action = addIngredient(ingredient);
    const newState = reducer(initialState, action);

    expect(newState.burgerAssembler.ingredients.length).toBe(1);
    const added = newState.burgerAssembler.ingredients[0];

    expect(added).toEqual(
      expect.objectContaining({
        _id: ingredient._id,
        name: ingredient.name,
        type: ingredient.type,
        calories: ingredient.calories,
        price: ingredient.price,
        fat: ingredient.fat,
        carbohydrates: ingredient.carbohydrates,
        image: ingredient.image,
        image_large: ingredient.image_large,
        image_mobile: ingredient.image_mobile
      })
    );

    expect(typeof added.id).toBe('string');
  });

  test('should add a bun and replace existing one', () => {
    const bun1 = { ...MOCK_INGREDIENTS[1], type: 'bun' };
    const bun2 = { ...MOCK_INGREDIENTS[2], type: 'bun' };

    let state = reducer(initialState, addIngredient(bun1));
    expect(state.burgerAssembler.bun).toEqual(
      expect.objectContaining({
        _id: bun1._id,
        name: bun1.name,
        type: 'bun'
      })
    );

    state = reducer(state, addIngredient(bun2));
    expect(state.burgerAssembler.bun).toEqual(
      expect.objectContaining({
        _id: bun2._id,
        name: bun2.name,
        type: 'bun'
      })
    );
  });

  test('should move ingredient up', () => {
    const ingredients = [
      { ...MOCK_INGREDIENTS[1], id: 'id-1' },
      { ...MOCK_INGREDIENTS[2], id: 'id-2' }
    ];

    const prevState: TBurgerAssemblerState = {
      ...initialState,
      burgerAssembler: {
        bun: null,
        ingredients
      },
      error: null
    };

    const action = upIngredient(1);
    const newState = reducer(prevState, action);

    expect(newState.burgerAssembler.ingredients).toEqual([
      ingredients[1],
      ingredients[0]
    ]);
  });

  test('should move ingredient down', () => {
    const ingredients = [
      { ...MOCK_INGREDIENTS[1], id: 'id-1' },
      { ...MOCK_INGREDIENTS[2], id: 'id-2' }
    ];

    const prevState: TBurgerAssemblerState = {
      ...initialState,
      burgerAssembler: {
        bun: null,
        ingredients
      },
      error: null
    };

    const action = downIngredient(0);
    const newState = reducer(prevState, action);

    expect(newState.burgerAssembler.ingredients).toEqual([
      ingredients[1],
      ingredients[0]
    ]);
  });

  test('should remove an ingredient by id', () => {
    const ingredientWithId = { ...MOCK_INGREDIENTS[1], id: 'unique-id' };

    const prevState: TBurgerAssemblerState = {
      ...initialState,
      burgerAssembler: {
        bun: null,
        ingredients: [ingredientWithId]
      },
      error: null
    };

    const action = removeIngredient(ingredientWithId);
    const newState = reducer(prevState, action);

    expect(newState.burgerAssembler.ingredients).toEqual([]);
  });

  test('should clear all ingredients and bun', () => {
    const prevState: TBurgerAssemblerState = {
      ...initialState,
      burgerAssembler: {
        bun: MOCK_INGREDIENTS[0],
        ingredients: [MOCK_INGREDIENTS[1], MOCK_INGREDIENTS[2]]
      },
      error: null
    };

    const action = clearburgerAssembler();
    const newState = reducer(prevState, action);

    expect(newState.burgerAssembler.bun).toBeNull();
    expect(newState.burgerAssembler.ingredients).toEqual([]);
  });
});
