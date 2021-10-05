const profilePicture = document.getElementById('ProfilePicture');
const changeBtn = document.getElementById('PfPBtn');
const previewContainer = document.getElementById('imagePreview');
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

profilePicture.addEventListener('change', function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";
        reader.addEventListener('load', function(){
            previewImage.setAttribute('src', this.result);
            document.getElementById('PFPdataURI').value=this.result;
        });
        reader.readAsDataURL(file);
    } else{
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute('src', '')
    }
});
