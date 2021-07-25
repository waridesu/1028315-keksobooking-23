const imageChanging = (changeItem, pictureAddress) => {
  const avatar = document.querySelector(changeItem);
  const avatarHandler = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    const img = document.querySelector(pictureAddress);
    img.title = selectedFile.name;

    reader.onload = (evt) => img.src = evt.target.result;
    reader.readAsDataURL(selectedFile);
  };
  avatar.addEventListener('change', avatarHandler);
};
const backgroundChanging = (changeItem, pictureAddress) => {
  const avatar = document.querySelector(changeItem);
  const backgroundHandler = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    const img = document.querySelector(pictureAddress);
    img.title = selectedFile.name;

    reader.onload = (evt) => {
      img.style.background = `url(${evt.target.result}) no-repeat`;
      img.style.backgroundSize = 'cover';
    };
    reader.readAsDataURL(selectedFile);
  };
  avatar.addEventListener('change', backgroundHandler);
};

export {imageChanging, backgroundChanging};
