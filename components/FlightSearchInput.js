import React, { useState } from 'react';

const FlightSearchInput = ({ onSearch }) => {
  const [searchFlightId, setSearchFlightId] = useState('');

  const handleInputChange = (event) => {
    setSearchFlightId(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchFlightId);
    }
  };

  const handleResetClick = () => {
    setSearchFlightId('');
    if (onSearch) {
      onSearch(''); // 전체 목록 다시 조회
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full md:w-[904px] h-auto md:h-[87px] gap-2.5 px-6 md:px-[46px] py-4 md:py-[29px] rounded-[20px] bg-white shadow-md"
    >
      <div className="flex justify-between items-center w-full md:w-[846px] gap-6">
        <div className="flex justify-start items-center flex-grow-1 flex-shrink-1 relative gap-3">
          <svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0"
            preserveAspectRatio="none"
          >
            <path
              d="M17.6137 16.0148C19.0661 14.0326 19.7166 11.5751 19.4351 9.13383C19.1536 6.69257 17.9608 4.44764 16.0954 2.84816C14.23 1.24868 11.8295 0.412617 9.37425 0.507237C6.91897 0.601856 4.58995 1.62018 2.85314 3.35848C1.11633 5.09677 0.0998188 7.42685 0.00696954 9.88254C-0.0858797 12.3382 0.751782 14.7384 2.35237 16.6029C3.95296 18.4675 6.19843 19.6588 8.63955 19.9386C11.0807 20.2184 13.5374 19.566 15.5183 18.112H15.5168C15.5618 18.172 15.6098 18.229 15.6638 18.2846L21.4385 24.0602C21.7198 24.3416 22.1013 24.4999 22.4992 24.5C22.8971 24.5001 23.2788 24.3422 23.5602 24.0609C23.8417 23.7796 23.9999 23.398 24 23.0001C24.0001 22.6021 23.8422 22.2204 23.561 21.9389L17.7862 16.1633C17.7326 16.109 17.6749 16.0589 17.6137 16.0133V16.0148ZM18.0007 10.2482C18.0007 11.3317 17.7873 12.4047 17.3727 13.4057C16.9581 14.4067 16.3504 15.3163 15.5844 16.0825C14.8183 16.8486 13.9089 17.4564 12.908 17.871C11.9071 18.2857 10.8343 18.4991 9.75098 18.4991C8.66762 18.4991 7.59486 18.2857 6.59396 17.871C5.59306 17.4564 4.68362 16.8486 3.91757 16.0825C3.15151 15.3163 2.54385 14.4067 2.12926 13.4057C1.71468 12.4047 1.50129 11.3317 1.50129 10.2482C1.50129 8.05997 2.37045 5.96133 3.91757 4.41399C5.46469 2.86666 7.56303 1.99738 9.75098 1.99738C11.9389 1.99738 14.0373 2.86666 15.5844 4.41399C17.1315 5.96133 18.0007 8.05997 18.0007 10.2482Z"
              fill="#7C85A0"
            />
          </svg>
          <input
            type="text"
            placeholder="편명을 입력하세요. (예시 : OZ171)"
            className="flex-grow-1 flex-shrink-1 text-lg md:text-2xl text-left text-[#7c85a0] focus:outline-none"
            value={searchFlightId}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[100px] h-[43px] relative gap-2.5 px-6 py-2 rounded-xl border border-[#adbbd4] cursor-pointer" onClick={handleSearchClick}>
          <p className="flex-grow-0 flex-shrink-0 text-lg md:text-xl text-left text-[#92a2c0]">검색</p>
        </div>
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[84px] h-[43px] relative gap-2.5 px-6 py-2 rounded-xl border border-[#adbbd4] cursor-pointer" onClick={handleResetClick}>
          <p className="flex-grow-0 flex-shrink-0 text-lg md:text-xl text-left text-[#92a2c0]">초기화</p>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchInput;