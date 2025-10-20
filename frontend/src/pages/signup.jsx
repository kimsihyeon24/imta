import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [nicknameState, setNicknameState] = useState(null);
  const [idState, setIdState] = useState(null);
  const [pwState, setPwState] = useState(null);
  const [confirmPwState, setConfirmPwState] = useState(null);

  const [checkNickname, setCheckNickname] = useState(false);
  const [checkId, setCheckId] = useState(false);

  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    const value = e.target.value;
    if (value.length < 2) {
      setNicknameState(false);
    } else {
      setNicknameState(true);
    }
  };
  const handleIdChange = (e) => {
    setId(e.target.value);
    const value = e.target.value;
    if (value.length < 4) {
      setIdState(false);
    } else {
      setIdState(true);
    }
  };
  const handlePwChange = (e) => {
    setPw(e.target.value);
    const value = e.target.value;
    if (value.length < 4) {
      setPwState(false);
    } else {
      setPwState(true);
    }
  };
  const handleConfirmPwChange = (e) => {
    setConfirmPw(e.target.value);
    const value = e.target.value;
    if (pw !== value) {
      setConfirmPwState(false);
    } else {
      setConfirmPwState(true);
    }
  };
  // 닉네임 중복 확인 로직
  const checkHandleNickname = () => {
    if (!nicknameState) {
      alert("닉네임을 2글자 이상 적어주세요.");
    }
  };
  // 아이디 중복 확인 로직
  const checkHandleId = () => {
    if (!idState) {
      alert("아이디를 4글자 이상 적어주세요.");
    }
  };

  const handleSignup = () => {
    alert("회원가입이 완료되었습니다!");
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center min-h-screen  bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="flex flex-col  justify-center h-screen">
        <div className="flex flex-col gap-3">
          <p>닉네임</p>
          <div>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className={`border rounded-md p-2 mb-4 w-64 ${
                nicknameState === false ? "border-red-500" : "border-gray-300"
              }`}
              maxLength={15}
            />
            <button
              onClick={checkHandleNickname}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              중복확인
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>아이디</p>
          <div>
            <input
              type="text"
              value={id}
              onChange={handleIdChange}
              className={`border rounded-md p-2 mb-4 w-64 ${
                idState === false ? "border-red-500" : "border-gray-300"
              }`}
              maxLength={20}
            />
            <button
              onClick={checkHandleId}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              중복확인
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>비밀번호</p>
          <input
            type="password"
            value={pw}
            onChange={handlePwChange}
            className={`border rounded-md p-2 mb-4 w-64 ${
              pwState === false ? "border-red-500" : "border-gray-300"
            }`}
            maxLength={10}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p>비밀번호 확인</p>
          <input
            type="password"
            value={confirmPw}
            onChange={handleConfirmPwChange}
            className={`border rounded-md p-2 mb-4 w-64 ${
              confirmPwState === false ? "border-red-500" : "border-gray-300"
            }`}
            maxLength={10}
          />
        </div>
        <div className="flex gap-8 mt-4">
          <button onClick={handleLogin} className="w-28 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
            로그인
          </button>
          <button onClick={handleSignup} className="w-28 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
