import { CommunicationIcon } from "@react-components/icons";
import { Label } from "@react-components/label";
import { cloneElement } from "react";

function Toggle({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Icons({ element, ...rest }) {
    const radio = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Toggle icons={<CommunicationIcon />} size="small" element={radio} className="mr5" />
                <Toggle icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Toggle icons={<CommunicationIcon />} size="large" element={radio} />
            </div>
            <div className="flex items-end mb8">
                <Toggle icons={[<CommunicationIcon />, <CommunicationIcon />]} size="small" element={radio} className="mr5" />
                <Toggle icons={[<CommunicationIcon />, <CommunicationIcon />]} element={radio} className="mr5" />
                <Toggle icons={[<CommunicationIcon />, <CommunicationIcon />]} size="large" element={radio} />
            </div>
            <div className="flex items-end mb8">
                <Toggle active icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Toggle focus icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Toggle hover icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Toggle focus hover icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Toggle readOnly icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Toggle disabled icons={<CommunicationIcon />} element={radio} className="mr5" />
            </div>
            <div className="flex items-end mb8">
                <Toggle label={<Label>6</Label>} icons={<CommunicationIcon />} size="small" element={radio} className="mr5" />
                <Toggle label={<Label>6</Label>} icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Toggle label={<Label>6</Label>} icons={<CommunicationIcon />} size="large" element={radio} />
            </div>
        </>
    );
}

function Labels({ element, ...rest }) {
    const radio = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Toggle label={<Label>6</Label>} size="small" element={radio} className="mr5" />
                <Toggle label={<Label>6</Label>} element={radio} className="mr5" />
                <Toggle label={<Label>6</Label>} size="large" element={radio} />
            </div>
            <div className="flex">
                <Toggle active label={<Label>6</Label>} element={radio} className="mr5" />
                <Toggle focus label={<Label>6</Label>} element={radio} className="mr5" />
                <Toggle hover label={<Label>6</Label>} element={radio} className="mr5" />
                <Toggle focus hover label={<Label>6</Label>} element={radio} className="mr5" />
                <Toggle disabled label={<Label>6</Label>} element={radio} className="mr5" />
                <Toggle readOnly label={<Label>6</Label>} element={radio} />
            </div>
        </>
    );
}

export function createSharedStories(checkbox, stories) {
    return stories
        .add("text", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex items-end mb8">
                        <Toggle text="Milky Way" element={checkbox} className="mr5" />
                        <Toggle active text="Milky Way" element={checkbox} className="mr5" />
                        <Toggle focus text="Milky Way" element={checkbox} className="mr5" />
                        <Toggle hover text="Milky Way" element={checkbox} className="mr5" />
                        <Toggle focus hover text="Milky Way" element={checkbox} className="mr5" />
                        <Toggle disabled text="Milky Way" element={checkbox} className="mr5" />
                        <Toggle readOnly text="Milky Way" element={checkbox} />
                    </div>
                    <div className="flex items-end mb8">
                        <Toggle size="small" text="Milky Way" element={checkbox} className="mr5" />
                        <Toggle text="Milky Way" element={checkbox} className="mr5" />
                        <Toggle size="large" text="Milky Way" element={checkbox} />
                    </div>
                    <Icons text="Milky Way" element={checkbox} />
                    <Labels text="Milky Way" element={checkbox} />
                </div>
            </div>
        )
        .add("no text", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex items-end mb8">
                        <Toggle element={checkbox} className="mr5" />
                        <Toggle active element={checkbox} className="mr5" />
                        <Toggle focus element={checkbox} className="mr5" />
                        <Toggle hover element={checkbox} className="mr5" />
                        <Toggle focus hover element={checkbox} className="mr5" />
                        <Toggle disabled element={checkbox} className="mr5" />
                        <Toggle readOnly element={checkbox} />
                    </div>
                    <div className="flex items-end mb8">
                        <Toggle size="small" element={checkbox} className="mr5" />
                        <Toggle element={checkbox} className="mr5" />
                        <Toggle size="large" element={checkbox} />
                    </div>
                    <Icons element={checkbox} />
                    <Labels element={checkbox} />
                </div>
            </div>
        )
        .add("overflow", () =>
            <div className="flex">
                <div className="flex">
                    <div className="flex mw5">
                        <Toggle text="PA-99-N2 event and possible exoplanet in galaxy" element={checkbox} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Toggle text="PA-99-N2 event and possible exoplanet in galaxy" element={checkbox} label={<Label>6</Label>} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Toggle label={<Label>6</Label>} icons={[<CommunicationIcon />, <CommunicationIcon />]} text="PA-99-N2 event and possible exoplanet in galaxy" element={checkbox} className="mr5" />
                    </div>
                </div>
            </div>
        );
}
