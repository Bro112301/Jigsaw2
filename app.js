function uploadImage() {
    const input = document.getElementById('imageInput');
    const imageContainer = document.getElementById('imageContainer');
    const puzzleImage = document.getElementById('puzzleImage');

    input.onchange = function (event) {
        const file = event.target.files[0];
        const imageURL = URL.createObjectURL(file);
        puzzleImage.src = imageURL;
        imageContainer.style.display = 'block';
    };

    input.click();
}

function generatePuzzle() {
    const formData = new FormData();
    const fileInput = document.getElementById('imageInput');
    formData.append('image', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('shareLink').value = window.location.origin + data.link;
        document.getElementById('puzzleLink').href = window.location.origin + data.link;
        document.getElementById('puzzleLink').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}
