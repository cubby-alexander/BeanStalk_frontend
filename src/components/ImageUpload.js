import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button } from "reactstrap";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

function ImageUpload(props) {
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.avatar ? defaultAvatar : defaultImage
  );

  const fileInput = React.useRef(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
        props.imageSet(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };

  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (props.avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button
            className="btn-round"
            color="default"
            outline
            onClick={handleClick}
          >
            {props.avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button
              className="btn-round"
              outline
              color="default"
              onClick={handleClick}
            >
              Change
            </Button>
            {props.avatar ? <br /> : null}
            <Button
              color="danger"
              className="btn-round btn-link"
              onClick={handleRemove}
            >
              <i className="fa fa-times" />
              Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
};

export default ImageUpload;