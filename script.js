function copyCA() {
    const caText = document.getElementById('ca-text').innerText;
    
    navigator.clipboard.writeText(caText).then(() => {
        const btn = document.getElementById('copy-btn');
        btn.innerText = "COPIED!";
        
        setTimeout(() => {
            btn.innerText = "COPY";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Leader Dropdown Functionality
const leaderHeader = document.getElementById('leaderDropdownHeader');
const leaderList = document.getElementById('leaderDropdownList');
const leaderItems = document.querySelectorAll('#leaderDropdownList .dropdown-item');
const generateBtn = document.getElementById('generateBtn');
const imageContainer = document.getElementById('imageContainer');
const leaderImage = document.getElementById('leaderImage');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');

let selectedLeaderImage = '';
let selectedLeaderName = '';

// Toggle dropdown
leaderHeader.addEventListener('click', () => {
    leaderList.classList.toggle('open');
});

// Select leader
leaderItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedText = item.textContent;
        leaderHeader.textContent = selectedText;
        leaderList.classList.remove('open');
        
        // Store selected leader image and name
        selectedLeaderImage = item.getAttribute('data-image');
        selectedLeaderName = selectedText;
        const selectedValue = item.getAttribute('data-value');
        console.log('Selected leader:', selectedValue, selectedText, 'Image:', selectedLeaderImage);
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.leader-dropdown')) {
        leaderList.classList.remove('open');
    }
});

// Generate button click
generateBtn.addEventListener('click', () => {
    if (selectedLeaderImage) {
        // Set the image source
        leaderImage.src = 'assets/' + selectedLeaderImage;
        
        // Hide placeholder and show image
        document.getElementById('imagePlaceholder').style.display = 'none';
        leaderImage.style.display = 'block';
        
        // Enable buttons
        downloadBtn.disabled = false;
        downloadBtn.classList.remove('disabled');
        shareBtn.disabled = false;
        shareBtn.classList.remove('disabled');
        
        // Scroll to image smoothly
        setTimeout(() => {
            imageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    } else {
        alert('Please select a leader first!');
    }
});

// Download button click
downloadBtn.addEventListener('click', () => {
    if (downloadBtn.disabled) return; // Prevent action if disabled
    
    if (leaderImage.src && selectedLeaderImage) {
        try {
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = leaderImage.src;
            link.download = selectedLeaderImage.replace('.jpg', '') + '-blessing.jpg';
            link.target = '_blank';
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show feedback
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'DOWNLOADED!';
            setTimeout(() => {
                downloadBtn.textContent = originalText;
            }, 2000);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    }
});

// Share on X (Twitter) button click
shareBtn.addEventListener('click', () => {
    if (shareBtn.disabled) return; // Prevent action if disabled
    
    // Your website URL - REPLACE THIS with your actual website URL
    const websiteUrl = 'https://bow-to-king-trump.vercel.app/';
    
    // Create the tweet text
    const tweetText = `My favorite leader just received the blessing 👑✨ $BowToking\n\n${websiteUrl}`;
    
    // Encode the tweet text for URL
    const encodedTweet = encodeURIComponent(tweetText);
    
    // Create Twitter share URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTweet}`;
    
    // Open Twitter in a new window
    window.open(twitterUrl, '_blank', 'width=550,height=420');
});


// Navigation Functionality
const navButtons = document.querySelectorAll('.nav-item');

navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (index === 0) {
            // Main button - scroll to first section
            document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
        } else if (index === 1) {
            // Generate button - scroll to second section
            document.getElementById('generate').scrollIntoView({ behavior: 'smooth' });
        } else if (index === 2) {
            // Future button - scroll to third section
            document.getElementById('end').scrollIntoView({ behavior: 'smooth' });
        }
    });
});