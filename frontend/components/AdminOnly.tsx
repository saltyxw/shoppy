import { useAuthStore

 } from "@/store/user.store";
const AdminOnly = ({ children: }) => {
  const role = useAuthStore((s) => s.user?.role);
  if (role !== "ADMIN") return null;
  return children;
};
