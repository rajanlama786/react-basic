import React from "react";
import Select from "react-select";
import { useState } from "react";

function PostMeta() {
  const [value, setValue] = useState(null);
  const options = [
    { value: "tag", label: "Tag" },
    { value: "category", label: "Category" },
    { value: "author", label: "Author" },
    { value: "date", label: "Publish Date" },
  ];

  return (
    <div style={{ margin: "20px", width: "200px" }}>
      <Select
        options={options}
        defaultValue={value}
        placeholder="Select"
        onChange={setValue}
        isMulti
        isSearchable
        noOptionsMessage={() => "NO snack found..."}
      />
    </div>
  );
}

export default PostMeta;
