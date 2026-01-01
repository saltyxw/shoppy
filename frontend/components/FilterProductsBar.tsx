import { Select, Space } from "antd";

const options = [
  {
    desc: "Feeling Good",
  },
  {
    desc: "Feeling Blue",
  },
  {
    desc: "Furious",
  },
  {
    desc: "Chilling",
  },
  {
    desc: "Need Sleep",
  },
];

export default function FilterProductsBar() {
  return (
    <aside className="max-w-xl mx-auto">
      <h3>Filters</h3>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Filter products"
        defaultValue={["happy"]}
        onChange={(value) => {
          console.log(`selected ${value}`);
        }}
        options={options}
        optionRender={(option) => <Space>{`(${option.data.desc})`}</Space>}
      />
    </aside>
  );
}
