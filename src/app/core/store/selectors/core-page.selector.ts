import { createSelector } from '@ngrx/store';
import { Currencies, ICurrency } from '../../../interfaces';
import { getCurrenciesForDropdownOptions } from '@app/shared/utils';
import { ICoreModuleState } from '../reducers';
import { ICorePageState } from '../reducers/core-page.reducer';

export const selectCorePage = (state: ICoreModuleState) => state?.corePage;

export const selectRoles = createSelector(selectCorePage, (state: ICorePageState) => state?.roles);

export const selectCurrencies = createSelector(
  selectCorePage,
  (state: ICorePageState): Currencies => state?.currencies,
);

export const selectTransformCurrencies = createSelector(
  selectCurrencies,
  (currencies: ICurrency[]) => currencies && getCurrenciesForDropdownOptions(currencies),
);
