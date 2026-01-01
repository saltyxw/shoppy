import {
  ShoppingFilled,
  UnorderedListOutlined,
  SendOutlined,
  FireFilled,
  PercentageOutlined,
} from "@ant-design/icons";

export const sideBarLinks = [
  {
    key: "sub1",
    label: "All products",
    icon: <ShoppingFilled />,
    children: [
      {
        key: "g1",
        type: "group",
        children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Categories",
    icon: <UnorderedListOutlined />,
    children: [
      {
        key: "g2",
        type: "group",
        children: [
          { key: "3", label: "Option 1" },
          { key: "4", label: "Option 2" },
        ],
      },
    ],
  },
  {
    key: "sub3",
    label: "New Arrival",
    icon: <SendOutlined />,
  },
  {
    key: "sub4",
    label: "Best Seller",
    icon: <FireFilled />,
  },
  {
    key: "sub5",
    label: "On Discount",
    icon: <PercentageOutlined />,
  },
];
