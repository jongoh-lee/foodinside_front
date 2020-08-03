export const myShopData = {
    id:"1",
    shopName: "조명으로 포인트를 준 음식점",
    district:"부천 먹자 골목",
    picture: [require("../../assets/ShopImage/img_picture4.png"), require("../../assets/ShopImage/img_picture5.png"), require("../../assets/ShopImage/img_picture6.png"),require("../../assets/ShopImage/img_picture4.png"), require("../../assets/ShopImage/img_picture5.png"), require("../../assets/ShopImage/img_picture6.png"),require("../../assets/ShopImage/img_picture4.png"), require("../../assets/ShopImage/img_picture5.png"), require("../../assets/ShopImage/img_picture6.png")],
    sort: '일반',
    comments:231,
    price:`110,000`,
    
    //냉장/냉동
    boxIce:[25, 30, 45, 65],
    otherIce:['테이블', '밧드', '음료', '김치', '참치', '와인', '아이스크림', '쇼케이스'],
    
    //화기
    gasRange:['간텍기', '높은 레인지', '낮은 레인지', '중화 레인지'],
    oven:['데크', '컨벡션', '스팀 컨벡션', '콤비 스티머'],
    griller:['상화식', '하화식', '숯불'],
    griddle:[600, 900, 1200, 1500],
    fryer:0,

    //cafe 용품
    cafeCookWare:['에스프레소 머신', '원두 그라인더', '로스팅 머신', '온수기', '제빙기', '블렌더', ],

    //전기 용품
    electronics:['전기밥솥', '식기세척기', '전기물통', '전자레인지', '에어프라이어', '블렌더', '반죽기', '온장고', '발효기', '제빙기', '빙삭기', '파스타기계', '제면기계', '냉면기계', '인덕션', '소프트아이스크림 기계', '탄산음료 디스펜서', '해면기', '생맥주 디스펜서'],
    tableWare:['수저통', '냅킨', '냅킨통', '양념통', '물수건', '오프너', '호출벨', '수저', '젓가락', '포크', '나이프', '쟁반', '물병', '주전자', '가스버너', '미니화로'],
    container:['스텐 밧드', '플라스틱 밧드', '유리 밧드', '반찬통', '보울', '대야', '테이크아웃 용기', '진공 포장기'],
    glass:['소주', '사케', '샷', '와인', '샴페인', '칵테일', '언더락', '하이볼', '음료', '물(스텐)', '글라스', '머그', '500cc', '1700cc', '3000cc'],

    //서빙 용품
    serving:['돌솥', '냄비', '뚝배기', '볶음판', '접시류', '공기', '보울', '대접', '찬기', '종지', '옹기'],

    //기타류
    others:['TV', '에어컨', '정수기', '와이파이', 'CCTV', '키오스크', '우산 꽂이', '앞치마', ],

    //청소류
    cleaner:['진공 청소기', '양동이', '호스', '마포', '청소솔', '밀대'],

    //규모
    chairs:32,
    tables:9,
    scale:45,

    //위치
    address: "경기도 부천시 원미구 심곡동 부일로 121",
    subway:[],
    
    //설명
    description:"모던한 인테리어의 음식점 입니다. \n주변 마포역 상권으로 직장인 유동인구가 많은 편 입니다.\n경치가 좋아 Bar 또는 Pub의 분위기와도 잘 어울립니다.",
    precaution:"주차 공간이 없습니다.\n대중교통을 이용해 주세요",
    hashTags: ['오픈키친', '20평', '몽환적 분위기', 'Pub 가능'],

    //환불
    refund: [100, 90, 80, 70, 60, 50, 40, 0, 0, 0],

    //체크인
    checkIn: '9:00',
    checkOut: '22:00',
    minCheckIn: 3,
    maxCheckIn: 7,

    //가격
    price:[],
}