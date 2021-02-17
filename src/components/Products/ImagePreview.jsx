import React from "react";

const ImagePreview = (props) => {
  return (
    <div className="p-media__thumb">
      <img src={props.path} alt="プレビュー画像" id={props.id} />
    </div>
  );
};

export default ImagePreview;
