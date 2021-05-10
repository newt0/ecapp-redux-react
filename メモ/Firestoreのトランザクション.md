# Firestoreのトランザクション

- 一つ以上のドキュメント（最大500）に読み書きを行う
- 処理が失敗するとロールバックする

```js
db.runTransaction(transaction => {
  return transaction.get(productsRef.doc(product.productId))
    .then(snapshot => {
      const data = snapshot.data()
      // 省略
      transaction.update(
        productsRef.doc(product.productId),
        {sizes: updatedSizes}
      )
    })
}).catch(error => {
  throw new Error("Transaction Failed!")
})
```

途中で一つでも処理が失敗したら最初から戻す。一連の処理を途中で失敗したまま実行した状態にしておくとデータの不整合が起きる。例えば口座からの引き出し等。

`db.runTransaction`メソッドはtransactionを引数に受け取り、このtransactionを使ってメソッドをいくつか呼び出す

`transaction.get`
firestoreのトランザクションはまず必ず何かのドキュメントに対してget=読み込みを行う

`transaction.get(productsRef.doc(product.productId)`
productのidに対して読み込みを行う

↑の結果
`const data = snapshot.data()`

`transaction.update`
何かのドキュメントに対して書き込み処理を行う
`transaction.update`は何度も何度も重ねられる
最後にまとめて処理をする