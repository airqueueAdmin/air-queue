'use client'

import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import FlightSearchInput from '@/components/FlightSearchInput';
import BackgroundSection from '@/components/BackgroundSection';
import Pagination from '@/components/Pagination';
import TernoTab from '@/components/TernoTab';

async function fetchFlightData(terno, searchFlightId) {
  // API 엔드포인트
  const apiUrl = '/api/flights';

  // 쿼리 파라미터 생성
  const queryParams = new URLSearchParams();
  queryParams.append('terno', terno);
  if (searchFlightId) {
    queryParams.append('flightid', searchFlightId);
  }

  // API 요청 URL 생성
  const requestUrl = `${apiUrl}?${queryParams.toString()}`;

  try {
    const res = await fetch(requestUrl);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    throw error; // 에러를 다시 던져서 컴포넌트에서 처리하도록
  }
}

const formatNumber = (number) => {
  return Math.round(number);
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6));
  const day = parseInt(dateString.substring(6, 8));
  const hour = parseInt(dateString.substring(8, 10));
  const minute = parseInt(dateString.substring(10, 12));

  const dateObject = new Date(year, month - 1, day, hour, minute);

  return `${String(month).padStart(2, '0')}월 ${String(day).padStart(2, '0')}일 ${String(hour).padStart(2, '0')}시${String(minute).padStart(2, '0')}분`;
};

const calculateCongestion = (flights, terminal) => {
  if (!flights) {
    return '정보 없음';
  }
  const terminalFlights = flights.filter(flight => flight.terno === terminal);
  const totalPassengers = terminalFlights.reduce((sum, flight) => sum + formatNumber(flight.korean) + formatNumber(flight.foreigner), 0);
  const congestionThreshold = 200; // 혼잡으로 표시 해줄 조건 값
  return totalPassengers > congestionThreshold ? '혼잡' : '원활';
};

const calculateAverageWaitingTime = (flights, terminal) => {
  if (!flights) {
    return 0;
  }
  const terminalFlights = flights.filter(flight => flight.terno === terminal);
  if (terminalFlights.length === 0) {
    return 0;
  }
  let totalWaitingTime = 0;
  for (const flight of terminalFlights) {
    const scheduledTime = parseTimeString(flight.scheduletime);
    const estimatedTime = parseTimeString(flight.estimatedtime);
    if (scheduledTime && estimatedTime) {
      totalWaitingTime += estimatedTime.getTime() - scheduledTime.getTime();
    }
  }
  const averageWaitingTimeMs = totalWaitingTime / terminalFlights.length;
  return Math.round(averageWaitingTimeMs / (1000 * 60)); // 분 단위로 반환
};

const parseTimeString = (timeString) => {
  if (!timeString) return null;
  const year = parseInt(timeString.substring(0, 4));
  const month = parseInt(timeString.substring(4, 6)) - 1; // 0-indexed
  const day = parseInt(timeString.substring(6, 8));
  const hour = parseInt(timeString.substring(8, 10));
  const minute = parseInt(timeString.substring(10, 12));
  return new Date(year, month, day, hour, minute);
};

const formatTimeDifference = (scheduledTimeStr, estimatedTimeStr) => {
  const scheduledTime = parseTimeString(scheduledTimeStr);
  const estimatedTime = parseTimeString(estimatedTimeStr);

  if (!scheduledTime || !estimatedTime) {
    return '-';
  }

  const differenceMs = estimatedTime.getTime() - scheduledTime.getTime();
  const differenceMinutes = Math.round(differenceMs / (1000 * 60));

  if (differenceMinutes > 0) {
    return `${differenceMinutes}분 지연`;
  } else if (differenceMinutes < 0) {
    return `${Math.abs(differenceMinutes)}분 빠름`;
  } else {
    return '정시';
  }
};

const ITEMS_PER_PAGE = 10; // 한 페이지에 나타낼 리스트

export default function Home() {
  const [flights, setFlights] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerminal, setSelectedTerminal] = useState('T1'); // 초기 선택된 터미널 설정
  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState(''); // 출발 공항 선택 state
  const [showDelayedFlights, setShowDelayedFlights] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태

  const t1Congestion = useMemo(() => calculateCongestion(flights, 'T1'), [flights]);
  const t2Congestion = useMemo(() => calculateCongestion(flights, 'T2'), [flights]);
  const averageWaitingTime = useMemo(() => calculateAverageWaitingTime(flights, selectedTerminal), [flights, selectedTerminal]);
  const uniqueAirports = useMemo(() => {
    if (!flights) return;
    const airports = flights.map(flight => flight.airport);
    return [...new Set(airports)];
  }, [flights]);

  const handleFlightSearch = (flightid) => {
    setSearchTerm(flightid);
  };

  const handleTerminalClick = (terminal) => {
    setSelectedTerminal(terminal);
  };

  const handleToggleDelayedFlights = () => {
    setShowDelayedFlights(!showDelayedFlights);
    setCurrentPage(1); // 첫 페이지로 이동
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  const filteredFlights = useMemo(() => {
    if (!flights) return;
    return flights.filter(flight => {
      const isDepartureAirportMatch = !searchTerm || flight.flightid.toLowerCase().includes(searchTerm.toLowerCase()); // 기존 검색 기능 유지
      const isDelayedFlight = !showDelayedFlights || (parseTimeString(flight.scheduletime) && parseTimeString(flight.estimatedtime) && parseTimeString(flight.estimatedtime).getTime() > parseTimeString(flight.scheduletime).getTime());
      return isDepartureAirportMatch && isDelayedFlight;
    });
  }, [flights, searchTerm, showDelayedFlights]);

  const paginatedFlights = useMemo(() => {
    const initialTotalPages = Math.ceil(filteredFlights.length / ITEMS_PER_PAGE);
    const lastPageItemCount = filteredFlights.length % ITEMS_PER_PAGE;
    const adjustedTotalPages = initialTotalPages > 1 && lastPageItemCount <= 5 && lastPageItemCount > 0 ? initialTotalPages - 1 : initialTotalPages;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    let endIndex = startIndex + ITEMS_PER_PAGE;

    if (currentPage === adjustedTotalPages && initialTotalPages > 1 && lastPageItemCount <= 5 && lastPageItemCount > 0) {
      const itemsOnPreviousPages = (adjustedTotalPages - 1) * ITEMS_PER_PAGE;
      endIndex = filteredFlights.length;
      return filteredFlights.slice(itemsOnPreviousPages, endIndex);
    } else {
      return filteredFlights.slice(startIndex, endIndex);
    }
  }, [filteredFlights, currentPage]);

  useEffect(() => {
    const initialTotalPages = Math.ceil(filteredFlights.length / ITEMS_PER_PAGE);
    const lastPageItemCount = filteredFlights.length % ITEMS_PER_PAGE;

    if (initialTotalPages > 1 && lastPageItemCount <= 5 && lastPageItemCount > 0) {
      setTotalPages(initialTotalPages - 1);
    } else {
      setTotalPages(initialTotalPages);
    }
    setCurrentPage(1); // 검색 또는 필터 변경 시 첫 페이지로 이동
  }, [filteredFlights]);

  useEffect(() => {
    setLoading(true);
    fetchFlightData(selectedTerminal, searchTerm)
      .then((data) => {
        setFlights(data);
        setLoading(false);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE)); // 총 페이지 수 계산
        setCurrentPage(1); // 데이터 로드 후 첫 페이지로 설정
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedTerminal, searchTerm]); // selectedTerminal이 변경될 때마다 useEffect 실행


  
  if (loading) return <p className="text-center py-4">Loading flight data...</p>;
  if (error) return <p className="text-red-500 text-center py-4">Error loading flight data: {error}</p>;

  return (
    <div className="w-[1280px]">
      <Header t1Congestion={t1Congestion} t2Congestion={t2Congestion} averageWaitingTime={averageWaitingTime} />
      <BackgroundSection />
      <FlightSearchInput onSearch={handleFlightSearch} />
      <div className="py-8">
        <TernoTab
          selectedTerminal={selectedTerminal}
          onTerminalClick={handleTerminalClick}
        />
        <p className="w-[1280px] text-[34px] font-bold text-left text-[#222] mb-6">✈ 실시간 항공편 리스트</p>
        {/* Search */}
        <div className="flex justify-start items-center gap-[70px] mt-6">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-4">
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[79px] h-[45px] relative gap-2.5 px-5 py-2.5 rounded-[30px] bg-white border border-[#1e59ff]">
              <p className="flex-grow-0 flex-shrink-0 text-lg font-medium text-left text-[#1e59ff]">입국</p>
            </div>
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[79px] h-[45px] relative gap-2.5 px-5 py-2.5 rounded-[30px] bg-white border border-[#adbbd4]">
              <p className="flex-grow-0 flex-shrink-0 text-lg font-medium text-left text-[#92a2c0]">출국</p>
            </div>
          </div>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-[22px]">
          <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[45px] w-[114px] gap-2.5 px-2 py-2.5 rounded-[9px] border border-[#adbbd4]">
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
                  <p className="flex-grow-0 flex-shrink-0 w-[73px] text-lg text-left text-[#2f3851]">
                    항공사
                  </p>
                  <svg
                    width={15}
                    height={12}
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-grow-0 flex-shrink-0"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M8.71633 10.8146C8.11762 11.6442 6.88238 11.6442 6.28367 10.8146L0.555781 2.87781C-0.160167 1.88576 0.548696 0.5 1.77211 0.500001L13.2279 0.500002C14.4513 0.500002 15.1602 1.88576 14.4442 2.87781L8.71633 10.8146Z"
                      fill="#7C85A0"
                    />
                  </svg>
                </div>
            </div>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-5">
            <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[45px] w-[114px] gap-2.5 px-2 py-2.5 rounded-[9px] border border-[#adbbd4]">
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative pl-4">
                <select
                    className="flex-grow-0 flex-shrink-0 w-[73px] text-lg text-left text-[#2f3851] focus:outline-none appearance-none border-none p-0"
                    value={selectedDepartureAirport}
                    onChange={(e) => setSelectedDepartureAirport(e.target.value)}
                  >
                    <option value="">출발 공항</option>
                    {uniqueAirports.map((airport) => (
                      <option key={airport} value={airport}>{airport}</option>
                    ))}
                  </select>
                  <svg
                    width={15}
                    height={12}
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-grow-0 flex-shrink-0 pointer-events-none absolute right-0 mr-2"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M8.71633 10.8146C8.11762 11.6442 6.88238 11.6442 6.28367 10.8146L0.555781 2.87781C-0.160167 1.88576 0.548696 0.5 1.77211 0.500001L13.2279 0.500002C14.4513 0.500002 15.1602 1.88576 14.4442 2.87781L8.71633 10.8146Z"
                      fill="#7C85A0"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-4">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-left text-[#2f3851]">
                지연 항공편만
              </p>
              <div
                onClick={handleToggleDelayedFlights}
                className={`flex items-center flex-grow-0 flex-shrink-0 w-[79px] h-10 relative gap-2.5 px-[5px] py-[3px] rounded-[22.5px] cursor-pointer ${showDelayedFlights ? 'bg-[#1E59FF] justify-start' : 'bg-[#d0d9e9] justify-end'}`}
              >
                <svg
                  width={34}
                  height={35}
                  viewBox="0 0 34 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-grow-0 flex-shrink-0"
                  preserveAspectRatio="none"
                >
                  <circle cx={17} cy="17.5" r={17} fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* List Header */}
        <div className="w-[1280px] rounded-[50px] bg-white border border-[#d0d9e9]">
          <div className="w-full h-[97px] rounded-tl-[50px] rounded-tr-[50px] bg-[#f6f8fc] border-b border-[#d0d9e9] flex items-center">
            <p className="w-[212.5px] text-2xl font-medium text-center text-[#222]">항공편</p>
            <p className="w-[215.5px] text-2xl font-medium text-center text-[#222]">예상 도착</p>
            <p className="w-[211px] text-2xl font-medium text-center text-[#222]">지연 도착</p>
            <p className="w-[215px] text-2xl font-medium text-center text-[#222]">출발 공항</p>
            <p className="w-[213.5px] text-2xl font-medium text-center text-[#222]">도착 게이트</p>
            <p className="w-[212.5px] text-2xl font-medium text-center text-[#222]">입국 게이트</p>
          </div> 
          {/* List Detail */}
          <div className="overflow-x-auto">
            {paginatedFlights.map((flight, index) => (
              <React.Fragment key={flight.flightid}>
                <div className="w-full h-[126px] flex items-center border-b border-[#d0d9e9]">
                  <div className="w-[212.5px] flex flex-col items-center justify-center">
                    <p className="text-xl font-semibold text-[#2f3851]">{flight.flightid} ({flight.terno})</p>
                    <div className="flex justify-center items-center w-[81px] h-[35px] rounded-[22.5px] border border-[#ef1f1f]">
                      <p className="text-base font-medium text-[#ef1f1f]">
                        {formatTimeDifference(flight.scheduletime, flight.estimatedtime)}
                      </p>
                    </div>
                  </div>
                  <p className="w-[215.5px] text-xl text-center text-[#2f3851] whitespace-pre-line">{formatDate(flight.scheduletime)}</p>
                  <p className="w-[211px] text-xl font-semibold text-center text-[#222] whitespace-pre-line">{formatDate(flight.estimatedtime)}</p>
                  <p className="w-[215px] text-xl text-center text-[#2f3851]">{flight.airport}</p>
                  <p className="w-[213.5px] text-xl text-center text-[#2f3851]">{flight.entrygate}</p>
                  <p className="w-[212.5px] text-xl text-center text-[#2f3851]">{flight.gatenumber}</p>
                </div>
              </React.Fragment>
            ))}
        </div>
        {/* pagination */}
        {flights && totalPages > 1 && (
          <div className="py-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}