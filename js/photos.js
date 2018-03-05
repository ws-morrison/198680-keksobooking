'use strict';

(function () {

  var TYPES_OF_IMAGES = {
    'GIF': '',
    'JPEG': '',
    'PNG': ''
  };

  var previewAvatarContainer = document.querySelector('.notice__preview');
  var uploadAvatarControl = document.querySelector('#avatar');
  var uploadImageControl = document.querySelector('#images');
  var previewImageContainer = document.querySelector('.form__photo-container');

  var changeInputAvatarHandler = function (evt) {
    for (var i = 0; i < this.files.length; i++) {
      showPreviewAvatar(this.files[i]);
    }
  };

  var changeInputImageHandler = function (evt) {
    for (var i = 0; i < this.files.length; i++) {
      showPreviewImage(this.files[i]);
    }
  };


  var showPreviewAvatar = function (imageFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(imageFile.type)) {
      console.log('Изображение не поддерживается');
      return;
    }

    var fileReader = new FileReader();
    fileReader.addEventListener('load', displayAvatarFileReaderHandler);
    fileReader.readAsDataURL(imageFile);
  };

  var showPreviewImage = function (imageFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(imageFile.type)) {
      console.log('Изображение не поддерживается');
      return;
    }

    var fileReader = new FileReader();
    fileReader.addEventListener('load', displayImageFileReaderHandler);
    fileReader.readAsDataURL(imageFile);
  };

  var displayAvatarFileReaderHandler = function (evt) {
    var oldAvatar = previewAvatarContainer.querySelector('img');

    var uploadImage = document.createElement('img');

    uploadImage.height = '70';
    uploadImage.width = '70';
    previewAvatarContainer.style.background = '#EEEEE7';
    uploadImage.src = evt.target.result;
    previewAvatarContainer.replaceChild(uploadImage, oldAvatar);
    previewAvatarContainer.appendChild(uploadImage);
  };

  var displayImageFileReaderHandler = function (evt) {

    var uploadImage = document.createElement('img');

    uploadImage.height = '70';
    uploadImage.width = '70';

    uploadImage.src = evt.target.result;
    previewImageContainer.appendChild(uploadImage);
  };


  uploadAvatarControl.addEventListener('change', changeInputAvatarHandler);
  uploadImageControl.addEventListener('change', changeInputImageHandler);
})();
