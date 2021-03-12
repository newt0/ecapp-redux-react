## Firestore のリスナーの設定

```JS
useEffect(()=>{
  const unsubscribe = db.collection("users").doc(userId).collection("cart").onSnapshot((snapshots)=>{
    snapshots.docChanges().forEach(change=>{ //cartに対してonSnapshotを使う。onSnapshotは複数のsnapshotsを取得するので、それをforEachでグルグル回す
      // 省略
    })
  })

},[])
```

cart に対して onSnapshot を使う。onSnapshot は複数の snapshots を取得するので、それを forEach でグルグル回す

onSnapshot の結果を unsubscribe という定数の中に入れる

useEffect のクリーンアップ=componentWillUnmount のタイミングで、コールバックの形で unsubscribe を関数として呼び出す。
最初はリスナーが設定されてアプリから常に firestore をリッスンしている状態になるが、コンポーネントがアンマウントされるとき、リスナーが解除される

## 実際に onSnapshot のなかで何をしているか

```JS
snapshots.docChanges().forEach((change) => {
  const product = change.doc.data() //change.doc.data()で cart のなかにある商品情報を取得できる

  const changeType = change.type //change.typeは

  switch (changeType) { // changeTypeに応じて配列操作added,modified,removedの三つがある
    case "added":
      productsInCart.push(product)
      break;
    case "modified":
      // 省略
    case "removed":
       // 省略
    default:
      break;
  }
})
```

snapshots.docChanges().forEach で引数で受け取るのが change になる
