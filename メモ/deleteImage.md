## 画像を削除する関数

```JS
const deleteImage = useCallback( async (id) => {
  const ret = window.confirm("この画像を削除しますか？")
  if (!ret) {
    return false
  } else {
    const newImages = images.filter(image => image.id !== id)
    props.setImages(newImages);
    return storage.ref("images")child(id).delete()
  }
},[images])
```

- confirm()で削除を確認
- filter()で削除する画像以外を残す
- delete()でStorageから削除