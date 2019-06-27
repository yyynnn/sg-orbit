import { ReactComponent as AddIcon } from "./assets/icon-add.svg";
import { AutoControlledPureComponent, getAutoControlledStateFromProps } from "@sharegate/react-components-shared";
import { Button, Dropdown, Label } from "semantic-ui-react";
import { ITEM_SHAPE } from "./items";
import { ReactComponent as MagnifierIcon } from "./assets/icon-magnifier.svg";
import { MultiSelectClearButton } from "./multi-select-clear-button";
import { MultiSelectDropdown } from "./multi-select-dropdown";
import { MultiSelectDropdownMenu } from "./multi-select-dropdown-menu";
import { MultiSelectDropdownSearchInput } from "./multi-select-dropdown-search-input";
import { MultiSelectDropdownTrigger } from "./multi-select-dropdown-trigger";
import { MultiSelectSelectedItems } from "./multi-select-selected-items";
import { ReactComponent as RemoveIcon } from "./assets/icon-remove.svg";
import { arrayOf, bool, func, node, shape, string } from "prop-types";
import { cloneElement } from "react";
import { isNil } from "lodash";
import cx from "classnames";

const GROUP_ERROR_MESSAGE = "MultiSelect - When at least one item has a \"group\" property, all items must have a \"group\" property.";

function defaultItemRenderer(item, isSelected) {
    return <Dropdown.Item text={item.text} value={item.value} selected={isSelected} />;
}

function defaultHeaderRenderer(group) {
    return <Dropdown.Header content={group} />;
}

function defaultSelectedItemRenderer(item, { disabled, onRemove }) {
    return (
        <Label basic className={cx("large", { icon: !disabled })} disabled={disabled}>
            {item.text}
            <If condition={!disabled}>
                <Button circular size="mini" icon className="transparent" onClick={onRemove}>
                    <RemoveIcon />
                </Button>
            </If>
        </Label>
    );
}

export function startsWithSearch(event, items, query) {
    return items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase()));
}

function getSelectedItems(items, values) {
    // This is a mapping of the values to preserve the selection order of the items.
    return values.map(x => items.find(item => item.value === x));
}

function getAvailableItems(items, values) {
    // This is a filtering of the items to preserve the original order of the items.
    return items.filter(x => !values.includes(x.value));
}

function computeDerivedState(items, values) {
    return {
        selectedItems: getSelectedItems(items, values),
        availableItems: getAvailableItems(items, values),
        dropdownItems: getAvailableItems(items, values)
    };
}

export class MultiSelect extends AutoControlledPureComponent {
    static propTypes = {
        items: arrayOf(shape(ITEM_SHAPE)).isRequired,
        values: arrayOf(string),
        defaultValues: arrayOf(string),
        onValuesChange: func.isRequired,
        dropdown: node,
        onSearch: func,
        itemRenderer: func,
        headerRenderer: func,
        closeOnSelect: bool,
        noResultsMessage: string,
        triggerText: string,
        triggerIcon: node,
        searchIcon: node,
        placeholder: string,
        selectedItemsComponent: node,
        selectedItemRenderer: func,
        clearButton: node,
        clearText: string,
        disabled: bool,
        className: string
    };

    static defaultProps = {
        dropdown: <MultiSelectDropdown />,
        onSearch: startsWithSearch,
        itemRenderer: defaultItemRenderer,
        headerRenderer: defaultHeaderRenderer,
        closeOnSelect: false,
        noResultsMessage: "No results",
        triggerText: "Add",
        triggerIcon: <AddIcon />,
        searchIcon: <MagnifierIcon />,
        placeholder: "Search",
        selectedItemsComponent: <MultiSelectSelectedItems />,
        selectedItemRenderer: defaultSelectedItemRenderer,
        clearButton: <MultiSelectClearButton />,
        clearText: "Clear all",
        disabled: false
    };

    static autoControlledProps = ["values"];

    // Expose sub-components.
    static Dropdown = MultiSelectDropdown;
    static Trigger = MultiSelectDropdownTrigger;
    static Menu = MultiSelectDropdownMenu;
    static SearchInput = MultiSelectDropdownSearchInput;
    static SelectedItems = MultiSelectSelectedItems;
    static ClearButton = MultiSelectClearButton;

    state = {
        values: [],
        selectedItems: [],
        availableItems: [],
        dropdownItems: []
    };

    componentDidMount() {
        this.validateGrouping();
    }

    componentDidUpdate(prevProps) {
        const { items } = this.props;

        if (prevProps.items !== items) {
            this.validateGrouping();
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { items } = props;

        return getAutoControlledStateFromProps(props, state, MultiSelect.autoControlledProps, ({ values }) => computeDerivedState(items, values));
    }

    handleSearch = (event, query) => {
        const { onSearch } = this.props;
        const { availableItems } = this.state;

        const results = onSearch(event, availableItems, query);

        this.setState({ dropdownItems: results });
    };

    handleItemSelect = (event, item) => {
        const { values } = this.state;

        this.setValues(event, [...values, item.value]);
    };

    handleRemoveSelectedItem = (event, item) => {
        const { values } = this.state;

        this.setValues(event, values.filter(x => x !== item.value));
    };

    handleClose = () => {
        const { availableItems } = this.state;

        this.setState({ dropdownItems: availableItems });
    };

    handleClear = event => {
        const { items } = this.props;

        this.setValues(event, [], [], items, items);
    };

    setValues(event, newValues) {
        const { items, onValuesChange } = this.props;

        this.trySetAutoControlledStateValue({ values: newValues }, () => computeDerivedState(items, newValues));

        onValuesChange(event, newValues);
    }

    validateGrouping() {
        const { items } = this.props;

        let isGrouped = false;

        items.forEach((x, index) => {
            if (isGrouped) {
                if (isNil(x.group)) {
                    // Others have a group.
                    throw new Error(GROUP_ERROR_MESSAGE);
                }
            } else {
                if (!isNil(x.group)) {
                    if (index === 0) {
                        isGrouped = true;
                    } else {
                        // This item have a group but others dont.
                        throw new Error(GROUP_ERROR_MESSAGE);
                    }
                }
            }
        });
    }

    renderDropDown = () => {
        const { itemRenderer, headerRenderer, closeOnSelect, dropdown, triggerText, triggerIcon, searchIcon, placeholder, noResultsMessage, disabled } = this.props;
        const { dropdownItems } = this.state;

        return cloneElement(dropdown, {
            items: dropdownItems,
            onSearch: this.handleSearch,
            onItemSelect: this.handleItemSelect,
            onClose: this.handleClose,
            itemRenderer,
            headerRenderer,
            closeOnSelect,
            triggerText,
            triggerIcon,
            searchIcon,
            placeholder,
            noResultsMessage,
            disabled
        });
    };

    renderSelectedItems = () => {
        const { selectedItemsComponent, selectedItemRenderer, disabled } = this.props;
        const { selectedItems } = this.state;

        return cloneElement(selectedItemsComponent, {
            items: selectedItems,
            selectedItemRenderer,
            onRemoveSelectedItem: this.handleRemoveSelectedItem,
            disabled
        });
    };

    renderClearButton = () => {
        const { clearButton, clearText, disabled } = this.props;
        const { values } = this.state;

        if (values.length === 0 || disabled) {
            return null;
        }

        return cloneElement(clearButton, {
            onClick: this.handleClear,
            text: clearText
        });
    };

    render() {
        const { className } = this.props;

        const defaultClasses = "flex flex-wrap";
        const classes = isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;

        return (
            <div className={classes}>
                {this.renderDropDown()}
                {this.renderSelectedItems()}
                <div className="mr2 mb2">{this.renderClearButton()}</div>
            </div>
        );
    }
}