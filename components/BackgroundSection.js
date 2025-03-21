import React from 'react';
import Image from 'next/image';

const BackgroundSection = () => {
  return (
    <div className="relative w-full h-[auto] md:h-[646px] overflow-hidden">
      {/* 큰 배경 이미지 */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/icons/Rectangle-73.svg"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="rounded-[0px] md:rounded-[66px]"
          priority
        />
      </div>

      {/* 오른쪽 상단 이미지 */}
      {/* <div className="absolute top-[10%] right-[5%] md:top-[280.78px] md:left-auto md:right-auto md:left-[auto] lg:left-[1235.5px]">
        <Image
          src="/images/gettyimages-1460784230-1.png"
          alt="airport scene 1"
          width={568.13}
          height={220.38}
          objectFit="cover"
          style={{ boxShadow: "0px 7px 15.899999618530273px 0 rgba(0,0,0,0.2)" }}
        />
      </div> */}

      {/* 왼쪽 하단 이미지 */}
      {/* <div className="absolute bottom-[5%] left-[5%] md:top-[386.5px] md:left-[413.14px] md:bottom-auto">
        <Image
          src="/images/gettyimages-1460784230sdfsdfs-1.png"
          alt="airport scene 2"
          width={165.46}
          height={328.63}
          objectFit="cover"
          style={{ boxShadow: "8px 7px 15.300000190734863px 0 rgba(0,0,0,0.2)" }}
        />
      </div> */}

      {/* 중앙 텍스트 */}
      <div className="absolute top-[15%] left-[5%] md:top-[233px] md:left-[50%] lg:left-[715px] transform md:-translate-x-1/2 md:translate-y-0 flex flex-col justify-start items-center w-full md:w-[490px] gap-1.5 text-center md:text-left">
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-full md:w-[490px] text-3xl md:text-[64px] font-bold">
          <span className="text-white">공항을 </span>
          <span className="text-[#1e59ff]">스마트</span>
          <span className="text-white">하게,</span>
          <br className="hidden md:block" />
          <span className="text-white">여행을 더 여유롭게.</span>
        </p>
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-full md:w-[490px] text-lg md:text-[28px] font-medium text-[#f6f8fc]">
          기다림 없는 여행, AirQ와 함께 시작하세요.
        </p>
      </div>
    </div>
  );
};

export default BackgroundSection;