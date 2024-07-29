import { Link } from 'react-router-dom';

const navBar = (
  <div className="navbar bg-base-300 flex-col h-screen w-min">
    {/* 로고 부분 */}
    <Link to="/">
      <a className="btn btn-ghost text-3xl p-0">맘대로 로고</a>
    </Link>
    {/* 메뉴 부분 */}
    <div className=" break-keep flex-nowrap">
      <ul
        tabIndex={0}
        className="min-w-[12rem] menu menu-sm bg-base-100 rounded-box z-[1] mt-3 p-2 font-bold text-xl justify-center"
      >
        <li>
          <a className="text-lg">상담사 조회</a>
        </li>
        <li>
          <a className="text-lg">익명 방명록</a>
        </li>
        <li>
          <a className="text-lg">간단 심리 테스트</a>
        </li>
        <li>
          <a className="text-lg">자가 심리 검진</a>
        </li>
        <li>
          <a className="text-lg">커뮤니티</a>
        </li>
        <li>
          <a className="text-lg">감정 일기</a>
        </li>
        <li>
          <a className="text-lg">나의 상담</a>
        </li>
      </ul>
    </div>
    {/* 공지사항, 알림 부분 */}
    <div className="flex w-[180px] h-[55px] items-center justify-center gap-[5px] absolute bottom-0">
      <div className="relative w-[4rem] font-text text-[length:var(--text-font-size)] font-[number:var(--text-font-weight)] text-x text-center tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
        공지사항
      </div>
      <button className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <button className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
  </div>
);

function App() {
  return navBar;
}

export default App;
