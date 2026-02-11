# Frontend Client

The main project documentation now lives in the [root-level README](../README.md). If you need the original Create React App reference material, it has been preserved in [`docs/CRA_REFERENCE.md`](../docs/CRA_REFERENCE.md).

## Lesson 9: Wiring the Contact Form to Express

Lesson 9 focuses on taking the front-end contact form and connecting it to the Express API that students build in the back-end lessons. The UI now contains TODO markers that walk through the work you will complete in this lesson.

### Step-by-step guide

1. **Collect the form data (Lesson 9 TODO – Step 1)**
   - Open `client/src/components/contactForm.jsx` and find the `Lesson 9 TODO` comment above the `useState` hook.
   - Review how the component stores `firstname`, `lastname`, `email`, and `subject` in state.
   - If you add additional form fields, remember to extend both the state shape and the JSX inputs so the data stays in sync.

2. **Prepare the Express endpoint (Lesson 9 TODO – Step 2)**
   - Stand up your Express server following the Lesson 9 instructions from the back-end curriculum.
   - Create a POST route (e.g., `/submit-form`) that accepts the payload you are collecting in the React component.
   - In the React app, create a `.env` file in the `client` directory and set `REACT_APP_API_BASE_URL` to the origin of your Express server (for example `http://localhost:3001`). Restart the dev server after changing environment variables.
   - The Axios `.post` call in `handleSubmit` uses this environment variable. Once your server route is ready, remove or adjust the TODO comment to reflect your implementation.

3. **Handle success and failure (Lesson 9 TODO – Step 3)**
   - Inside `handleSubmit`, notice the TODO reminders for success and error handling next to the `console.log` statements.
   - Replace these temporary logs with UI feedback, such as setting component state that displays a confirmation message or an error banner to the user.
   - Consider clearing the form on success so users can submit another message without refreshing the page.

### Testing your connection

- Use a REST client (such as Insomnia or Postman) or browser DevTools to monitor the network request when submitting the form.
- Verify the Express server receives the payload that matches your expected schema.
- Confirm the client handles both 2xx responses and error responses from the server.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
