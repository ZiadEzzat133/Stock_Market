# Markety

This project is a small-scale React application built using Vite for its blazing-fast performance, especially suitable for smaller projects. The app includes several pages and features, focusing on authentication, product management, and cart functionality. It also integrates state management, API requests, styling, and animations.

## Features

### Pages and Their Functionalities
1. **Sign In Page**  
   - Uses the login API of Fake Store API.  
   - Authenticates the user and stores the token in `localStorage`.  
   - Valid credentials example:
     - Username: `johnd`
     - Password: `m38rmF$`
   - Redirects to the Home page upon successful login.

2. **Sign Up Page**  
   - Allows users to register a new account.
   - Of course there is no backend to store the user data, so the registration is just a formality.  

3. **Home Page**  
   - Lists all products fetched from the Fake Store API.  
   - Provides sorting functionality:
     - Sort products by price in ascending or descending order. 
     - Filter products by category. 
   - Includes a component for each product:
     - Displays product details.
     - "Add to Cart" button with a badge showing the number of items in the cart.

4. **Create Product Page**  
   - Allows authenticated users to add new products to the store.  
   - Includes a form with validation using Formik and Yup.

5. **Detailed Product Page**  
   - Displays full details of a selected product.  
   - Shows similar products based on categories.

6. **Cart Page**  
   - Displays all products added to the cart.  
   - Includes a checkout feature showing Total Price and detailed prices of each item.  

### Authentication
- Protected routes like **My Cart** and **Create Product** require a valid user login.  
- Users must sign in with credentials from the Fake Store API to access authenticated pages and add items to the cart.

## Technologies Used

### Development
- **Vite**: Chosen for its fast build times, ideal for small projects.  

### State Management
- **Redux Toolkit (RTK)**: Used to manage application state effectively.  

### API Requests
- **Axios**: Simplifies HTTP requests and integrates seamlessly with RTK.  

### Styling
- **Tailwind CSS (v4)**: Provides a responsive and modern design with utility-first CSS.  

### Animations
- **Framer Motion**: Adds smooth animations for enhanced user experience.  

### Forms
- **Formik & Yup**: Ensures robust and persistent form handling with validation.  

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/ZiadEzzat133/Stock_Market.git
   npm install
   npm run dev
    ```

## Deployment
The app is deployed on Vercel. For client-side routing, a fallback to index.html is configured to handle all routes properly.

## Notes
- This project uses the Fake Store API for backend services.
- Authentication is mandatory for accessing certain pages, and token management is handled via localStorage.
- Example credentials:
- Username: johnd
- Password: m38rmF$

## Future Improvements
- Implement a backend server to store user data and products.
- Add a feature to edit and delete products.
- Strong Server-Side Validation.


