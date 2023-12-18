import { StoreContext } from '@/store';
import { ShapesEditorElement } from '@/types';
import { getUid } from '@/utils';
import { fabric } from 'fabric';
import { observer } from 'mobx-react';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { PiRectangleLight } from "react-icons/pi";
// import { GoCircle } from "react-icons/go";

type ShapesResourceProps = {
  image: string;
  shapeType: "rectangle" | "circle";
  onClick: () => void;
  index: number; 
};

export const Rectangle: React.FC<ShapesResourceProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className='my-2'>
      <PiRectangleLight className='mx-auto text-8xl cursor-pointer hover:text-slate-300'/>
      <p className='text-sm flex justify-center'>Rectangle</p>
    </div>
  );
};

// export const Circle: React.FC<ShapesResourceProps> = ({ onClick }) => {
//   return (
//     <div onClick={onClick} className='my-2'>
//       <GoCircle className='mx-auto text-8xl cursor-pointer hover:text-slate-300'/>
//       <p className='text-sm flex justify-center my-1'>Circle</p>
//     </div>
//   );
// };

export const ShapesResource = observer(
  ({ image, shapeType, onClick }: ShapesResourceProps) => {
    const store = React.useContext(StoreContext);
    const ref = React.useRef<HTMLImageElement>(null);
    const [resolution, setResolution] = React.useState({ w: 0, h: 0 });

    const addShape = () => {
      if (shapeType === "rectangle") {
        const rectangleElement: ShapesEditorElement = {
          id: getUid(),
          type: "rectangle",
          name: "Rectangle",
          placement: { x: 0, y: 0, width: 100, height: 100, rotation: 0, scaleX: 1, scaleY: 1 },
          timeFrame: { start: 0, end: store.maxTime },
          properties: {
            elementId: `rectangle-${getUid()}`, effect: { type: "none" },
            shapeObject: new fabric.Rect(),
            fillColor: undefined
          },
          _element: ''
        };
        store.editorElements.push(rectangleElement);

      } else if (shapeType === "circle") {
    //     const circleElement: ShapesEditorElement = {
    //       id: getUid(),
    //       type: "circle",
    //       name: "Circle",
    //       placement: { x: 0, y: 0, width: 100, height: 100, rotation: 0, scaleX: 1, scaleY: 1 },
    //       timeFrame: { start: 0, end: store.maxTime },
    //       properties: {
    //         elementId: `circle-${getUid()}`, effect: { type: "none" },
    //         shapeObject: new fabric.Circle(),
    //         fillColor: undefined
    //       },
    //       _element: ''
    //     };
    //     store.editorElements.push(circleElement);
       }
     };

    return (
      <div className="rounded-lg overflow-hidden items-center bg-slate-800 m-[15px] flex flex-col relative">
        <div className="bg-[rgba(0,0,0,.25)] text-white py-1 absolute text-base top-2 right-2">
          {resolution.w}x{resolution.h}
        </div>
        <button
          className="hover:bg-[#00a0f5] bg-[rgba(0,0,0,.25)] rounded z-10 text-white font-bold py-1 absolute text-lg bottom-2 right-2"
          onClick={addShape}
        >
          <MdAdd size="25" />
        </button>
        <img
          onLoad={() => {
            setResolution({
              w: ref.current?.naturalWidth ?? 0,
              h: ref.current?.naturalHeight ?? 0,
            });
          }}
          ref={ref}
          className="max-h-[100px] max-w-[150px]"
          src={image}
          height={200}
          width={200}
          id={`image-${getUid()}`}
        ></img>
      </div>
    );
  }
);
