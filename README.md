# 🛍️ Fake Products App

A web application built with **Angular 17.3.6** that fetches products from [mockapi.io](https://mockapi.io/).  
It allows users to view paginated products, filter, search in real-time, view product details, and delete items.

## 🚀 Features
- 📦 **API Integration:** Fetches products from `mockapi.io`.
- 📄 **Pagination:** Implemented with `material-paginator`.
- 🔍 **Real-time search:** Instant filtering.
- 🗑️ **Delete products:** Remove products from the list.
- 🔎 **View details:** Displays detailed product information.
- 🎨 **Optimized UI:** Built with Angular Material.

⚡ Installation & Usage
🔧 Prerequisites
🟢 Node.js >= 18.x.x (recommended)
🅰️ Angular CLI installed globally
▶️ Setup Steps
Clone the repository:

git clone https://github.com/Devildcd/fake-productsApp.git
cd fake-productsApp
Install dependencies:

npm install
Start the application:

ng serve
Open in browser: http://localhost:4200
🔗 API Integration with MockAPI
This project uses mockapi.io for product data management.
Example API endpoint:

https://mockapi.io/clone/67da8a8535c87309f52cfb74
https://mockapi.io/projects/67da8a8535c87309f52cfb74
https://67da8a8535c87309f52cfb73.mockapi.io/api/products
📌 Implemented HTTP Methods:

GET /products → Fetch paginated products.
PUT /products/:id.
DELETE /products/:id → Delete a product.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



