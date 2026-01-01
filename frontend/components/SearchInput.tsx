import Search from "antd/es/input/Search";

export default function SearchInput() {
  return (
    <Search
      placeholder="Search products..."
      enterButton
      className="max-w-xl w-full"
    />
  );
}
