## Firestore のトランザクション

- 一つ以上のドキュメント（最大 500）に対する読み書きを行う
- 処理が失敗するとロールバックする

```JS
db.runTransaction(transaction => {
  return transaction.get(productsRef.doc(product.productId))
  .then(snapshot => {
    const data = snapshot.data()
    // 省略
    transaction.update(
      productRef.doc(product.productId)
      {sizes: updateSizes}
    )
  }).catch(error => {
    throw new Error("Transaction Failed!")
  })
})
```

## Firestore のバッチ書き込み

- 一つ以上のドキュメント（最大５００）に書き込みを行う
- 処理が失敗するとロールバックする

```JS
const batch = db.batch()
// 省略
batch.update(
  productsRef.doc(product.productId),
  {sizez: updateSizes}
)

batch.commit().then(() => {
  // 省略
}).catch(() => {
  throw new Error("Batch Failed!")
})
```
