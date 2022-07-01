# Futureproof LAP2 Project - Habit Tracker

## Front End README

<hr/>

# App name - Habitually

<hr/>

<strong>Created by Tom, Edgar & Vlada<strong>

# Purpose and Functionality
1. The app helps users to develop and solidify new healthy habits
2. After registration, a user is taken to a form to create a habit
3. The user can choose 1 out of 6 habits
4. The user chooses a frequency to work on the habit (hourly, daily, weekly, or 3-times a day)
5. On submit, the user is taken to a dashboard where information about the habit is displayed
6. The user has to click on the “Add 1” button to complete the habit
7. The streak is seven days (ex. If the frequency is “daily” the user has to click on the “Add 1” button seven times to complete the habit)
8. Users can add other habits to the dashboard or remove the habit
9. Users can switch between the active & completed habits views

# Installation

* npm install
* npm install --save-dev jest-environment-jsdom

To run tests

* npm run test

# Changelog

* Created folder structure for FD
Index.html
* Added basic HTML structure
* Added nav bar & hamburger bar for mobile
* Added html structure for bootstrap modals - log in and register form
* Added footer with github links
Habit.html
* Added multi-step form to record a habit & frequency
Dashboard.html
* Added font awesome icons to display habits
* Added chart using chart.io to display user’s progress
* The dashboard pulls from a database the following information :
    * Number of streaks overall
    * Active streak
    * Number of completed streaks
    * Completion rate based on the frequency
* Added button to create a new habit
* Added a logout button
Auth.js
* Contains POST requests for the login and register forms
CreateHabit.js
* Contains functionality for the multi-step habit form & POST request to the server
Nav.js
* Contains functionality for the hamburger nav bar
Main.js
* Contains functionality to authenticate the user and log them into the dashboard. If the user is not logged in he goes back to the homepage.
* Contains functionality to add an icon to the dashboard based on the user’s choice of habit
* Contains functionality to render a chart
Dashboard.js
* Contains functionality to return habits’ titles and icons
* Contains get request to get user’s data by id
* Contains functionality to generate charts
* Contains functionality to switch between Active and Completed views
* Contains a logout function
* Contains functionality to generate habit stats based on habit id