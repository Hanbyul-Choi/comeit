# 🌈COME IT (community meeting service)

우리 동네 소모임 플랫폼

2023.07.04-2023.07.14

### 🧷 팀원

| 임수빈 | 양현서 | 전해강 | 제준영 | 최한별 |
| ------ | ------ | ------ | ------ | ------ |
| `팀장` | 팀원   | 팀원   | 팀원   | 팀원   |

### 🧷 목차

- [1. 프로젝트 소개](#1-프로젝트-소개)
- [2. 배포 주소](#2-배포-주소)
- [3. 와이어 프레임](#3-와이어-프레임)
- [4. 기술스택](#4-기술스택)
- [5. Project Structure](#5-project-structure)
- [6. API Table](#6-api-table)
- [7. 페이지](#7-페이지)

### 1. 프로젝트 소개

**커밋 COME IT** (community meeting service)

"다양한 취미를 함께 즐기며 새로운 친구들과 만날 수 있는 친목 모임, 함께해요!”

> 카카오맵 api를 활용하고 있습니다. 여러가지 취미 분야의 동호회를 개설 또는 검색 가능하게 해주며, 참여하고 싶은 새로운 멤버들이 쉽게 가입하고 활동 일정을 확인할 수 있도록 지원합니다.

> 사용자들은 새로운 취미에 빠져들 수 있을 뿐만 아니라 평소에 관심 있던 활동에 대해 함께 의견 나누고 본인만의 소중한 경험을 쌓아갈 수 있습니다.

언제든지 커밋 COME IT과 함께 즐거운 동네 소모임을 경험해보세요!

### 2. 배포 주소

[커밋(COME IT)](https://comeit-two.vercel.app/)

### 3. 와이어 프레임

![image](https://github.com/HyunseoY/bamboo-community/assets/130683029/ac6cd8d0-3699-44f7-9685-c77497f4975a)

### 4. 기술스택

<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"><img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"><img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"><img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"><img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"><img src="https://img.shields.io/badge/kakaomap-FFCD00?style=for-the-badge&logo=kakao&logoColor=white">

### 5. Project Structure

![image](https://github.com/HyunseoY/GOE_CINEMA/assets/130683029/586f2a79-4909-40ca-a790-78e811b335fd)

### 6. API Table

| API 이름             | URL              | Method   | Request                                                                                                                                                                                                                                                         | Response                                                                                                                                                                                                                                             |
| -------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 로그인               |                  | `POST`   | {"email": "string", "password": "string"}                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                      |
| 회원가입             |                  | `POST`   | {"email": "string", "password": "string", ”nickname”:”string”, “userImgUrl”: null }                                                                                                                                                                             |                                                                                                                                                                                                                                                      |
| 내 정보 수정         |                  | `PATCH`  | {"email": "string", "password": "string", “nickname”:”string”, “userImgUrl”: “string”}                                                                                                                                                                          |                                                                                                                                                                                                                                                      |
| 게시글 추가          |                  | `POST`   | {groupName: string, meetingDate: string, meetingPlace: string, detailPlace: string, groupContact: string, groupIntro: string, meetingMember: number, uid: string, groupImgUrl: string, category: string, time: timestamp,location: {lat: number, lng: number}}  |
| 게시글 조회          |                  | `GET`    |                                                                                                                                                                                                                                                                 | {category : string, groupContact : string, groupImgUrl : string, groupIntro : string, groupName : string, location : {lat : number, lng : number}, meetingDate : string, meetingNumber : string, meetingPlace : string, time : string, uid : string} |
| 게시글 수정          | /home/:contentid | `PATCH`  | {groupName: string, meetingDate: string, meetingPlace: string, detailPlace: string, groupContact: string, groupIntro: string, meetingMember: number, uid: string, groupImgUrl: string, category: string, time: timestamp, location: {lat: number, lng: number}} |                                                                                                                                                                                                                                                      |
| 게시글 삭제          | /home/:contentid | `DELETE` | {id : string}                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                      |
| 찜하기               |                  | `POST`   | {docId : string, postId : string, uid : string}                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                      |
| 찜 취소하기          |                  | `DELETE` | {docId : string}                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                      |
| 찜한 갯수            |                  | `GET`    |                                                                                                                                                                                                                                                                 | {likeNum : number}                                                                                                                                                                                                                                   |
| 좌표값으로 주소 검색 |                  | `GET`    | {x : number, y : number}                                                                                                                                                                                                                                        | {address_name : string}                                                                                                                                                                                                                              |

### 7. 페이지

**로그인/회원가입**

![image](https://github.com/HyunseoY/GOE_CINEMA/assets/130683029/f3584b72-c0af-40a1-a37d-463bbb269788)
로그인 모달. 유효성 검증 있음

![image](https://github.com/HyunseoY/GOE_CINEMA/assets/130683029/57e95aeb-1681-4c98-86c3-4d6abaffaed9)
회원가입 모달. 유효성 검증 있음

**소개 페이지**

![image](https://github.com/HyunseoY/GOE_CINEMA/assets/130683029/d3d5105c-66af-4c7f-8bec-a7411a1cb411)
오늘의 모임 자동슬라이드

![스크린샷 2023-07-23 213440](https://github.com/setItUpLater/comeit/assets/130683029/93d2661b-a6b5-474a-a63e-e96b717a9472)
오늘의 모임이 없는 경우

![image](https://github.com/HyunseoY/GOE_CINEMA/assets/130683029/6f7e670a-be2d-45df-b48d-4d9f7e2e7a8b)
로그인 정보가 없는 경우 게시글 클릭안됨

**메인 페이지**

![스크린샷 2023-07-24 114102](https://github.com/HyunseoY/GOE_CINEMA/assets/130683029/897963df-dc37-4018-a7bb-24c9ada7cd71)
메인 페이지. 등록된 게시물 키워드 검색, 카테고리별로 확인 가능

또한 찜한 게시물은 지도에 별표로 표시된다.

![image](https://github.com/HyunseoY/GOE_CINEMA/assets/130683029/8b17cf3a-1822-45b8-b430-b332223c72f5)
지도에 마커 클릭 후 생성 버튼 누르면 게시글 작성 가능

지도에 클릭한 주소가 자동으로 들어가 있다.

![image](https://github.com/HyunseoY/GOE_CINEMA/assets/130683029/2bc835db-0a6e-43ad-b61d-3318895b6dd7)
마커 클릭 시 인포윈도우 뜨면서 게시글 상세보기 가능

본인 게시물의 경우 수정/삭제버튼이 보인다.
