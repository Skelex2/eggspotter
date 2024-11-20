document.getElementById('image-upload').addEventListener('change', function() {
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
                eggPositions = []; // Reset positions
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

let eggCounter = 0;
const maxEggs = 20;
let eggPositions = []; // Store the positions of eggs

function placeEgg() {
    if (eggCounter >= maxEggs) {
        alert('You have reached the maximum number of eggs.');
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
        let x, y, overlapping, maxAttempts = 100, attempts = 0;

        do {
            x = 150 + Math.random() * (canvas.width - eggWidth - 300); // Avoid ad banners
            y = Math.random() * (canvas.height - eggHeight);
            overlapping = eggPositions.some(pos => 
                x < pos.x + pos.width && x + eggWidth > pos.x &&
                y < pos.y + pos.height && y + eggHeight > pos.y
            );
            attempts++;
        } while (overlapping && attempts < maxAttempts);

        if (attempts >= maxAttempts) {
            // Allow overlapping if all attempts fail
            x = 150 + Math.random() * (canvas.width - eggWidth - 300);
            y = Math.random() * (canvas.height - eggHeight);
        }

        const rotation = Math.random() * 360 * (Math.PI / 180); // Random rotation in radians

        ctx.save();
        ctx.translate(x + eggWidth / 2, y + eggHeight / 2);
        ctx.rotate(rotation);
        ctx.drawImage(eggImg, -eggWidth / 2, -eggHeight / 2, eggWidth, eggHeight);
        ctx.restore();
        
        // Store the egg's position
        eggPositions.push({ x, y, width: eggWidth, height: eggHeight });

        eggCounter++;
    };
}

function getEggType() {
    const randomNum = Math.random() * 1000000; // Using a range of 0 to 999999 for precision
    if (randomNum < 1) {
        return 'pixel'; // 0.0001%
    } else if (randomNum < 100) {
        return 'universe'; // 0.0099%
    } else if (randomNum < 1100) {
        return 'golden'; // 0.1%
    } else if (randomNum < 2100) {
        return 'green'; // 0.1%
    } else if (randomNum < 4100) {
        return 'boiled'; // 0.2%
    } else if (randomNum < 51000) {
        return 'cracked'; // 5%
    } else {
        return 'normal'; // Remaining 94.6899%
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
