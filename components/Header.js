import Image from 'next/image';

function Header() {
    return (
        <div className="flex flex-col justify-start items-start w-full h-[100px] gap-2.5 px-6 md:px-16 lg:px-40 xl:px-80 py-[30px]">
            <div className="flex justify-between items-center flex-grow-0 flex-shrink-0 w-full max-w-screen-xl">
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[13px]">
                    <Image
                        src="/icons/logo.svg"
                        alt="에어큐 로고"
                        width={96}
                        height={50}
                        className="flex-grow-0 flex-shrink-0 object-cover"
                    />
                    <p className="flex-grow-0 flex-shrink-0 text-3xl font-bold text-left text-[#222]">에어큐</p>
                </div>
                <div className="flex flex-col justify-center items-center h-[50px] w-full md:w-[558px] gap-2.5 px-[15px] md:px-[35px] py-[10px] md:py-[21px] rounded-lg bg-[#f6f8fc] border border-[#d0d9e9]">
                    <div className="flex justify-start items-center relative gap-5 md:gap-10">
                        <p className="text-left text-sm md:text-lg">
                            <span className="text-[#505975]">인천국제공항: 현재 T1은 </span>
                            <span className="text-base md:text-xl font-medium text-[#f63434]">혼잡</span>
                            <span className="text-[#505975]">, T2는 </span>
                            <span className="text-base md:text-xl font-medium text-[#1e59ff]">원활</span>
                        </p>
                        <p className="text-left text-sm md:text-lg">
                            <span className="font-medium text-[#505975]">⏱️ </span>
                            <span className="text-[#505975]">평균 대기 시간:</span>
                            <span className="text-[#3c4661]"> </span>
                            <span className="font-medium text-[#3c4661]">25분</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;