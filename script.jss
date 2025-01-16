// Replace 'USER_ID' with your actual Goodreads user ID
const rssFeedUrl = "https://www.goodreads.com/review/list_rss/162477302?shelf=read";

// Fetch the RSS feed from Goodreads
fetch(rssFeedUrl)
    .then(response => response.text()) // Convert the response to text (XML format)
    .then(data => {
        // Parse the RSS feed (XML format)
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        // Get all items (books) from the RSS feed
        const items = xmlDoc.getElementsByTagName("item");

        // Get the container where the books will be displayed
        const bookListContainer = document.getElementById('book-list');
        
        // Clear the container first to ensure no previous content is shown
        bookListContainer.innerHTML = '';

        // Loop through each book and create HTML elements to display it
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const title = item.getElementsByTagName("title")[0].textContent;
            const link = item.getElementsByTagName("link")[0].textContent;
            const imageUrl = item.getElementsByTagName("image_url")[0].textContent;

            // Create a new div element to represent the book
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <a href="${link}" target="_blank">
                    <img src="${imageUrl}" alt="${title}" />
                    <p>${title}</p>
                </a>
            `;

            // Append the new book item to the book list container
            bookListContainer.appendChild(bookItem);
        }
    })
    .catch(err => {
        console.error("Error fetching the RSS feed: ", err);
    });
