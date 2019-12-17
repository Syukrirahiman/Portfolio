### Backend Database Set Up
1. Move "Project" folder to your localhost WAMP/MAMP folder
2. Import "movie.sql" in phpMyAdmin
3. You can set up your MySql configuration in "include/configuration.php"

### API used
1. OMDB
2. Movie DB
3. International Showtimes
4. Model monkey
5. Google Maps

### Changing of API Keys
In movieapp directory...

1. In "src/SearchBar.js", line 23:
Change to your API Key of International Showtimes

2. In "src/Showtimes.js", line 21:
Change to your API Key of International Showtimes

3. In "src/Showtimes.js", line 21:
Change to your API Key of OMDB.

4. In "src/Showtimes.js", line 26:
Change to your API Key of International Showtimes

5. In "src/NowShowing.js", line 14:
Change to your API Key of International Showtimes

6. In "src/FormPlan.js", line 21:
Change to your API Key of International Showtimes

7. In "src/FormPlan.js", line 22:
Change to your API Key of OMDB

8. In "src/Maps.js", line 14:
Change to your API Key of Google Maps

9. In "src/Plan.js", line 31:
Change to your API Key of International Showtimes

10. In "src/RecommendMovies.js", line 13:
Change to your API Key of International Showtimes

11. In "src/RecommendMovies.js", line 14:
Change to your API Key of OMDB

12. In "src/Review.js", line 16:
Change to your API Key of International Showtimes

13. In "src/Review.js", line 17:
Change to your API Key of OMDB


In Project directory..
1. "review.php", line 10:
Change to your API Key of OMDB

2. "review.php", line 11:
Change to your API Key of The Movie DB

3. "review.php", line 12:
Change to your API Key of International Showtimes

4. "review.php", line 13:
Change to your API Key of Model Monkey


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the movieapp directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify









