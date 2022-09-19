import { IInput, IAdapterIdValue, IAdapterLabelValue } from '@entities';

export const adapterSelectAnswers = (data: IInput[]):IAdapterIdValue[] => data.map(
  (item: IInput): IAdapterIdValue => ({
    id: item.id,
    value: item.name,
  }),
);

export const adapterLabelValue = (data: IInput[]):IAdapterLabelValue[] => data.map(
  (item: IInput): IAdapterLabelValue => ({
    label: item.name,
    value: item.id,
  }),
);
