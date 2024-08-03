// 현재(24.08.02)기준 사용 X LJB
import React from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper';
import RoundedButton from '@/components/button/RoundedButton';

interface PasswordChangeModalProps {
  password: string;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ password }) => {
  const openModal = () => {
    const modal = document.getElementById('changePwdModal');
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  const changePwd = () => {
    console.log('비밀번호 변경');
  };
  // if (!isOpen || !password) return null;

  return (
    // <ModalWrapper isOpen={isOpen} onClose={onClose}>
    <>
      <span className="w-1/2">
        <RoundedButton label="비밀번호 변경하기" onClick={openModal} size="lg" user="common" />
      </span>
      {/* modal 창 */}
      <dialog className="modal" id="changePwdModal">
        <div className="modal-box">
          <form className="flex flex-wrap pt-20 pb-5 px-10">
            <label htmlFor="currentPwd" className="w-1/3">
              현재 비밀번호
            </label>
            <input type="text" id="currentPwd" className="border w-1/2" />
            <label htmlFor="newPwd" className="w-1/3">
              새 비밀번호
            </label>
            <input type="text" id="newPwd" className="border w-1/2" />
            <label htmlFor="reNewPwd" className="w-1/3">
              새 비밀번호 확인
            </label>
            <input type="text" id="reNewPwd" className="border w-1/2" />
          </form>
          <div className="modal-action justify-center">
            {/* 모달 창 끄는 form */}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            {/* 비밀번호 변경 form */}
            <form method="dialog">
              <RoundedButton label="비밀번호 변경" onClick={changePwd} size="md" user="counselor" />
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
    // </ModalWrapper>
  );
};

export default PasswordChangeModal;
