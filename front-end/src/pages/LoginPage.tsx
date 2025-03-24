import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login({ username, password });
      if (response.data.accessToken) {
        // Redirect based on role
        const role = response.data.role;
        if (role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'TÀI KHOẢN HOẶC MẬT KHẨU KHÔNG ĐÚNG!');
      } else {
        setError('TÀI KHOẢN HOẶC MẬT KHẨU KHÔNG ĐÚNG!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-teal-600 p-4">
      <div className="m-auto w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left side - University Building Image */}
          <div className="md:w-5/12">
            <div className="relative h-full">
              <img
                src="https://i1-vnexpress.vnecdn.net/2023/06/23/334267397-525694706433267-7682-2253-2798-1687518399.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=a2-gVLLTk062p_cEjYnNuA"
                alt="Thuy Loi University"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="flex flex-col p-6 md:w-7/12">
            {/* University Logo and Title */}
            <div className="mb-8 flex flex-col items-center">
              <img
                src="https://www.tlu.edu.vn/Portals/0/2014/Logo-WRU.png"
                alt="Logo"
                className="mb-2 h-14"
              />
              <h1 className="text-center text-sm font-medium text-gray-600">
                KHOA CÔNG NGHỆ THÔNG TIN
              </h1>
              <h2 className="text-center text-sm font-bold text-blue-900">
                FACULTY OF COMPUTER SCIENCE AND ENGINEERING THUYLOI UNIVERSITY
              </h2>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
              {/* Username Field */}
              <div>
                <input
                  type="text"
                  placeholder="TÀI KHOẢN"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded bg-gray-200 p-3 text-gray-700 focus:outline-none"
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <input
                  type="password"
                  placeholder="MẬT KHẨU"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded bg-gray-200 p-3 text-gray-700 focus:outline-none"
                  disabled={isLoading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-center text-xs text-red-600">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="rounded bg-red-800 py-3 font-medium uppercase text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? <LoadingSpinner /> : 'ĐĂNG NHẬP'}
              </button>

              {/* Help Link */}
              <div className="mt-2 text-right text-xs">
                <span>NẾU BẠN CẦN HỖ TRỢ </span>
                <a href="#" className="font-medium text-blue-600 hover:underline">
                  LIÊN HỆ
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;