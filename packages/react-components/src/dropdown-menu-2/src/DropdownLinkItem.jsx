import { DropdownItem } from "./DropdownItem";
import { elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The HTML href attribute.
     */
    href: string.isRequired,
    /**
     * The HTML target attribute.
     */
    target: string,
    /**
     * The HTML rel attribute.
     */
    rel: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerDropdownLinkItem({ as, forwardedRef, ...rest }) {
    return (
        <DropdownItem
            {...rest}
            as={as || "a"}
            ref={forwardedRef}
        />
    );
}

InnerDropdownLinkItem.propTypes = propTypes;

export const DropdownLinkItem = forwardRef((props, ref) => (
    <InnerDropdownLinkItem {...props} forwardedRef={ref} />
));

DropdownLinkItem.name = "DropdownItem";
