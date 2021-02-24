import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ImageArea, SetSizesArea } from "../components/Products";
import { TextInput, SelectBox, PrimaryButton } from "../components/UIkit";
import { db } from "../firebase";
import { saveProduct } from "../reducks/products/operations";

const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/product/edit")[1];
  // console.log("Before split /", id);
  if (id !== "") {
    id = id.split("/")[1];
    // console.log("After split id->", id);
  }

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [images, setImages] = useState([]),
    [category, setCategory] = useState(""),
    [categories, setCategories] = useState([]),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState(""),
    [sizes, setSizes] = useState([]);

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

  const genders = [
    { id: "all", name: "ALL GENDERS" },
    { id: "male", name: "MALE" },
    { id: "female", name: "FEMALE" },
    { id: "others", name: "OTHERS" },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const product = snapshot.data();
          setName(product.name);
          setDescription(product.description);
          setImages(product.images);
          setCategory(product.category);
          setGender(product.gender);
          setPrice(product.price);
          setSizes(product.sizes);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          list.push(snapshot.data());
        });
        setCategories(list);
      });
  }, []);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">キャストの登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={"NAME"}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"DESCRIPTION"}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
          type={"text"}
        />
        <SelectBox
          label={"CATEGORY"}
          options={categories}
          required={true}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label={"GENDER"}
          options={genders}
          required={true}
          select={setGender}
          value={gender}
        />
        <TextInput
          fullWidth={true}
          label={"PRICE"}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={"number"}
        />
        <div className="module-spacer--small" />
        <SetSizesArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={"キャスト情報を保存"}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  sizes,
                  images
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;

// そのページで使用するStateをまず定義した方が分かりやすい
