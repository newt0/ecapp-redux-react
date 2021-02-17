import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { storage } from "../../firebase";
import { ImagePreview } from "../Products";

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea = (props) => {
  const classes = useStyles();
  const images = props.images;

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: "image/jpeg" });

      // Generate random 16 digit trings
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        /* eslint-disable */
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };

          props.setImages((prevState => [...prevState, newImage]));
          /* eslint-enable */
        });
      });
    },
    [props.setImages]
  );

  return (
    <div>
      <div className="p-grid__list-images">
        {images.length > 0 &&
          images.map((image) => (
            <ImagePreview id={image.id} path={image.path} key={image.id} />
            // propsで渡ってきたimages自体が、newImageにある通りオブジェクトの形になっている
          ))}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;

// <label></label>でiconを囲むと、iconをクリックするとFinderやexplorerを出せる
