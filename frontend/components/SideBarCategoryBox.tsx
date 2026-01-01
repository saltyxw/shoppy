import { Menu } from "antd";
import { sideBarLinks } from "@/configs/sideBarCategories";

export default function SideBarCategoryBox() {
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="vertical"
      items={sideBarLinks}
    />
  );
}
