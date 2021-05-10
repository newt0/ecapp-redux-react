## Router で正規表現を使う

```JS
// <Route exact path="(/)?" component={ProductList}/>
// <Route exact path="product/:id" component={ProductDetail}/>
<Route path="/product/edit(/:id)?" component={ProductEdit}/>
```

↓
`exact` を付けない

- `()`で囲んだ文字列はあってもなくてもマッチ
- `:id`は変数扱い

url に変数として id を渡して、url から id を取得する

## useEffect で既存データを set する

```JS
let id = window.location.pathname.split("/product/edit")[1];
if (id !== "") {
  id = id.split("/")[1]
}

useEffect(()=>{
  if(id !== "") {
    db.collection("products").doc(id).get().then(snapshot => {
      const product = snapshot.data()
      setName(product.name)
      // 省略
    })
  }
},[id])
```

`window.location.pathname`で URL を取得。
`split`メソッドで`("products/edit")`で区切る。
`split`メソッドは配列を返すので、[1]で`("products/edit")`の後の部分を取得できる。これを変数`id`に格納。
もし新規作成ページであれば`("products/edit")`で完結している。
`if(id !== "")`で新規作成か否かを判定する。
`id`に何かしらの値が入っているなら、`id = id.split("/")[1]`で頭の`/`をなくすことで純粋な商品情報の`id`を取得する。

商品情報の編集の時だけ`useEffect`を使いたいので、 `if(id !== "")`。

`id`が空白じゃない時は、`"products"`コレクションから`id`とマッチする情報を`get()`してくる。`db.collection("products").doc(id).get().`

その取得した情報を`useState`で宣言したローカルの State に入れていく

```JS
const product = snapshot.data()
setName(product.name)
```
