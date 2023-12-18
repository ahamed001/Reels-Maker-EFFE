"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import {
  MdOutlineAnimation ,
  MdOutlineOndemandVideo ,
  MdOutlineCreateNewFolder
} 
from "react-icons/md";
import { 
  IoMusicalNotesOutline ,
  IoCloudDownloadOutline,
  IoText,
  IoShapesOutline 
} 
from "react-icons/io5";
import { TbFilters } from "react-icons/tb";
import { HiOutlinePhoto } from "react-icons/hi2";
import { TfiPaintBucket } from "react-icons/tfi";
import { Store } from "@/store/Store";

export const Menu = observer(() => {
  const store = React.useContext(StoreContext);
  const handleClearLocalStorage = () => {
    store.clearLocalStorage();
};

  return (
    <>
      {MENU_OPTIONS.map((option) => {
        return (
          <button
            key={option.name}
            onClick={() => option.action(store)}
            className="py-[10px] mx-1 px-0 w-full flex flex-col items-center text-xs"
          >
            <option.icon
              className=""
              size="20"
              color={
                store.selectedMenuOption === option.name ? "#EA2127" : "gray"
              }
            />
            <div
              className={
                store.selectedMenuOption === option.name
                  ? "font-semibold"
                  : "font-light"
              }
            >
              {option.name}
            </div>
          </button>
        );
      })}
      <button
        onClick={() => {
          handleClearLocalStorage();
          store.setSelectedMenuOption("NewEdit");
        }}
        className="py-[10px] mx-1 px-0 w-full flex flex-col items-center text-xs"
      >
        <MdOutlineCreateNewFolder
          className=""
          size="20"
          color={
            store.selectedMenuOption === "NewEdit" ? "#EA2127" : "gray"
          }
        />
        <div
          className={
            store.selectedMenuOption === "NewEdit"
              ? "font-semibold"
              : "font-light"
          }
        >
          New
        </div>
      </button>
    </>
  );
});

const MENU_OPTIONS = [
  {
    name: "Video",
    icon: MdOutlineOndemandVideo ,
    action: (store: Store) => {
      store.setSelectedMenuOption("Video");
    },
  },
  {
    name: "Audio",
    icon: IoMusicalNotesOutline ,
    action: (store: Store) => {
      store.setSelectedMenuOption("Audio");
    },
  },
  {
    name: "Image",
    icon: HiOutlinePhoto,
    action: (store: Store) => {
      store.setSelectedMenuOption("Image");
    },
  },
  {
    name: "Text",
    icon: IoText,
    action: (store: Store) => {
      store.setSelectedMenuOption("Text");
    },
  },
  {
    name: "Animation",
    icon: MdOutlineAnimation ,
    action: (store: Store) => {
      store.setSelectedMenuOption("Animation");
    },
  },
  {
    name: "Filters",
    icon: TbFilters,
    action: (store: Store) => {
      store.setSelectedMenuOption("Filters");
    },
  },
  {
    name: "Fill",
    icon: TfiPaintBucket,
    action: (store: Store) => {
      store.setSelectedMenuOption("Fill");
    },
  },
  {
    name: "Export",
    icon: IoCloudDownloadOutline,
    action: (store: Store) => {
      store.setSelectedMenuOption("Export");
    },
  },
  {
    name: "Shapes",
    icon: IoShapesOutline ,
    action: (store: Store) => {
      store.setSelectedMenuOption("Shapes");
    },
  },
];
