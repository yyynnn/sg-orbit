import { Select } from "@react-components/select";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

const GENDERS = [
    {
        key: "Male",
        text: "Male",
        value: "Male"
    },
    {
        key: "Female",
        text: "Female",
        value: "Female"
    }
];

function createSelect(props = {}) {
    return <Select
        options={GENDERS}
        {...props}
    />;
}

function getDropdownMenu(container) {
    return container.querySelector("div.menu.visible");
}

// ***** Behaviors *****

test("open the select on spacebar keydown", async () => {
    const { getByTestId, container } = render(createSelect());

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());
});

test("open the select on enter keydown", async () => {
    const { getByTestId, container } = render(createSelect());

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());
});

test("close the select on spacebar keydown", async () => {
    const { getByTestId, container } = render(createSelect());

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).not.toBeInTheDocument());
});

test("close the select on enter keydown", async () => {
    const { getByTestId, container } = render(createSelect());

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).not.toBeInTheDocument());
});

test("can open the select on enter keydown after closing on blur", async () => {
    const { getByTestId, container } = render(createSelect());

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.click(document);
    });

    await waitFor(() => expect(getDropdownMenu(container)).not.toBeInTheDocument());

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createSelect({
            ref
        })
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createSelect({
            ref: node => {
                refNode = node;
            }
        })
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("dropdown-wrapper");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        createSelect({
            ref: handler
        })
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
