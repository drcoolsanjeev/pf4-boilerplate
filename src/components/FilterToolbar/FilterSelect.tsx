import React, { useState } from "react";
import {
  Select,
  SelectVariant,
  SelectOption,
  SelectOptionObject
} from "@patternfly/react-core";

export interface IOption {
  key: string;
  value: string;
  id: string;
  label?: string;
  disabled?: boolean;
  isPlaceHolder?: boolean;
  description?: string;
}

export interface IFilterSelectProps {
  options: IOption[];
  id: string;
  ariaLabel: string;
  values: IOption[];
  className?: string;
  childClassName?: string;
  setValues?: (values?: IOption[]) => void;
}

const FilterSelect: React.FC<IFilterSelectProps> = ({
  options,
  id,
  ariaLabel,
  values,
  className,
  childClassName,
  setValues
}) => {
  const [isExanded, setIsExpanded] = useState<boolean>(false);
  const getSelections = () => {
    return values?.map(value => value.value);
  };
  const onToggle = () => {
    setIsExpanded(!isExanded);
  };
  const onClear = () => {
    setValues && setValues(undefined);
  };
  const getFilteredOption = (selection: string | SelectOptionObject) => {
    return options?.filter(option => option.value === selection.toString())[0];
  };
  const onSelect = (
    _event: React.MouseEvent<Element, MouseEvent> | React.ChangeEvent<Element>,
    value: string | SelectOptionObject,
    isPlaceholder?: boolean | undefined
  ) => {
    if (isPlaceholder) onClear();
    const selection = getFilteredOption(value);
    if (setValues && value) {
      if (values && values.length > 0) {
        setValues([...values, selection]);
      } else {
        setValues([selection]);
      }
    }
    setIsExpanded(false);
  };
  return (
    <>
      <Select
        variant={SelectVariant.single}
        aria-label={ariaLabel}
        className={className}
        id={id}
        onToggle={onToggle}
        onSelect={onSelect}
        selections={getSelections()}
        isOpen={isExanded}
      >
        {options.map((option, index) => (
          <SelectOption
            className={childClassName}
            id={option.id}
            isDisabled={option.disabled}
            key={option.key || option.id + index}
            value={option.value}
            label={option.label}
            description={option.description}
          />
        ))}
      </Select>
    </>
  );
};

export { FilterSelect };
