'use strict';

(function () {

  var TYPES_OF_IMAGES = {
    'GIF': '',
    'JPEG': '',
    'PNG': ''
  };

  var previewImageContainer = document.querySelector('.notice__preview'); // отображение загруженного элемента
  var uploadImagesControl = document.querySelector('.notice__photo .dropzone'); // кнопка по которой жмакают

  uploadImagesControl.addEventListener('change', changeInputFilesHandler);

  function changeInputFilesHandler(evt) {
    for (var i = 0; i < this.files.length; i++) {
      showPreviewImage(this.files[i]);
    }
  }

  function showPreviewImage(imageFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(imageFile.type)) {
      console.log('Изображение не поддерживается');
      return;
    }

    var fileReader = new FileReader();
    fileReader.addEventListener('load', displayImageFileReaderHandler);
    fileReader.readAsDataURL(imageFile);
  }

  function displayImageFileReaderHandler(evt) {
    var uploadImage = document.createElement('img');
    previewImageContainer.appendChild(uploadImage);
    uploadImage.src = evt.target.result;
  }

})();
