"use client";

import { fabric } from "fabric";
import React, { useEffect, useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Resources } from "./Resources";
import { ElementsPanel } from "./panels/ElementsPanel";
import { Menu } from "./Menu";
import { TimeLine } from "./TimeLine";
import { Store } from "@/store/Store";
import "@/utils/fabric-utils";

export const EditorWithStore = () => {
  const [store] = useState(new Store());
  return (
    <StoreContext.Provider value={store}>
      <Editor/>
    </StoreContext.Provider>
  );
}

export const Editor = observer(() => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 889,
      backgroundColor: "#ededed",
    });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#00a0f5";
    // fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerStrokeColor = "#0063d8";
    fabric.Object.prototype.cornerSize = 10;
    // canvas mouse down without target should deselect active object
    canvas.on("mouse:down", function (e) {
      if (!e.target) {
        store.setSelectedElement(null);
      }
    });

    store.setCanvas(canvas);
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  }, []);
  return (
    <div className="grid grid-rows-[20px_550px_1fr] grid-cols-[60px_250px_900px_1fr] h-[100%]">
      <div className="tile row-span-2 flex flex-col">
        <Menu />
      </div>
      <div className="row-span-2 flex flex-col overflow-auto px-4 h-[100%]">
        <Resources />
      </div>
      <canvas id="canvas" className="h-[500px] w-[800px] row col-start-3 my-10" />
      <div className="col-start-4 row-start-2">
        <ElementsPanel />
      </div>
      <div className="col-start-1 row-start-3 col-span-4 relative overflow-scroll px-4 py-2 hide-scrollbar">
        <TimeLine />
      </div>
    </div>
  );
});
