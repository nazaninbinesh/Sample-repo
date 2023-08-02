import React from "react";
import classNames from "classnames";
import { PhotoIcon, CloudArrowDown } from "@heroicons/react/24/solid";

interface BrowserProps {
  onItemSelect: () => void;
}

const Browse: React.FC<BrowserProps> = ({ onItemSelect }) => {
  return (
    <>
      <div className="w-full p-6">
        <div className="flex gap-x-4">
          <div className="h-12 w-12 flex rounded-lg bg-purple-100 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 self-center"
              fill="#7F56D9"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>

          {/* <PhotoIcon
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              aria-hidden="true"
            /> */}
          <div className="min-w-0 flex-auto">
            <label className="block text-md font-bold leading-6">
              Github Repository Finder
              {/* <br /> */}
            </label>
            <p className="truncate text-sm text-gray-500">
              Please choose a csv file which contains Search keywords, Username
              and Context
            </p>
          </div>
        </div>

        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            {/* <CloudArrowDown
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            /> */}
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-6 w-6 text-zinc-700" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Click to upload</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;