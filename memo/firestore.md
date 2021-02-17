## add メソッド

- 自動で id を採番
- data を渡すだけ

```JS
const productsRef = db.collection("products")
const data = {
  description: description,
  name: name,
  price: parceInt(price, 10),
}

return productsRef.add(data).
    then(() => {
      dispatch(push("/"))
    }).catch((error) => {
      throw new Error(error)
    })
```

`add` メソッドであれば `collection` の中に自動で `id` を採番した `document` を作成してくれて、その `document` が保持するデータが `const data = {}`で定義した内容になる。なので、`data`を`add`メソッドの引数に渡すだけで OK

## set メソッド

ID を自動採番（add メソッドと同じ）

```JS
return productsRef.doc().set(data)
```

事前に自動採番された ID を取得できる

```JS
const ref = productsRef.doc()
const id = ref.id
data.id = id // ↑で作成したdataのプロパティにproductsRef.doc().idを追加
return productsRef.doc(id).set(data) //idを自動採番しつつ、dataにもidを追加して、その状態でfirestoreにデータを追加できる
```

変更部分のみ merge できる

```JS
prodcutsRef.doc(id).set(data, {merge: true}) // merge: trueを指定しないとデータを完全に上書きする
```
