document.addEventListener("DOMContentLoaded", function() {
    // Cache DOM element reference
    const footerContainer = document.getElementById("footer-container");
    
    if (!footerContainer) {
        console.error("Footer container element not found");
        return;
    }

    // Add loading state
    footerContainer.innerHTML = '<div class="footer-loading">Loading footer...</div>';
    
    // Fetch footer with timeout
    const fetchPromise = fetch("footer.html");
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request timeout")), 5000)
    );

    Promise.race([fetchPromise, timeoutPromise])
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Parse and sanitize HTML if needed
            footerContainer.innerHTML = html;
            
            // Dispatch custom event when footer loads
            document.dispatchEvent(new CustomEvent('footerLoaded', {
                detail: { timestamp: new Date() }
            }));
        })
        .catch(error => {
            console.error("Error loading footer:", error);
            footerContainer.innerHTML = `
                <div class="footer-error">
                    Failed to load footer. 
                    <a href="footer.html" onclick="location.reload()">Try again</a>
                </div>
            `;
            
            // Fallback to default footer if available
            if (window.defaultFooterHTML) {
                setTimeout(() => {
                    footerContainer.innerHTML = window.defaultFooterHTML;
                }, 2000);
            }
        });
});

// Usage example elsewhere in your code:
document.addEventListener('footerLoaded', (e) => {
    console.log('Footer loaded at:', e.detail.timestamp);
    // Initialize any footer-specific scripts here
});