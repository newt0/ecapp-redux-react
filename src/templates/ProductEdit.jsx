import React, { useCallback, useState } from "react";
import { TextInput } from "../components/UIkit";

const ProductEdit = () => {
  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState("");

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputCategory = useCallback(
    (event) => {
      setCategory(event.target.value);
    },
    [setCategory]
  );

  const inputGender = useCallback(
    (event) => {
      setGender(event.target.value);
    },
    [setGender]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  return (
    <div>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <TextInput
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          onChange={inputName}
          value={name}
          rows={1}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={false}
          required={true}
          onChange={inputDescription}
          value={description}
          rows={1}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"カテゴリー"}
          multiline={false}
          required={true}
          onChange={inputCategory}
          value={category}
          rows={1}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"性別"}
          multiline={false}
          required={true}
          onChange={inputGender}
          value={gender}
          rows={1}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"価格"}
          multiline={false}
          required={true}
          onChange={inputPrice}
          value={price}
          rows={1}
          type={"text"}
        />
      </div>
    </div>
  );
};

export default ProductEdit;

// そのページで使用するStateをまず定義した方が分かりやすい
