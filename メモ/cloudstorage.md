## Cloud Storage に画像をアップロード

```JS
const uploadImage = useCallback((event) => {
  const file = event.target.files
  let blob = new Blob(file, {type: "image/jpeg"})

  // Generate random 16 digit trings
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const N = 16
  const fileName = Array.from(crypto.getRandomValues(newUint32Array(N)))
     .map((n) => S[n%S.length]).join("")

// 処理の前半はここまで
}, [props.setImages])
```

`const file = event.target.files` でファイルを取得できる。
↑ のままアップできないため blob に変換する。
`new Blob`で Blob オブジェクトを呼び出して、第一引数に定数に入れたファイル、第二引数にファイルのタイプを指定する。それを blob という変数に格納。

Cloud Storage に同じ名前のファイルが存在すると、アップできない。または上書きされてしまう。
Cloud Storage にアップロードされた画像ファイル名が競合を起こさないように、こちらでランダムな名前を与える。

`const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"`で文字列をランダム生成するときに使う文字列（アルファベットと数字）を定義。
`const N = 16`で文字列の桁数を指定（16 桁）
`Array.from`で文字列から文字列から Array を生成するというメソッドを使って、最終的に`.join`メソッドで 16 個の要素を持つ配列を 16 桁の文字列に連結。

```JS
const uploadImage = useCallback((event) => {
  // ここから処理の後半
  const uploadRef = storage.ref("images").child(fileName);
  const uploadTask = uploadRef.put(blob);

  uploadTask.then(() => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      const newImage = { id: fileName path: downloadURL};
      props.setImages((prevState => [...prevState, newImage]))
    })
  })

}, [props.setImages])
```

`storage`は`const storage = firebase.storage();`のこと。
`storage.ref("images")`で Cloud Storage 上の`images`というディレクトリにアップするというパスの指定。
`.chile(fileName)`でファイルネームを指定して Cloud Storage に画像をアップ。

アップするときは`.put(blob)`メソッドをつかう。`.put()`メソッドの引数に渡すのが先ほど作った`blob`。

`uploadTask.then()`でアップが完了した後に実行する処理を記述できる。
`uploadTask.snapshot.ref.getDownloadURL()`メソッドでアップが完了した画像ファイルがダウンロードできる url を取得できる。
この取得した url （`downloadURL`）を<img/>タグの`src`の値に指定すると画像を表示できる。

`images`というローカルの State を用意しておく。
`downloadURL`を取得したら、`downloadURL`を使って、`setImages`というセット関数で State を更新する。

`setImages(())`
`setImages()`内をさらに`()`で囲い、
`prevState => [...prevState, newImage]`と`prevState`を展開してその末尾に`newImage`を追加する。
これで前回までの State に新しい State を追加できる。
