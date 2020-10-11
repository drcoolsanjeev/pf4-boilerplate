import { SelectOption } from "@patternfly/react-core";
import { TypeAheadMessage } from "constant";
export interface ISelectOption {
  value: string;
  isDisabled?: boolean;
  key?: string;
  label?: string;
  id?: string;
}

/**
 * Create a object of type ISelectOption
 * @param value
 * @param isDisabled
 */
const createSelectOptionObject = (value: string, isDisabled: boolean) => {
  const data: ISelectOption = {
    key: `key-${value}`,
    id: `id-${value}`,
    value: value,
    isDisabled: isDisabled
  };
  return data;
};

const compareObject = (obj1: any, obj2: any) => {
  if (obj1 && obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
};

export { createSelectOptionObject };
