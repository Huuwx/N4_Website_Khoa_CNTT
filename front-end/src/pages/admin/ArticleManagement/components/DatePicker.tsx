import { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface DatePickerProps {
  selectedDate: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const DatePicker = ({ selectedDate, onChange, placeholder = 'DD/MM/YYYY' }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Xử lý click bên ngoài để đóng date picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Đơn giản hóa - trong thực tế bạn sẽ cần một calendar picker thực sự
  return (
    <div className="relative" ref={datePickerRef}>
      <div className="relative">
        <input
          type="text"
          className="pl-10 pr-4 py-2 border rounded-md w-full"
          placeholder={placeholder}
          value={selectedDate}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => setIsOpen(!isOpen)}
        />
        <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {/* Đây chỉ là một ví dụ đơn giản - trong thực tế bạn sẽ cần một calendar picker đầy đủ */}
      {isOpen && (
        <div className="absolute mt-1 bg-white border rounded-md shadow-lg p-2 z-10 w-64">
          <p className="text-sm text-gray-500 mb-2">Nhập ngày theo định dạng DD/MM/YYYY</p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                const today = new Date();
                const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
                onChange(formattedDate);
                setIsOpen(false);
              }}
              className="text-sm text-primary hover:underline"
            >
              Hôm nay
            </button>
            <button
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className="text-sm text-gray-500 hover:underline"
            >
              Xóa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;