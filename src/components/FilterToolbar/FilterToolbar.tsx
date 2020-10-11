import React from "react";
import {
  ToolbarItem,
  ToolbarFilter,
  InputGroup,
  SelectOptionObject,
  Button,
  ButtonVariant
} from "@patternfly/react-core";
import { IOption, IFilterSelectProps, FilterSelect } from "./FilterSelect";
import { TypeAheadSelect } from "components/TypeAheadSelect";
import { SearchIcon } from "@patternfly/react-icons";

interface ITypeAheadProps {
  ariaLabel?: string;
  aria?: string;
  selections: IOption[];
  onSelect?: (
    event: React.MouseEvent | React.ChangeEvent,
    value: string | SelectOptionObject,
    isPlaceholder?: boolean
  ) => void;
  onClear?: () => void;
  inputData?: string;
  placeholderText?: string;
  onChangeInput?: () => Promise<any>;
  setInput?: (value?: string) => void;
}
interface IToolbarOption {
  id?: string;
  filterSelect: IFilterSelectProps;
  isTypeInput?: boolean;
  categoryName: string;
  typeaheadProps?: ITypeAheadProps;
  dropdownProps?: IFilterSelectProps;
}
interface IFilterToolbarProps {
  filters: IToolbarOption[];
  selectedFilter?: string;
  searchButtonAriaLabel?: string;
  onDelete?: () => void;
  onSearch?: () => void;
}
const FilterToolbar: React.FC<IFilterToolbarProps> = ({
  filters,
  selectedFilter,
  searchButtonAriaLabel,
  onDelete,
  onSearch
}) => {
  return (
    <>
      {filters.map((filter, index) => (
        <ToolbarItem
          spacer={{ md: "spacerNone" }}
          data-codemods="true"
          id={`${filter.id}-toolbar-item`}
        >
          <ToolbarFilter
            id={`${filter.id}-toolbar-filter`}
            chips={filter.filterSelect.values.map(filter => filter.value)}
            deleteChip={onDelete}
            categoryName={filter.categoryName}
          >
            {selectedFilter &&
              selectedFilter.toLowerCase() ===
                filter.filterSelect.options[index].value.toLowerCase() && (
                <InputGroup>
                  <FilterSelect {...filter.filterSelect} />
                  {filter.isTypeInput ? (
                    <>
                      {filter.typeaheadProps && (
                        <TypeAheadSelect
                          id={`${filter.id}-type-ahead`}
                          typeAheadAriaLabel={filter.typeaheadProps.ariaLabel}
                          aria-LabelledBy={filter.typeaheadProps.aria}
                          onSelect={filter.typeaheadProps.onSelect}
                          onClear={filter.typeaheadProps.onClear}
                          selected={filter.typeaheadProps.selections}
                          inputData={filter.typeaheadProps.inputData || ""}
                          placeholderText={
                            filter.typeaheadProps.placeholderText
                          }
                          onChangeInput={filter.typeaheadProps.onChangeInput}
                          setInput={filter.typeaheadProps.setInput}
                        />
                      )}
                      <Button
                        id={`${filter.id}-search-button`}
                        variant={ButtonVariant.control}
                        aria-label={searchButtonAriaLabel}
                        onClick={onSearch}
                      >
                        <SearchIcon />
                      </Button>
                    </>
                  ) : (
                    filter.dropdownProps && (
                      <FilterSelect {...filter.dropdownProps} />
                    )
                  )}
                </InputGroup>
              )}
          </ToolbarFilter>
        </ToolbarItem>
      ))}
    </>
  );
};

export { FilterToolbar };
