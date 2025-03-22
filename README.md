🛍️ Fake Products App
A web application built with Angular 17.3.6 that fetches product data from MockAPI and stores it locally in the browser using IndexedDB . This ensures smooth offline functionality and faster performance by reducing API calls while maintaining synchronization with the remote server.

🚀 Features
📦 API Integration: Fetches products from MockAPI and syncs updates with IndexedDB.
📄 Pagination: Implemented with material-paginator for efficient navigation of large datasets.
🔍 Real-time Search: Instant filtering of products based on user input.
🗑️ Delete Products: Remove products both locally (IndexedDB) and remotely (MockAPI).
✏️ Update Products: Edit product details, syncing changes to both MockAPI and IndexedDB.
🔎 View Details: Displays detailed information about each product.
🎨 Optimized UI: Built with Angular Material for a clean and responsive design.
💾 Offline Support: Uses IndexedDB to store data locally, ensuring app usability even without an internet connection.
🌟 How It Works
API Integration with MockAPI
The app fetches product data from MockAPI during the initial load. The data is then stored in the browser's IndexedDB , which acts as a local database. Subsequent interactions (pagination, search, delete, update) are handled locally using IndexedDB to improve performance and reduce unnecessary API calls.

Fetching Data: When the app starts, it retrieves product data from the MockAPI endpoint:

https://67da8a8535c87309f52cfb73.mockapi.io/api/products
Storing Locally: The fetched data is saved in IndexedDB, allowing the app to function seamlessly even when offline.
Synchronization: Any updates (e.g., deleting or editing a product) are sent to MockAPI and reflected in IndexedDB to ensure consistency.
IndexedDB Workflow
Initial Load: Data is fetched from MockAPI and stored in IndexedDB.
Local Operations: Pagination, search, and filtering are performed on the local IndexedDB data.
Syncing Changes: When a user deletes or updates a product, the app sends the request to MockAPI and updates the local IndexedDB accordingly.
🛠️ Installation & Usage
Prerequisites
🟢 Node.js >= 18.x.x (recommended)
🅰️ Angular CLI installed globally (npm install -g @angular/cli)
🌐 Internet connection (for initial data fetching from MockAPI)
Setup Steps
Clone the repository:

git clone https://github.com/Devildcd/fake-productsApp.git
cd fake-productsApp
Install dependencies:

npm install
Start the application:

ng serve
Open the app in your browser:

http://localhost:4200
🧩 API Endpoints
This project uses MockAPI for product data management. Below are the key endpoints:

GET /products : Fetches paginated products.
PUT /products/:id : Updates a specific product.
DELETE /products/:id : Deletes a specific product.
Example API base URL:

https://67da8a8535c87309f52cfb73.mockapi.io/api/products

Other Endpoints:
https://mockapi.io/clone/67da8a8535c87309f52cfb74
https://mockapi.io/projects/67da8a8535c87309f52cfb74

🧪 Testing
Unit Tests
Run unit tests using Karma:

ng test
End-to-End Tests
To run end-to-end tests, first add a testing framework (e.g., Protractor or Cypress):

ng add @angular/protractor
ng e2e
🔄 Synchronization Logic
Fetch Data: On app load, the ProductsService fetches data from MockAPI and stores it in IndexedDB.
Local Operations: All CRUD operations (Create, Read, Update, Delete) are performed on IndexedDB.
Sync Changes: After a successful API call (e.g., updating or deleting a product), the local IndexedDB is updated to reflect the changes.

Why Use IndexedDB?
IndexedDB is a powerful low-level API for storing significant amounts of structured data in the browser. It allows the app to:

Work offline.
Reduce latency by avoiding repeated API calls.
Provide a seamless user experience even with slow or intermittent internet connections.