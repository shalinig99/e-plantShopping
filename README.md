# Paradise Nursery - E-PlantShopping Application

Welcome to **Paradise Nursery**, a dynamic, responsive e-commerce web application developed as part of a React application assignment. The project is hosted in the repository named **e-plantShopping**.

## Project Overview
The **e-plantShopping** application provides a vibrant, user-friendly shopping experience for plant enthusiasts. Users can browse a wide selection of houseplants categorized by features (such as Air Purifying and Aromatic), view essential details like thumbnails, descriptions, and costs, and seamlessly manage a global interactive shopping cart.

## Features
* **Landing Page:** An elegant welcome page introducing Paradise Nursery with a "Get Started" call-to-action button.
* **Product Listing:** Organizes at least six unique plants across three or more botanical categories. Each plant is presented on an individual card displaying its image, name, price, and description.
* **Global State Management:** Powered by Redux Toolkit (`CartSlice.jsx`), enabling synchronized interactions across components:
  * Adding items disables the corresponding "Add to Cart" button in real time.
  * Dynamically updating a global cart icon badge showing the absolute quantity of chosen plants.
* **Interactive Shopping Cart:** A dedicated cart layout (`CartItem.jsx`) allowing users to:
  * View precise subtotal item sums and the complete overall order amount.
  * Adjust quantities up or down (dynamically removing the entry if it falls to zero).
  * Seamlessly click to delete items or return via a "Continue Shopping" toggle.

## Architecture & Technology Stack
* **Frontend Library:** React (Functional Components & Custom Hooks)
* **State Management:** Redux Toolkit & React-Redux (`store.js`, `CartSlice.jsx`)
* **Styling:** Modular CSS grid layouts (`ProductList.css`, `CartItem.css`)
* **Build System:** Vite
* **Deployment Tool:** GitHub Pages (`gh-pages`)

---

