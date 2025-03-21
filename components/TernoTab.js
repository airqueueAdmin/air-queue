import React from 'react';

function TernoTab({ selectedTerminal, onTerminalClick }) {
  return (
    <div className="flex flex-col justify-start items-center w-full md:w-[1282px] relative gap-4">
      <div className="flex justify-between items-center flex-grow-0 flex-shrink-0 w-full md:w-[772px]">
        <div
          className={`flex justify-center items-center flex-grow-0 flex-shrink-0 w-[90px] h-[50px] relative gap-2.5 px-12 py-1.5 rounded-[15px] cursor-pointer ${
            selectedTerminal === 'T1' ? 'bg-[#1e59ff]' : 'bg-[#eef3fa]'
          }`}
          onClick={() => onTerminalClick('T1')}
        >
          <p
            className={`flex-grow-0 flex-shrink-0 text-3xl font-${
              selectedTerminal === 'T1' ? 'semibold' : 'medium'
            } text-left text-${selectedTerminal === 'T1' ? 'white' : '[#adbbd4]'}`}
          >
            T1
          </p>
        </div>
        <div
          className={`flex justify-center items-center flex-grow-0 flex-shrink-0 w-[90px] h-[50px] relative gap-2.5 px-12 py-1.5 rounded-[15px] cursor-pointer ${
            selectedTerminal === 'T2' ? 'bg-[#1e59ff]' : 'bg-[#eef3fa]'
          }`}
          onClick={() => onTerminalClick('T2')}
        >
          <p
            className={`flex-grow-0 flex-shrink-0 text-3xl font-${
              selectedTerminal === 'T2' ? 'semibold' : 'medium'
            } text-left text-${selectedTerminal === 'T2' ? 'white' : '[#adbbd4]'}`}
          >
            T2
          </p>
        </div>
      </div>
      <div className="flex-grow-0 flex-shrink-0 w-full md:[1282px] h-1 relative">
        <div className="w-full md:w-[1281px] h-1 absolute left-[0.5px] top-[65.5px] rounded-[7.5px] bg-[#d0d9e9]" />
        <div
          className="h-1 absolute top-[65.5px] rounded-[7.5px] bg-[#1e59ff]"
          style={{
            width: selectedTerminal === 'T1' ? 'calc(50% - 0.5px)' : 'calc(50% - 0.5px)',
            left: selectedTerminal === 'T1' ? '-0.5px' : 'calc(50% - 0.5px)',
          }}
        />
      </div>
    </div>
  );
}

export default TernoTab;