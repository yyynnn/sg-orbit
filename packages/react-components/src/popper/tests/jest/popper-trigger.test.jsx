import { Button } from "@react-components/button";
import { PopperTrigger } from "@react-components/popper";
import { act, fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/user-event";

const TRIGGER_ID = "button";
const POPPER_ID = "popper-wrapper";
const POPPER_FOCUSABLE_ELEMENT_ID = "popper-focusable-element";

function createPopperTrigger(popperProps = {}, triggerProps = {}) {
    return (
        <PopperTrigger
            trigger={<Button {...triggerProps} />}
            toggleHandler="onClick"
            {...popperProps}
        >
            <div><a href="https://www.google.com" data-testid={POPPER_FOCUSABLE_ELEMENT_ID}>Focus element in popper</a></div>
        </PopperTrigger>
    );
}

async function showPopper(getByTestId) {
    userEvent.click(getByTestId(TRIGGER_ID));

    const popperNode = await waitForElement(() => getByTestId(POPPER_ID));

    return popperNode;
}

// ***** Behaviors *****

test("show the popper on trigger toggle", async () => {
    const { getByTestId } = render(createPopperTrigger());

    userEvent.click(getByTestId(TRIGGER_ID));

    const popperNode = await waitForElement(() => getByTestId(POPPER_ID));

    expect(popperNode).toBeInTheDocument();
});

test("show the popper on spacebar keydown", async () => {
    const { getByTestId } = render(createPopperTrigger());

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });

    const popperNode = await waitForElement(() => getByTestId(POPPER_ID));

    expect(popperNode).toBeInTheDocument();
});

test("show the popper on enter", async () => {
    const { getByTestId } = render(createPopperTrigger());

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });

    const popperNode = await waitForElement(() => getByTestId(POPPER_ID));

    expect(popperNode).toBeInTheDocument();
});

test("when showOnSpacebar is false, dont show the popper on spacebar keydown", async () => {
    const { getByTestId, queryByTestId } = render(createPopperTrigger({
        showOnSpacebar: false
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });

    expect(queryByTestId(POPPER_ID)).not.toBeInTheDocument();
});

test("when showOnEnter is false, dont show the popper on enter keydown", async () => {
    const { getByTestId, queryByTestId } = render(createPopperTrigger({
        showOnEnter: false
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 13 });

    expect(queryByTestId(POPPER_ID)).not.toBeInTheDocument();
});

test("when focusTriggerOnShow is true, focus the trigger on show", async () => {
    const { getByTestId } = render(createPopperTrigger({
        focusTriggerOnShow: true
    }));

    await showPopper(getByTestId);

    expect(getByTestId(TRIGGER_ID)).toHaveFocus();
});

test("when focusPopperOnShow is true, focus the first popper focusable element on show", async () => {
    const { getByTestId } = render(createPopperTrigger({
        focusPopperOnShow: true
    }));

    await showPopper(getByTestId);

    expect(getByTestId(POPPER_FOCUSABLE_ELEMENT_ID)).toHaveFocus();
});

test("when disabled, dont show the popper on trigger toggle", async () => {
    const { getByTestId, queryByTestId } = render(createPopperTrigger({
        disabled: true
    }));

    userEvent.click(getByTestId(TRIGGER_ID));
    await wait();

    expect(queryByTestId(POPPER_ID)).not.toBeInTheDocument();
});

test("hide the popper on esc keydown", async () => {
    const { getByTestId } = render(createPopperTrigger());

    const popperNode = await showPopper(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(popperNode).not.toBeInTheDocument();
});

test("hide the popper on outside click", async () => {
    const { getByTestId } = render(createPopperTrigger());

    const popperNode = await showPopper(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(popperNode).not.toBeInTheDocument();
});

test("hide the popper on trigger toggle", async () => {
    const { getByTestId } = render(createPopperTrigger());

    const popperNode = await showPopper(getByTestId);

    userEvent.click(getByTestId(TRIGGER_ID));
    await wait();

    expect(popperNode).not.toBeInTheDocument();
});

test("hide the popper on blur", async () => {
    const { getByTestId } = render(createPopperTrigger());

    const popperNode = await showPopper(getByTestId);

    getByTestId(TRIGGER_ID).blur();
    await wait();

    expect(popperNode).not.toBeInTheDocument();
});

test("when the popper hide on esc keydown, the trigger should be focused", async () => {
    const { getByTestId } = render(createPopperTrigger());

    await showPopper(getByTestId);

    getByTestId(POPPER_FOCUSABLE_ELEMENT_ID).focus();

    const triggerNode = getByTestId(TRIGGER_ID);

    expect(triggerNode).not.toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(triggerNode).toHaveFocus();
});

test("when hideOnBlur is false, dont hide the popper on blur", async () => {
    const { getByTestId } = render(createPopperTrigger({
        hideOnBlur: false
    }));

    const popperNode = await showPopper(getByTestId);

    userEvent.click(document.body);
    await wait();

    getByTestId(POPPER_FOCUSABLE_ELEMENT_ID).focus();
    await wait();

    expect(popperNode).toBeInTheDocument();
});

test("when hideOnBlur is false and hideOnOutsideClick is true, hide the popper on outside click", async () => {
    const { getByTestId } = render(createPopperTrigger({
        hideOnBlur: false,
        hideOnOutsideClick: true
    }));

    const popperNode = await showPopper(getByTestId);

    act(() => userEvent.click(document.body));
    await wait();

    expect(popperNode).not.toBeInTheDocument();
});

test("when hideOnEscape is false, dont hide the popper on escape keydown", async () => {
    const { getByTestId } = render(createPopperTrigger({
        hideOnEscape: false
    }));

    const popperNode = await showPopper(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(popperNode).toBeInTheDocument();
});

test("when focusTriggerOnEscape is false, dont focus the trigger on escape keydown", async () => {
    const { getByTestId } = render(createPopperTrigger({
        focusTriggerOnEscape: false
    }));

    await showPopper(getByTestId);

    getByTestId(POPPER_FOCUSABLE_ELEMENT_ID).focus();

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(getByTestId(TRIGGER_ID)).not.toHaveFocus();
});

// ***** API *****

test("consumer can set is own toggle handler", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        createPopperTrigger({}, {
            onClick: handler
        })
    );

    userEvent.click(getByTestId("button"));
    await wait();

    expect(handler).toHaveBeenCalled();
});

test("call onVisibilityChange when the popper is showed with a trigger toggle", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    userEvent.click(getByTestId(TRIGGER_ID));

    await waitForElement(() => getByTestId(POPPER_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true);
});

test("call onVisibilityChange when the popper is showed with space keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });

    await waitForElement(() => getByTestId(POPPER_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true);
});

test("call onVisibilityChange when the popper is showed with enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });

    await waitForElement(() => getByTestId(POPPER_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true);
});

test("call onVisibilityChange when the calendar is hided with an outside click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    await showPopper(getByTestId);

    userEvent.click(document.body);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

test("call onVisibilityChange when the calendar is hided with esc keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    await showPopper(getByTestId);

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

test("call onVisibilityChange when the calendar hide on blur", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    await showPopper(getByTestId);

    getByTestId(TRIGGER_ID).blur();
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

test("spread additional props on the root element", async () => {
    const ref = createRef();

    render(
        createPopperTrigger({
            ref,
            "data-extra-props-test": "works"
        })
    );

    await wait();

    expect(ref.current.getAttribute("data-extra-props-test")).toBe("works");
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createPopperTrigger({
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe("popper-trigger");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createPopperTrigger({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("popper-trigger");
});