import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Spacing"))
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <div>
                 <div>
                     <div className="w1 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w2 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w3 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w4 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w5 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w6 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w7 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w8 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w9 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w10 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w11 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w12 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w13 h4 mb4 bg-sunray-400" />
                 </div>
             </div>
    );
