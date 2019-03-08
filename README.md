## Weather App REMIX

Weather App Remix is deployed on Github Pages [here](https://cilavery.github.io/weather-remix/)


### RUN LOCALLY
---
Clone the repo, and open **index.html** file in your browser

### TESTING
---
To run tests, after cloning repo go to directory **jasmine** and open **SpecRunner.html** in your browser

### THOUGHT PROCESS 
---
I wanted to use the opportunity of re-writing the weather app to implement a better UX than my previous app and incorporate new knowledge that I learned during my training experience at Buildit. 

As such I built this app using vanilla Javascript. I wanted to gain experience in working directly with the DOM and to not rely on frameworks in building an app. I also built my previous weather app in React so I wanted this next experience to be a somewhat different challenge. 

Although this weather app generally looks similar to my first version, other things that changed other than writing it in vanilla javascript was adding a loading animation while the data is being fetched and handling errors if the user inputs a wrong zipcode. From this perspective the app has a much better UX than the previous version because the user is given more clues to the state of the application. I also added input validation to the zipode to improve security.

When writing the code I was much more conscious of writing small functions with better variable names and keeping in mind reuseability of code. I also made use of object destructing and using ternary operators heavily - something I enjoyed learning and using during Buildit training.


### TRADEOFFS
---
As much as I wanted this project to be all DIY, I decided to incorporate Bootstrap for layout and styling in addition to custom CSS. I wanted to focus more on the handling of the DOM and so adding Bootstrap made it somewhat easier to abstract out the thinking for layout. 

### WHAT I'D LIKE TO IMPLEMENT WITH MORE TIME
---
With more time I would love to add better tests where I mock the fetch request. I would also like to add more CSS transitions to add movement to the site. 

