# Firestoreのバッチ書き込み

- 一つ以上のドキュメント（最大500）に読み書きを行う
- 処理が失敗するとロールバックする

```js
const batch = db.batch() 
// 省略
batch.update(
  productsRef.doc(product.productId),
  {sizes: updatedSizes}
)

batch.commit().then(() => {
  // 省略
}).catch(() => { 
  throw new Error("Batch Failed!")
})
```

`db.batch() `を定数batchにいれる。

`batch.update()`や`batch.set()`メソッドを呼び出す呼び出す

トランザクションと同じように更新処理をして、最後に
`batch.commit()`を呼び出すとまとめた処理を同時に実行してくれる（最大500件）

`batch.commit()`が成功したら`.then()`、失敗したら`.catch()`に進む。
`.catch()`に進んだら`batch.update()`等は全てロールバックされる