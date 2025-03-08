import DanhMucTable from "../components/DanhMucTable";
import DanhMucForm from "../components/DanhMucForm";
import LienHeTable from "../components/LienHeTable";

export default function DanhMucPage() {
  return (
    <div>
      {/* Bảng danh mục tự động cập nhật khi có thay đổi */}
      <LienHeTable />
    </div>
  );
}
