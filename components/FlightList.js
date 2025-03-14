import React, { useState, useEffect } from 'react';

async function fetchFlightData() {
  // 실제 API 엔드포인트로 대체
  const res = await fetch('/api/flights');
  const data = await res.json();
  return data;
}

function FlightList() {
  const [flights, setFlights] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlightData()
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  },);

  if (loading) {
    return <p className="text-center py-4">항공권 정보를 불러오는 중...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-4">항공권 정보를 불러오는 데 실패했습니다: {error}</p>;
  }

  return (
    <section className="py-8">
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
      <td className="py-2 px-4 border-b">{formatDate(flight.scheduletime)}</td>
      <td className="py-2 px-4 border-b">{formatDate(flight.estimatedtime)}</td>
      <td className="py-2 px-4 border-b">{flight.airline}</td>
      <td className="py-2 px-4 border-b">{flight.flightid}</td>
      <td className="py-2 px-4 border-b">{formatNumber(flight.korean) + formatNumber(flight.foreigner)}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </section>
  );
}

export default FlightList;