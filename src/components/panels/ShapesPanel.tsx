import React from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import { Rectangle, Circle } from "../entity/ShapesResource";

const getRandomIndex = () => Math.floor(Math.random() * 1000); // Adjust the range as needed

export const ShapesPanel = observer(() => {
  const store = React.useContext(StoreContext);

  const handleShapeClick = (shapeType: "rectangle" | "circle") => {
    store.setSelectedMenuOption("Shapes");

    const randomIndex = getRandomIndex();

    if (shapeType === "rectangle") {
      store.addRectangle(randomIndex);
    } else if (shapeType === "circle") {
      store.addCircle(randomIndex);
    }
  };

  return (
    <>
      <Rectangle index={getRandomIndex()} onClick={() => handleShapeClick("rectangle")} shapeType={"rectangle"} image={""} />
      <Circle index={getRandomIndex()} onClick={() => handleShapeClick("circle")} shapeType={"circle"} image={""} />

    </>
  );
});

export default ShapesPanel;
