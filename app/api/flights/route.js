import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const terno = searchParams.get('terno');
  const searchFlightId = searchParams.get('flightid'); // 필요하다면 항공편 ID로 필터링하기 위한 파라미터

  if (!terno) {
    return NextResponse.json({ error: '터미널 번호(terno)를 제공해야 합니다.' }, { status: 400 });
  }

  const serviceKey = 'pEOASCoR9rJAI1ZzrZRo2p%2BDaxb5RQb447Q%2FZ6xKHxLlkNcOIUY%2BowrZbRuN96ENh%2FYhbQk3Aaucb39M5zd%2F2A%3D%3D';
  const decodedServiceKey = decodeURIComponent(serviceKey);
  const url = 'http://apis.data.go.kr/B551177/StatusOfArrivals/getArrivalsCongestion';
  const queryParams = new URLSearchParams({
    serviceKey: decodedServiceKey,
    numOfRows: '99',
    pageNo: '1',
    terno: terno,
    airport: '',
    type: 'json',
  });

  try {
    const response = await fetch(`${url}?${queryParams.toString()}`);
    const body = await response.json();

    if (!body.response || !body.response.body || !body.response.body.items || body.response.body.items.length === 0) {
      return NextResponse.json({ error: '데이터를 찾을 수 없습니다.' }, { status: 404 });
    }

    let filteredData = body.response.body.items;
    if (searchFlightId) {
        filteredData = filteredData.filter(item =>
          item.flightid && item.flightid.toLowerCase().includes(searchFlightId.toLowerCase())
        );
    }

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.json({ error: '데이터를 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}