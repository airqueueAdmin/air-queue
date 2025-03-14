'use client'

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

async function fetchFlightData(terno, searchFlightId) {
  // API 엔드포인트
  const apiUrl = '/api/flights';

  // 쿼리 파라미터 생성
  const queryParams = new URLSearchParams();
  queryParams.append('terno', terno);
  if (searchFlightId) {
    queryParams.append('flightId', searchFlightId);
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

  return dateObject.toLocaleDateString() + ' ' + dateObject.toLocaleTimeString();
};


export default function Home() {
  const [flights, setFlights] = useState(); // 빈 배열로 초기화
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const terminalNumber = 'T1'; // 예시 터미널 번호 동적으로 처리 예정
    fetchFlightData(terminalNumber)
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  },);

  if (loading) return <p className="text-center py-4">Loading flight data...</p>;
  if (error) return <p className="text-red-500 text-center py-4">Error loading flight data: {error}</p>;

  return (
    <div>
      <Header />
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">실시간 항공권 리스트</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b font-bold text-left">출발 시간</th>
              <th className="py-2 px-4 border-b font-bold text-left">도착 시간</th>
              <th className="py-2 px-4 border-b font-bold text-left">항공사</th>
              <th className="py-2 px-4 border-b font-bold text-left">편명</th>
              <th className="py-2 px-4 border-b font-bold text-left">가격</th>
              <th className="py-2 px-4 border-b font-bold text-left">잔여 좌석</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flightid} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{formatDate(flight.scheduletime)}</td>{/* 도착 예정 시간 */}
                <td className="py-2 px-4 border-b">{formatDate(flight.estimatedtime)}</td>{/* 도착 시간 */}
                <td className="py-2 px-4 border-b">{flight.flightid}</td>{/* 편명 */}
                <td className="py-2 px-4 border-b">{formatNumber(flight.korean) + formatNumber(flight.foreigner)}</td>{/* 총 탑승객 수 */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}