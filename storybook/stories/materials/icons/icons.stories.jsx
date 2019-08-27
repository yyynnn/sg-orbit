import {
    AddIcon,
    ArrowFullIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ClearIcon,
    InputCalendarIcon,
    MagnifierIcon,
    PresetsCalendarIcon
} from "@orbit-ui/icons";
import { storiesBuilder } from "@utils/stories-builder";

function stories() {
    return storiesBuilder("Materials|icons")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column items-center">
                 <div className="mb4 flex">
                     <ArrowLeftIcon />
                 </div>
                 <div className="mb4 flex">
                     <ArrowRightIcon />
                 </div>
                 <div className="mb4 flex">
                     <ArrowFullIcon className="w2 h2" />
                 </div>
                 <div className="mb4 flex">
                     <ClearIcon />
                 </div>
                 <div className="mb4 flex">
                     <InputCalendarIcon className="w6 h6" />
                 </div>
                 <div className="mb4 flex">
                     <PresetsCalendarIcon />
                 </div>
                 <div className="mb4 flex">
                     <MagnifierIcon />
                 </div>
                 <div className="mb4 flex">
                     <AddIcon />
                 </div>
             </div>
    );