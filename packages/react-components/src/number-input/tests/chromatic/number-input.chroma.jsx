import { EditIcon } from "@react-components/icons";
import { NumberInput } from "@react-components/number-input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("NumberInput"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <div className="flex">
            <NumberInput className="mr5" />
            <NumberInput placeholder="Amount" />
        </div>
    )
    .add("integer value", () =>
        <NumberInput defaultValue={10} />
    )
    .add("decimal value", () =>
        <NumberInput defaultValue={10.999} />
    )
    .add("icon", () =>
        <NumberInput icon={<EditIcon />} />
    )
    .add("loading", () =>
        <NumberInput loading />
    );
