## Firestore のリスナーの設定

```JS
useEffect(()=>{
  const unsubscribe = db.collection("users").doc(userId).collection("cart").onSnapshot((snapshots)=>{
    snapshots.docChanges().forEach(change=>{
      // 省略
    })
  })

},[])
```

unsubscribe という定数に入れて、関数として呼び出す。
最初はリスナーが設定されて常にアプリから firestore にリッスンしている状態になるが、component がアンマウントされるとき（例えばページ遷移するとき等）unsubsribe が呼び出されてリスナーが解除される。

useEffect のクリーンアップで unsubscribe しないとリスナーが重なって大変なことになる。

- onSnapshot でリスナーを設定
- return で unsubscribe()を呼び出す

```JS
snapshots.docChanges().forEach((change) => {
  const product = change.doc.data()
  const changeType = change.type()

  switch (changeType) { // changeTypeに応じて配列操作
    case "add":
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
