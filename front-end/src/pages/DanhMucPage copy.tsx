import { useState } from "react";
import DanhMucTable from "../components/DanhMucTable";
import DanhMucForm from "../components/DanhMucForm";

export default function DanhMucPage() {
  return (
    <div>
      {/* Bảng danh mục tự động cập nhật khi có thay đổi */}
      <DanhMucTable />
    </div>
  );
}
