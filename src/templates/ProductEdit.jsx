import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ImageArea } from "../components/Products";
import { TextInput, SelectBox, PrimaryButton } from "../components/UIkit";
import { db } from "../firebase";
import { saveProduct } from "../reducks/products/operations";

const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/product/edit")[1];
  console.log("Before split /", id);
  if (id !== "") {
    id = id.split("/")[1];
    console.log("After split id->", id);
  }

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState(""),
    [images, setImages] = useState([]);

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

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: "tops", name: "トップス" },
    { id: "shirts", name: "シャツ" },
    { id: "pants", name: "パンツ" },
  ];

  const genders = [
    { id: "all", name: "全て" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
    { id: "others", name: "その他" },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          console.log(data);
          setName(data.name);
          setImages(data.images);
          setGender(data.Gender);
          setCategory(data.category);
          setPrice(data.price);
          setDescription(data.description);
        });
    }
  }, [id]);

  return (
    <div>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
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
        <SelectBox
          label={"カテゴリー"}
          options={categories}
          required={true}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label={"性別"}
          options={genders}
          required={true}
          select={setGender}
          value={gender}
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
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images
                )
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;

// そのページで使用するStateをまず定義した方が分かりやすい
