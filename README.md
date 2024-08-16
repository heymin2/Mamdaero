# 맘대로

#### SSAFY 공통 PJT

---

## 🗓️프로젝트 진행 기간

`2024-07-02 ~ 2024-08-16 (약 7주)`

---

## 📑주제

사람 만나기를 어려워하는 상담이 필요한 환자들을 위한 비대면 상담 플랫폼 서비스

---

# ❤️  팀원 소개

![팀원소개](https://github.com/user-attachments/assets/0ce71a2e-a5b5-4bfa-8a68-cdc837325f3e)

---

# 🎁  프로젝트 기획

## 🎉  기획 배경

![기획배경_1](https://github.com/user-attachments/assets/b827d245-a51e-4f12-b34b-99a86f9663f6)
![기획배경_2](https://github.com/user-attachments/assets/4326214a-d540-40a1-adee-a37b192025d6)

## 🎈  기대 효과

![기대효과](https://github.com/user-attachments/assets/2b4abf28-abee-4cc6-98b0-415a36df9685)

---

## 👊  주요 기능

![주요기능-1](https://github.com/user-attachments/assets/1e1930fc-7560-4379-abb7-ea86fdda8936)
![주요기능-2](https://github.com/user-attachments/assets/6fd0202b-537e-429d-8cad-658e76b004da)

---

## 🖥️  서비스 화면

### 상담사 조회 및 예약

<img src="https://github.com/user-attachments/assets/440db8ba-2e0a-4ae4-829f-ee88f0bc84bd" width="100%"/>

---

### 상담상품등록

<img src="https://github.com/user-attachments/assets/20719f77-f4b7-4db1-af68-b8a6e69c468a" width="100%"/>

---

### 내담자 정보 확인

<img src="https://github.com/user-attachments/assets/e0214364-6b1a-47ae-a862-9ea8e26446f2" width="100%"/>

---

### 상담 보고서 작성

<img src="https://github.com/user-attachments/assets/a2fc253c-77e4-499b-a2b1-df39bbc069e9" width="100%"/>

---

### 근무 시간 등록

<img src="https://github.com/user-attachments/assets/201676b1-ab4b-4e7d-bef8-28dfee7aa0ff" width="100%"/>

---

### 상담사 근무 예외 시간 관리

<img src="https://github.com/user-attachments/assets/e060ae90-8d7e-4f20-bfb9-27f186b68f61" width="100%"/>

---

### 리뷰 및 채팅

<img src="https://github.com/user-attachments/assets/f34b32dd-73cb-44d7-9bc1-234bb82b1ffa" width="100%"/>

---

### 화상 상담

![image (7)](https://github.com/user-attachments/assets/acbe075d-19da-41ff-8550-721ce4ee7bde)

---

### 내담자 시연

https://youtu.be/KQKNCKPZwag

---

### 상담사 시연

https://youtu.be/koLzyPQCvDo

---

# 🧱 설계

## 🧭 ERD

![image (5)](https://github.com/user-attachments/assets/33420b65-4a55-42e1-a131-f92f9b4cb957)

## 🧶 API

### 상담

---
![상담API](https://github.com/user-attachments/assets/19a7daf8-b983-4e6b-b01b-139a2c795e10)

### 자가검진

---
![자가검진API](https://github.com/user-attachments/assets/4cb0b27e-c53c-49d2-9a8f-b1e44cd557e3)

### 회원관리

---
![회원관리API](https://github.com/user-attachments/assets/60ce767d-aa5b-458b-8191-efbe57029462)

### 예약

---
![예약API](https://github.com/user-attachments/assets/d01a7a37-9fbf-44a0-8766-2868ec54000c)

### 일기

---
![일기API](https://github.com/user-attachments/assets/e9b135d1-cfa8-4aa9-ac38-3baddf72ba54)

### 게시판

---
![게시판API](https://github.com/user-attachments/assets/1d050f69-29a3-42f8-9ab7-e9231b6704b2)

### 알림

---
![알림API](https://github.com/user-attachments/assets/b79c0c8e-ff6d-4b0b-9ae5-8f1ddcdd4fe1)

## ⌚ FIGMA

![image (8)](https://github.com/user-attachments/assets/dfd665f8-d101-4286-af57-3c565307b23a)

# 🧳 컨벤션

### 깃랩 커밋 & 이슈 사용

1. 작업하기 전에 이슈를 만든다 - 내용, 담당자, 라벨 설정
2. 이슈에서 create branch를 한다 - 이름은 back/feature or fix/#이슈번호 , 연결은 back/develop, front/develop
3. IDE에서 git checkout 브랜치 이름으로 작업 [브랜치 바꾸기 전에 git pull 잘돼있는지 확인 **]
4. 커밋 메시지는 feat, fix 등... 하고 말 다 적은후에 띄어쓰기 하고 (#이슈번호) 적기
   ex) feat: 기능 구현 (#1)
5. 만약에 내 브랜치에서 커밋이 덜돼있다싶으면 git pull origin 브랜치이름
6. 기능 완성 후 각 프,백 develop에 merge
7. 기능이 다 완성됐으면 issue close

---

```
# <타입(<영역>)>: <주제> 
#  - 타입은 필수 작성. 해당 커밋의 성격을 나타내며 타입의 종류 중 하나만 선택, 영어 소문자로 시작
#  - 영역은 필요 시 작성. 변경된 부분을 직접적으로 나타냄 ex) refactor(MemberService): loginMember 메소드 명을 login으로 수정
#  - 주제는 필수 작성. 최대 50글자까지, 끝에 마침표 금지, 한글로 간단 명료하게 작성, 현재형 사용
# 바로 밑줄에 작성

# 바로 아래 한 줄 공백 유지 (머릿말과 본문의 분리를 위함)

################################
# <본문> - 필요시 작성. 한 줄당 최대 72자까지, 72자 초과시 줄바꿈, ”왜”, “무엇을 위해” 작업했는지에 초점을 맞춰 작성
# 바로 밑줄에 작성

# 바로 아래 한 줄 공백 유지 (본문과 바닥글의 분리를 위함)

################################
# <바닥글> - 필요시 작성
# 바로 밑줄에 작성 (이슈 해결 시에는 resolve: #99와 같이 작성)

#######🆁🅴🅼🅴🅱🅴🆁 🅼🅴######
# [타입 리스트]
#  fix: 올바르지 않은 동작(버그)을 고친 경우
#  feat: 새로운 기능을 추가한 경우
#  add: feat 이외의 부수적인 코드, 라이브러리 등을 추가한 경우, 새로운 파일(Component나 Activity 등)을 생성한 경우도 포함
#  refactor: 내부 로직은 변경하지 않고 기존의 코드를 개선한 경우, 클래스명 수정&가독성을 위해 변수명을 변경한 경우도 포함
#  remove: 코드, 파일을 삭제한 경우, 필요 없는 주석 삭제도 포함
#  move: fix, refactor 등과 관계 없이 코드, 파일 등의 위치를 이동하는 작업만 수행한 경우
#  style: 내부 로직은 변경하지 않고 코드 스타일, 포맷 등을 수정한 경우, 줄 바꿈, 누락된 세미콜론 추가 등의 작업도 포함
#  design: CSS 등 사용자 UI 디자인을 추가, 수정한 경우
#  comment: 필요한 주석을 추가, 수정한 add경우(❗ 필요 없는 주석을 삭제한 경우는 remove)
#  docs: 문서를 추가, 수정한 경우
#  test: 테스트 코드를 추가, 수정, 삭제한 경우
#  chore: 위 경우에 포함되지 않는 기타 변경 사항
# ------------------
# [커밋 메시지 예시]
#  fix: CardList 컴포넌트 클릭 시 공백으로 나오는 오류 수정
#
#  모바일 버전에서 CardList의 img 부분 클릭 시 공백으로 나오는 오류 수정.
#  PC 버전은 이상 없음.
#
#  resolve: #232
# ------------------
# [우리 팀이 지켜야 할 보편적 규칙]
#  1. 언어는 한국어를 사용한다.
#    - 예외 사항) 최초 커밋 메시지는 “Initial commit”으로 한다.
#  2. 문장의 구성
#    1) 문장은 간결하게 구성한다.
#    2) 현재형을 사용한다.
#  3. 작성한 당사자가 아닌 제 3자가 이해할 수 있도록 작성한다.
#  4. 단순한 문장일수록 좋다.
# ------------------
# [우리 팀의 커밋 타이밍]
#  - 의미 있는 코드의 변화가 있다면 커밋을 진행한다.
#  - 의미가 있다면 사소한 것을 커밋 하는 것은 전혀 잘못된 것이 아니다.
#  - 다만 의미 없는 잦은 커밋은 히스토리 추적에 불편함을 주므로 의미 없는 커밋은 자제한다.
################################
```

### ☑️ 브랜치 양식

---

```
💡 master = 배포 버전

develop = release (BE, FE 통합)

back/develop = BE 통합

- feature (개발)
- fix (오류 수정)

ex)  back
back/feature/[issue]f
back/fix/[issue]

front/develop = FE 통합
- feature (개발)
- fix (오류 수정)
```