import { Suspense, lazy } from "react";
import AdminNav from "@/components/admin/AdminNav";

const AllUsers = lazy(() => import("@/components/admin/AllUsers"));

const AdminAllUser = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white px-3 sm:px-6 py-4 sm:py-8">
      <AdminNav />
      <Suspense fallback={<p className="text-white">Loading users module...</p>}>
        <AllUsers />
      </Suspense>
    </div>
  );
};

export default AdminAllUser;