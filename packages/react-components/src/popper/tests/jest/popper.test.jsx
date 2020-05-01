import { Button } from "@react-components/button";
import { Popper } from "@react-components/popper";
import { createRef, forwardRef, useState } from "react";
import { isNil } from "lodash";
import { render, wait } from "@testing-library/react";
import userEvent from "@utils/user-event";

const POPPER_WRAPPER_ID = "popper-wrapper";

function PureDummyPopper({ forwardedRef, ...rest }) {
    const [triggerElement, setTriggerElement] = useState(null);

    return (
        <>
            <Button ref={setTriggerElement}>Open</Button>
            <If condition={!isNil(triggerElement)}>
                <Popper
                    show
                    animate={false}
                    triggerElement={triggerElement}
                    ref={forwardedRef}
                    {...rest}
                >
                    <div>Popper</div>
                </Popper>
            </If>
        </>
    );
}

const DummyPopper = forwardRef((props, ref) => (
    <PureDummyPopper { ...props } forwardedRef={ref} />
));

function createPopper(props = {}) {
    return <DummyPopper {...props} />;
}

// ***** Behaviors *****

test("don't toggle popper when disabled", async () => {
    const { getByTestId, queryByTestId } = render(
        createPopper({
            disabled: true
        })
    );

    userEvent.click(getByTestId("button"));
    await wait();

    expect(queryByTestId(POPPER_WRAPPER_ID)).not.toBeInTheDocument();
});

// ***** API *****

test("spread additional props on the root element", async () => {
    const ref = createRef();

    render(
        createPopper({
            ref,
            "data-extra-props-test": "works"
        })
    );

    await wait();

    expect(ref.current.getAttribute("data-extra-props-test")).toBe("works");
});

// ***** Refs *****

test("when wrapped, ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createPopper({
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe(POPPER_WRAPPER_ID);
});

test("when wrapped, using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createPopper({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe(POPPER_WRAPPER_ID);
});

test("when not wrapped, ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createPopper({
            noWrap: true,
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).not.toBe(POPPER_WRAPPER_ID);
});

test("when not wrapped and using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createPopper({
            noWrap: true,
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).not.toBe(POPPER_WRAPPER_ID);
});