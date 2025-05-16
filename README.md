# Cryptoss (크립토스)

- 배포 : [https://cryptoss-five.vercel.app/](https://cryptoss-five.vercel.app/)

### 프로젝트 설명

- 개인 가상화폐 시세 확인 서비스인 **Cryptoss (크립토스)** 입니다.
- 기존 시세 확인 서비스들에서는 시세 확인 시 로딩, 검색, 광고 등으로 인해 확인까지 시간이 오래 걸리는 문제를 해결하고자 이 프로젝트를 진행합니다.

### 프로젝트 설계

- 디자인은 토스증권이 가상화폐 관련 서비스도 제공한다면 어떤 느낌일까 하는 아이디어에서 </br>
  착안하여 토스증권을 참고 하였습니다.
- 빠른 로딩이 중요하므로 최대한 속도가 빠른 경량 라이브러리들을 이용했습니다.</br>
  (Vite-SWC/React/Bun/Tanstack-router 등)
- 바이낸스 웹소켓 api를 이용하여 실시간 시세 정보를 받아왔습니다.
- 경량화된 FSD 폴더 구조를 이용했습니다. </br>
  shared -> widgets -> routes (이용 방향)
- PWA 및 테스트 코드 적용(예정)

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/swc-F8C457?style=for-the-badge&logo=swc&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/tanstack_router-pink.svg?style=for-the-badge&logo=tanstackrouter&logoColor=white"> <br />
<img src="https://img.shields.io/badge/zustand-06B6D4.svg?style=for-the-badge&logo=zustand&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/shadcnui-000000?style=for-the-badge&logo=shadcnui"> <img src="https://img.shields.io/badge/vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/bun-000000?style=for-the-badge&logo=bun&logoColor=white">

---

## ⚙️ 기능 구현

- 실시간 차트 페이지(홈): 
  - 웹소켓으로 받아오는 실시간 시세 정보 확인
  - 종목 추가 버튼 클릭시 종목 편집 페이지로 이동
  - 달러/원화 토글 기능
  - indexedDB에 저장된 내 종목 리스트 아이템을 클릭하여 종목 상세 페이지로 이동

- 종목 상세 페이지
  - 트레이딩뷰 light-weight 차트를 이용하여 실시간 차트 시세 제공
  - 차트 종류 변환 기능
  - 차트 봉 시간대 변경 기능
  - 달러/원화 토글 기능

- 종목 편집 페이지
  - 현재 저장된 내 종목 리스트 열람
  - 추가하기 버튼을 통해 indexedDB에 종목을 추가할 수 있는 모달 팝업
  - 기존 등록된 종목들 삭제 가능
  - 바이낸스 api를 통해 특정 종목 검색하기 기능
  - 검색된 종목 추가 기능


## 🕹 프로젝트 실행

```
bun install
bun dev
```

---

## 커밋 컨벤션
- **init:** 초기 세팅 관련
- **feat:** 새로운 기능 추가
- **fix:** 버그 수정
- **docs:** 문서 수정
- **refactor:** 리팩토링 (기능 추가나 버그 수정과 무관한 코드 개선 및 포맷팅)
- **test:** 테스트 코드 추가 또는 수정
- **chore:** 빌드 작업, 패키지 업데이트, 오타 수정 등 기타 마이너한 변경

---

## 트러블 슈팅 정리
- 웹소켓 공통화
- 이미지 가져오는 문제
- PWA 문제
- VERCEL 파일명 문제
- 모달 사용 방식 및 위치 문제

## 🗂 폴더 구조

```

📦src
 ┣ 📂assets
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜area.svg
 ┃ ┃ ┣ 📜candle.svg
 ┃ ┃ ┣ 📜plus.svg
 ┃ ┃ ┣ 📜search.svg
 ┃ ┃ ┗ 📜x.svg
 ┃ ┣ 📜cryptoss-logo.png
 ┃ ┗ 📜react.svg
 ┣ 📂routes
 ┃ ┣ 📂ticker-details
 ┃ ┃ ┣ 📜$detailId.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜__root.tsx
 ┃ ┣ 📜edit-ticker.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂shared
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┗ 📜ws.ts
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜AvatarProfile.tsx
 ┃ ┃ ┃ ┣ 📜CurrencySwitch.tsx
 ┃ ┃ ┃ ┣ 📜Logo.tsx
 ┃ ┃ ┃ ┣ 📜TickerCard.tsx
 ┃ ┃ ┃ ┗ 📜Title.tsx
 ┃ ┃ ┗ 📂ui
 ┃ ┃ ┃ ┣ 📜avatar.tsx
 ┃ ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┃ ┣ 📜dialog.tsx
 ┃ ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┃ ┣ 📜label.tsx
 ┃ ┃ ┃ ┣ 📜select.tsx
 ┃ ┃ ┃ ┣ 📜sonner.tsx
 ┃ ┃ ┃ ┣ 📜switch.tsx
 ┃ ┃ ┃ ┗ 📜table.tsx
 ┃ ┣ 📂db
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useBinanceTickerInfo.ts
 ┃ ┃ ┣ 📜useTickerApi.ts
 ┃ ┃ ┗ 📜useUsdKrwExchangeRate.ts
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📜constants.ts
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┣ 📂store
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂types
 ┃ ┃ ┗ 📜index.ts
 ┣ 📂widgets
 ┃ ┣ 📂edit-ticker
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜AddedTickerItem.tsx
 ┃ ┃ ┃ ┣ 📜AddedTickerList.tsx
 ┃ ┃ ┃ ┣ 📜EditTickerHeader.tsx
 ┃ ┃ ┃ ┗ 📜TickerEditModal.tsx
 ┃ ┃ ┗ 📂hooks
 ┃ ┃ ┃ ┗ 📜useBinanceSearch.tsx
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┗ 📜api.ts
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜Blink.tsx
 ┃ ┃ ┃ ┣ 📜HomePageHeader.tsx
 ┃ ┃ ┃ ┣ 📜LiveChartTable.tsx
 ┃ ┃ ┃ ┗ 📜LiveChartTableRow.tsx
 ┃ ┃ ┣ 📂lib
 ┃ ┃ ┃ ┣ 📜constants.ts
 ┃ ┃ ┃ ┗ 📜utils.ts
 ┃ ┃ ┗ 📂types
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂ticker-detail
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┃ ┗ 📜ws.ts
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜IntervalSelector.tsx
 ┃ ┃ ┃ ┣ 📜LiveTradingChart.tsx
 ┃ ┃ ┃ ┣ 📜SeriesSelector.tsx
 ┃ ┃ ┃ ┗ 📜TickerDetailHeader.tsx
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┣ 📜useChartHistory.ts
 ┃ ┃ ┃ ┣ 📜useChartWs.ts
 ┃ ┃ ┃ ┣ 📜useCoinName.ts
 ┃ ┃ ┃ ┗ 📜useLightWeightChart.ts
 ┃ ┃ ┗ 📂lib
 ┃ ┃ ┃ ┣ 📜constants.ts
 ┃ ┃ ┃ ┗ 📜utils.ts
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┣ 📜routeTree.gen.ts
 ┗ 📜vite-env.d.ts

```
