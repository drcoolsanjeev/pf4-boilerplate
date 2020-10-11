/*
 * Copyright 2020, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import React, { useState } from "react";
import {
  Select,
  SelectVariant,
  SelectProps,
  SelectOptionObject,
  SelectOption
} from "@patternfly/react-core";
import { TYPEAHEAD_REQUIRED_LENGTH, TypeAheadMessage } from "constant";

const initalSelectOption = (
  <SelectOption
    value={TypeAheadMessage.MORE_CHAR_REQUIRED}
    key="1"
    isDisabled={true}
  />
);

export interface ITypeAheadSelectProps extends Omit<SelectProps, "onToggle"> {
  id?: string;
  selected?: string | SelectOptionObject | (string | SelectOptionObject)[];
  ariaLabelledBy?: string;
  inputData?: string;
  onChangeInput?: (value: string) => Promise<any>;
  setInput?: (value: string) => void;
  isMultiple?: boolean;
  threshold?: number;
}

const TypeAheadSelect: React.FunctionComponent<ITypeAheadSelectProps> = ({
  typeAheadAriaLabel,
  ariaLabelledBy,
  onSelect,
  onClear,
  selected,
  inputData,
  placeholderText,
  onChangeInput,
  setInput,
  id,
  isMultiple = false,
  isCreatable,
  threshold
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [options, setOptions] = useState<any[]>([initalSelectOption]);

  const variant = isMultiple
    ? SelectVariant.typeaheadMulti
    : SelectVariant.typeahead;

  const onToggle = (isExpanded: boolean) => {
    setIsExpanded(isExpanded);
  };

  const onTypeAheadSelect = (e: any, selection: SelectOptionObject) => {
    onSelect && onSelect(e, selection);
    !isMultiple && setIsExpanded(false);
  };

  const onFilter = (e: any) => {
    const input = e.target.value && e.target.value.trim();
    setInput && setInput(input);
    if (input.trim().length < (threshold || TYPEAHEAD_REQUIRED_LENGTH)) {
      setOptions([
        <SelectOption
          value={TypeAheadMessage.MORE_CHAR_REQUIRED}
          isDisabled={true}
          key="2"
        />
      ]);
    } else {
      onChangeInput &&
        onChangeInput(input).then((data: any) => {
          const list = data;
          const options = list
            ? list.map((object: any, index: number) => (
                <SelectOption
                  disabled={object.isDisabled}
                  key={index}
                  value={object.value}
                />
              ))
            : [];
          if (options && options.length > 0) {
            setOptions(options);
          } else {
            !isCreatable &&
              setOptions([
                <SelectOption
                  key={0}
                  value={TypeAheadMessage.NO_RESULT_FOUND}
                  isDisabled={true}
                />
              ]);
          }
        });
    }

    let options: any[] = [];
    if (!isCreatable) {
      options = [
        <SelectOption
          value={TypeAheadMessage.MORE_CHAR_REQUIRED}
          key="1"
          isDisabled={true}
        />
      ];
    }

    return options;
  };

  return (
    <Select
      id={id}
      variant={variant}
      typeAheadAriaLabel={typeAheadAriaLabel}
      onToggle={onToggle}
      onSelect={onTypeAheadSelect}
      onClear={onClear}
      onFilter={onFilter}
      selections={selected || inputData}
      isOpen={isExpanded}
      aria-labelledby={ariaLabelledBy}
      placeholderText={placeholderText}
      isCreatable={isCreatable}
    >
      {options}
    </Select>
  );
};

export { TypeAheadSelect };
