import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    // 로그인 처리 로직
    alert(`${id} 님 환영합니다!`);
    navigate("/timechart");
  };
  const handleSignup = () => {
    // 회원가입 처리 로직
    navigate("/signup");
  };
  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="flex flex-col  items-center justify-center h-screen">
        <img src={Logo} alt="임타로고" className="w-1/4" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <p>ID</p>
            <input
              type="text"
              value={id}
              onChange={handleIdChange}
              placeholder="아이디를 입력하시오"
              className="p-3 border rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p>PW</p>
            <input
              type="password"
              value={pw}
              onChange={handlePwChange}
              placeholder="비밀번호를 입력하시오"
              className="p-3 border rounded-lg"
            />
          </div>
          <div className="flex justify-evenly gap-4">
            <button
              onClick={handleSignup}
              className="w-28 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              회원가입
            </button>
            <button
              onClick={handleLogin}
              className="w-28 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
