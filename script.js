// Load content from localStorage when the page loads
window.onload = function() {
    loadSavedContent();
};

// Function to display the add tool form
function showAddTool() {
    document.getElementById('add-tool-form').classList.remove('hidden');
    document.getElementById('add-text-form').classList.add('hidden');
    document.getElementById('add-file-form').classList.add('hidden');
    document.getElementById('add-website-form').classList.add('hidden');
}

// Function to display the add text form
function showAddText() {
    document.getElementById('add-text-form').classList.remove('hidden');
    document.getElementById('add-tool-form').classList.add('hidden');
    document.getElementById('add-file-form').classList.add('hidden');
    document.getElementById('add-website-form').classList.add('hidden');
}

// Function to display the add file form
function showAddFile() {
    document.getElementById('add-file-form').classList.remove('hidden');
    document.getElementById('add-tool-form').classList.add('hidden');
    document.getElementById('add-text-form').classList.add('hidden');
    document.getElementById('add-website-form').classList.add('hidden');
}

// Function to display the add website form
function showAddWebsite() {
    document.getElementById('add-website-form').classList.remove('hidden');
    document.getElementById('add-tool-form').classList.add('hidden');
    document.getElementById('add-text-form').classList.add('hidden');
    document.getElementById('add-file-form').classList.add('hidden');
}

// Function to add a tool to the list and save it to localStorage
function addTool() {
    const toolName = document.getElementById('tool-name').value;
    const toolLink = document.getElementById('tool-link').value;

    if (toolName && toolLink) {
        const toolsList = document.getElementById('tools-list');
        const newTool = document.createElement('div');
        newTool.classList.add('content-item');
        newTool.innerHTML = `
            <h4>${toolName}</h4>
            <a href="${toolLink}" target="_blank">Visit Tool</a>
            <button class="edit-btn" onclick="editTool(this)">Edit</button>
            <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
        `;
        toolsList.appendChild(newTool);

        // Save tool to localStorage
        saveTool(toolName, toolLink);

        // Clear input fields
        document.getElementById('tool-name').value = '';
        document.getElementById('tool-link').value = '';
    }
}

// Function to add text to the list and save it to localStorage
function addText() {
    const textContent = document.getElementById('text-content').value;

    if (textContent) {
        const textList = document.getElementById('text-list');
        const newText = document.createElement('div');
        newText.classList.add('content-item');
        newText.innerHTML = `
            <p>${textContent}</p>
            <button class="edit-btn" onclick="editText(this)">Edit</button>
            <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
        `;
        textList.appendChild(newText);

        // Save text to localStorage
        saveText(textContent);

        // Clear input field
        document.getElementById('text-content').value = '';
    }
}

// Function to add a file to the list and save it to localStorage
function addFile() {
    const fileInput = document.getElementById('file-input').files[0];

    if (fileInput) {
        const fileList = document.getElementById('file-list');
        const newFile = document.createElement('div');
        newFile.classList.add('content-item');
        newFile.innerHTML = `
            <p>File: ${fileInput.name}</p>
            <button class="edit-btn" onclick="editFile(this)">Edit</button>
            <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
        `;
        fileList.appendChild(newFile);

        // Save file to localStorage
        saveFile(fileInput.name);

        // Clear file input field
        document.getElementById('file-input').value = '';
    }
}

// Function to add a website link with its logo and save it to localStorage
function addWebsite() {
    const websiteLink = document.getElementById('website-link').value;

    if (websiteLink) {
        const websiteList = document.getElementById('website-list');
        const newWebsite = document.createElement('div');
        newWebsite.classList.add('content-item');
        const logo = `<img src="https://www.google.com/s2/favicons?domain=${websiteLink}" alt="Logo">`;
        newWebsite.innerHTML = `
            <p>${logo} <a href="${websiteLink}" target="_blank">Visit Website</a></p>
            <button class="edit-btn" onclick="editWebsite(this)">Edit</button>
            <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
        `;
        websiteList.appendChild(newWebsite);

        // Save website to localStorage
        saveWebsite(websiteLink);

        // Clear input field
        document.getElementById('website-link').value = '';
    }
}

// Function to edit a tool
function editTool(button) {
    const contentItem = button.closest('.content-item');
    const newToolName = prompt("Edit Tool Name", contentItem.querySelector('h4').textContent);
    const newToolLink = prompt("Edit Tool Link", contentItem.querySelector('a').href);

    if (newToolName && newToolLink) {
        contentItem.querySelector('h4').textContent = newToolName;
        contentItem.querySelector('a').href = newToolLink;
        contentItem.querySelector('a').textContent = "Visit Tool";

        // Update tool in localStorage
        updateTool(contentItem, newToolName, newToolLink);
    }
}

// Function to edit text
function editText(button) {
    const contentItem = button.closest('.content-item');
    const newText = prompt("Edit Text", contentItem.querySelector('p').textContent);

    if (newText) {
        contentItem.querySelector('p').textContent = newText;

        // Update text in localStorage
        updateText(contentItem, newText);
    }
}

// Function to edit a file
function editFile(button) {
    const contentItem = button.closest('.content-item');
    alert("Editing files is not supported directly. You may need to upload a new file.");
}

// Function to edit a website
function editWebsite(button) {
    const contentItem = button.closest('.content-item');
    const newWebsiteLink = prompt("Edit Website Link", contentItem.querySelector('a').href);

    if (newWebsiteLink) {
        contentItem.querySelector('a').href = newWebsiteLink;
        contentItem.querySelector('a').textContent = "Visit Website";
        contentItem.querySelector('img').src = `https://www.google.com/s2/favicons?domain=${newWebsiteLink}`;

        // Update website in localStorage
        updateWebsite(contentItem, newWebsiteLink);
    }
}

// Function to delete a content item
function deleteItem(button) {
    const contentItem = button.closest('.content-item');
    contentItem.remove();

    // Remove content from localStorage
    removeContentFromLocalStorage(contentItem);
}

// Function to search content
function searchContent() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Save tools to localStorage
function saveTool(toolName, toolLink) {
    const tools = JSON.parse(localStorage.getItem('tools')) || [];
    tools.push({ name: toolName, link: toolLink });
    localStorage.setItem('tools', JSON.stringify(tools));
}

// Save text to localStorage
function saveText(textContent) {
    const texts = JSON.parse(localStorage.getItem('texts')) || [];
    texts.push(textContent);
    localStorage.setItem('texts', JSON.stringify(texts));
}

// Save file to localStorage
function saveFile(fileName) {
    const files = JSON.parse(localStorage.getItem('files')) || [];
    files.push(fileName);
    localStorage.setItem('files', JSON.stringify(files));
}

// Save websites to localStorage
function saveWebsite(websiteLink) {
    const websites = JSON.parse(localStorage.getItem('websites')) || [];
    websites.push(websiteLink);
    localStorage.setItem('websites', JSON.stringify(websites));
}

// Load saved content from localStorage
function loadSavedContent() {
    const tools = JSON.parse(localStorage.getItem('tools')) || [];
    const texts = JSON.parse(localStorage.getItem('texts')) || [];
    const files = JSON.parse(localStorage.getItem('files')) || [];
    const websites = JSON.parse(localStorage.getItem('websites')) || [];

    tools.forEach(tool => {
        addToolToList(tool.name, tool.link);
    });

    texts.forEach(text => {
        addTextToList(text);
    });

    files.forEach(file => {
        addFileToList(file);
    });

    websites.forEach(website => {
        addWebsiteToList(website);
    });
}

// Helper functions to add content from localStorage
function addToolToList(name, link) {
    const toolsList = document.getElementById('tools-list');
    const newTool = document.createElement('div');
    newTool.classList.add('content-item');
    newTool.innerHTML = `
        <h4>${name}</h4>
        <a href="${link}" target="_blank">Visit Tool</a>
        <button class="edit-btn" onclick="editTool(this)">Edit</button>
        <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
    `;
    toolsList.appendChild(newTool);
}

function addTextToList(content) {
    const textList = document.getElementById('text-list');
    const newText = document.createElement('div');
    newText.classList.add('content-item');
    newText.innerHTML = `
        <p>${content}</p>
        <button class="edit-btn" onclick="editText(this)">Edit</button>
        <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
    `;
    textList.appendChild(newText);
}

function addFileToList(fileName) {
    const fileList = document.getElementById('file-list');
    const newFile = document.createElement('div');
    newFile.classList.add('content-item');
    newFile.innerHTML = `
        <p>File: ${fileName}</p>
        <button class="edit-btn" onclick="editFile(this)">Edit</button>
        <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
    `;
    fileList.appendChild(newFile);
}

function addWebsiteToList(websiteLink) {
    const websiteList = document.getElementById('website-list');
    const newWebsite = document.createElement('div');
    newWebsite.classList.add('content-item');
    const logo = `<img src="https://www.google.com/s2/favicons?domain=${websiteLink}" alt="Logo">`;
    newWebsite.innerHTML = `
        <p>${logo} <a href="${websiteLink}" target="_blank">Visit Website</a></p>
        <button class="edit-btn" onclick="editWebsite(this)">Edit</button>
        <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
    `;
    websiteList.appendChild(newWebsite);
}

// Remove content from localStorage when deleted
function removeContentFromLocalStorage(contentItem) {
    const contentType = contentItem.querySelector('a') ? 'tools' : contentItem.querySelector('p') ? 'texts' : 'websites';
    const contentData = JSON.parse(localStorage.getItem(contentType)) || [];
    
    const updatedContent = contentData.filter(item => item.name !== contentItem.querySelector('h4')?.textContent && item.link !== contentItem.querySelector('a')?.href);
    localStorage.setItem(contentType, JSON.stringify(updatedContent));
}
