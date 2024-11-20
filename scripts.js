document.getElementById('image-upload').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('image-canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                document.getElementById('canvas-section').classList.remove('hidden');
                eggCounter = 0; // Reset egg counter on new image upload
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

let eggCounter = 0;
const maxEggs = 100;

function placeEgg() {
    if (eggCounter >= maxEggs) {
        alert('You have reached the maximum number of eggs, refresh the page and try again.');
        return;
    }
    const canvas = document.getElementById('image-canvas');
    const ctx = canvas.getContext('2d');
    const eggType = getEggType();
    const eggImg = new Image();
    
    // Adjust size to be proportional to the image
    const eggWidth = Math.min(canvas.width, canvas.height) * 0.1; // 10% of the image size
    const eggHeight = eggWidth * 1.5; // Maintain the aspect ratio

    switch (eggType) {
        case 'cracked':
            eggImg.src = 'cracked_egg.png'; // URL to the cracked egg image
            break;
        case 'green':
            eggImg.src = 'green_egg.png'; // URL to the green egg image
            break;
        case 'golden':
            eggImg.src = 'golden_egg.png'; // URL to the golden egg image
            break;
        case 'boiled':
            eggImg.src = 'boiled_egg.png'; // URL to the boiled egg image
            break;
        case 'universe':
            eggImg.src = 'universe_egg.png'; // URL to the universe egg image
            break;
        case 'pixel':
            eggImg.src = 'pixel_egg.png'; // URL to the pixel egg image
            break;
        default:
            eggImg.src = 'egg.png'; // URL to the normal egg image
            break;
    }

    eggImg.onload = function() {
        const x = 150 + Math.random() * (canvas.width - eggWidth - 300); // Avoid ad banners
        const y = Math.random() * (canvas.height - eggHeight);
        const rotation = Math.random() * 360 * (Math.PI / 180); // Random rotation in radians

        ctx.save();
        ctx.translate(x + eggWidth / 2, y + eggHeight / 2);
        ctx.rotate(rotation);
        ctx.drawImage(eggImg, -eggWidth / 2, -eggHeight / 2, eggWidth, eggHeight);
        ctx.restore();
        eggCounter++;
    };
}

function getEggType() {
    const randomNum = Math.random() * 1000000;
    if (randomNum < 1) {
        return 'pixel';
    } else if (randomNum < 100) {
        return 'universe';
    } else if (randomNum < 1100) {
        return 'golden';
    } else if (randomNum < 2100) {
        return 'green';
    } else if (randomNum < 4100) {
        return 'boiled';
    } else if (randomNum < 21000) {
        return 'cracked';
    } else {
        return 'normal';
    }
}

function downloadImage() {
    const canvas = document.getElementById('image-canvas');
    canvas.toBlob(function(blob) {
        const link = document.createElement('a');
        link.download = 'image_with_egg.png';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    }, 'image/png');
}
