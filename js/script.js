// Function to make elements editable text blocks to be edited in the browser
function makeEditable(className) {
    const elements = document.getElementsByClassName(className);

    for (let element of elements) {
        element.contentEditable = true;
        element.addEventListener("focus", function () {
            this.dataset.before = this.innerHTML;
        });
        element.addEventListener("blur", function () {
            if (this.innerHTML !== this.dataset.before) {
                console.log("Content changed:", this.innerHTML);
                // Here you can add code to save the changes, e.g., send to server
            }
        });
    }
}
document.addEventListener("DOMContentLoaded", () => makeEditable("editText"));

// IMG Header
//ADD IMG
document.getElementById('uploadBtn').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('headerImage').src = e.target.result; // Make sure the ID matches
        };
        reader.readAsDataURL(file);
    }
});

// Show input for adding image URL
document.getElementById('showLinkInputBtn').addEventListener('click', function () {
    document.getElementById('linkInput').style.display = 'block'; // Show the input field
    document.getElementById('addLinkBtn').style.display = 'block'; // Show the button
});

// ADD Link Image
document.getElementById('addLinkBtn').addEventListener('click', function () {
    const imageUrl = document.getElementById('linkInput').value;
    if (imageUrl) {
        document.getElementById('headerImage').src = imageUrl; // Set the src of the header image to the entered URL
        document.getElementById('linkInput').value = ''; // Clear the input after adding the image
    } else {
        alert("Please enter a valid image URL."); // Optional: Alert if the input is empty
    }
});

///////////    Team Section    /////////////
document.addEventListener("DOMContentLoaded", () => {
    makeEditable("editText");
    setupImageHandlers();
    setupSocialLinkHandlers();
    setupAddNewCard();
});

// Function to make elements editable
function makeEditable(className) {
    const elements = document.getElementsByClassName(className);

    Array.from(elements).forEach(element => {
        element.contentEditable = true;
        element.addEventListener("focus", function () {
            this.dataset.before = this.innerHTML;
        });
        element.addEventListener("blur", function () {
            if (this.innerHTML !== this.dataset.before) {
                console.log("Content changed:", this.innerHTML);
                // Add code to save changes if needed
            }
        });
    });
}

// Function to set up image upload and link handlers for all cards
function setupImageHandlers() {
    const teamCards = document.querySelectorAll(".team-card");

    teamCards.forEach(card => {
        const uploadBtn = card.querySelector(".uploadBtn");
        const fileInput = card.querySelector(".fileInput");
        const showLinkInputBtn = card.querySelector(".showLinkInputBtn");
        const linkInput = card.querySelector(".linkInput");
        const addLinkBtn = card.querySelector(".addLinkBtn");
        const headerImage = card.querySelector(".headerImage");

        // ADD Image via Upload
        if (uploadBtn && fileInput && headerImage) {
            uploadBtn.addEventListener('click', function (e) {
                e.preventDefault();
                fileInput.click();
            });

            fileInput.addEventListener('change', function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        headerImage.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // ADD Image via Link
        if (showLinkInputBtn && linkInput && addLinkBtn && headerImage) {
            showLinkInputBtn.addEventListener('click', function (e) {
                e.preventDefault();
                linkInput.style.display = 'block';
                addLinkBtn.style.display = 'block';
            });

            addLinkBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const imageUrl = linkInput.value.trim();
                if (imageUrl) {
                    headerImage.src = imageUrl;
                    linkInput.value = '';
                    linkInput.style.display = 'none';
                    addLinkBtn.style.display = 'none';
                } else {
                    alert("Please enter a valid image URL.");
                }
            });
        }
    });
}

// Function to set up social link modals for all cards
function setupSocialLinkHandlers() {
    const teamCards = document.querySelectorAll(".team-card");

    teamCards.forEach(card => {
        const socialLinks = card.querySelectorAll(".socialLink");
        const editModal = card.querySelector(".editModal");
        const linkTypeSpan = card.querySelector(".linkType");
        const socialInput = card.querySelector(".socialInput");
        const saveLinkBtn = card.querySelector(".saveLinkBtn");
        let currentSocialLink = null;

        // Initialize Bootstrap modal
        const modal = new bootstrap.Modal(editModal, {});

        socialLinks.forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                currentSocialLink = link;
                const linkType = link.getAttribute("data-type");
                linkTypeSpan.textContent = linkType;

                // Set current value in input
                socialInput.value = link.getAttribute("href") || '';

                modal.show();
            });
        });

        // Save Link Button Handler
        if (saveLinkBtn && socialInput) {
            saveLinkBtn.addEventListener("click", function () {
                const newLink = socialInput.value.trim();
                if (newLink) {
                    currentSocialLink.setAttribute("href", newLink);
                    modal.hide();
                } else {
                    alert("Please enter a valid URL.");
                }
            });
        }
    });
}

// Function to set up the Add New Card functionality
function setupAddNewCard() {
    const addNewCardDiv = document.getElementById("addNewCard");
    const teamCardsContainer = document.getElementById("teamCardsContainer");

    addNewCardDiv.addEventListener("click", function () {
        const newCard = createNewCard();
        teamCardsContainer.insertBefore(newCard, addNewCardDiv); // Insert before the addNewCardDiv
    });
}

// Function to create a new team member card
function createNewCard() {
    // Clone the first team-card as a template
    const templateCard = document.querySelector(".team-card");
    const newCard = templateCard.cloneNode(true);

    // Clear existing content
    newCard.querySelector(".headerImage").src = "https://media.istockphoto.com/id/1435220822/photo/african-american-software-developer.jpg?s=612x612&w=0&k=20&c=JESGRQ2xqRH9ZcJzvZBHZIZKVY8MDejBSOfxeM-i5e4=";
    newCard.querySelector(".card-title").textContent = "New Team Member";
    newCard.querySelectorAll(".card-text").forEach(p => p.textContent = "Description of the new team member.");

    // Reset social links
    newCard.querySelectorAll(".socialLink").forEach(link => {
        link.setAttribute("href", "#");
    });

    // Hide link input fields and buttons
    newCard.querySelectorAll(".linkInput").forEach(input => input.style.display = 'none');
    newCard.querySelectorAll(".addLinkBtn").forEach(btn => btn.style.display = 'none');

    // Set up editable text
    const editableTexts = newCard.querySelectorAll(".editText");
    editableTexts.forEach(text => {
        text.contentEditable = true;
        text.addEventListener("focus", function () {
            this.dataset.before = this.innerHTML;
        });
        text.addEventListener("blur", function () {
            if (this.innerHTML !== this.dataset.before) {
                console.log("Content changed:", this.innerHTML);
                // Add code to save changes if needed
            }
        });
    });

    // Set up image handlers for the new card
    const uploadBtn = newCard.querySelector(".uploadBtn");
    const fileInput = newCard.querySelector(".fileInput");
    const showLinkInputBtn = newCard.querySelector(".showLinkInputBtn");
    const linkInput = newCard.querySelector(".linkInput");
    const addLinkBtn = newCard.querySelector(".addLinkBtn");
    const headerImage = newCard.querySelector(".headerImage");

    // ADD Image via Upload
    if (uploadBtn && fileInput && headerImage) {
        uploadBtn.addEventListener('click', function (e) {
            e.preventDefault();
            fileInput.click();
        });

        fileInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    headerImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // ADD Image via Link
    if (showLinkInputBtn && linkInput && addLinkBtn && headerImage) {
        showLinkInputBtn.addEventListener('click', function (e) {
            e.preventDefault();
            linkInput.style.display = 'block';
            addLinkBtn.style.display = 'block';
        });

        addLinkBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const imageUrl = linkInput.value.trim();
            if (imageUrl) {
                headerImage.src = imageUrl;
                linkInput.value = '';
                linkInput.style.display = 'none';
                addLinkBtn.style.display = 'none';
            } else {
                alert("Please enter a valid image URL.");
            }
        });
    }

    // Set up social link modals for the new card
    const socialLinks = newCard.querySelectorAll(".socialLink");
    const editModal = newCard.querySelector(".editModal");
    const linkTypeSpan = newCard.querySelector(".linkType");
    const socialInput = newCard.querySelector(".socialInput");
    const saveLinkBtn = newCard.querySelector(".saveLinkBtn");
    let currentSocialLink = null;

    // Initialize Bootstrap modal
    const modal = new bootstrap.Modal(editModal, {});

    socialLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            currentSocialLink = link;
            const linkType = link.getAttribute("data-type");
            linkTypeSpan.textContent = linkType;

            // Set current value in input
            socialInput.value = link.getAttribute("href") || '';

            modal.show();
        });
    });

    // Save Link Button Handler
    if (saveLinkBtn && socialInput) {
        saveLinkBtn.addEventListener("click", function () {
            const newLink = socialInput.value.trim();
            if (newLink) {
                currentSocialLink.setAttribute("href", newLink);
                modal.hide();
            } else {
                alert("Please enter a valid URL.");
            }
        });
    }

    return newCard;
}
