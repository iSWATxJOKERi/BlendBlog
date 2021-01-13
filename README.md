# Onramp Fullstack Take Home Project

### Technical/Architectural:
- The architectual pattern that I decided to use was the MVC architectual pattern where I used a Model View and Controller to accomplish the requirements. I used the Model for defining methods such as finding by certain criteria that I needed, the View queried the database for properties I felt I would need for the frontend and rendered the results to the Controller which handled the frontend requests and relayed information to the Model or View and sent the results back to the frontend:
- Model:
  - <br/>
      <div><img src="/src/images/Model.PNG" alt="index"></div>
    <br/>
- View:
  - <br/>
      <div><img src="/src/images/View.PNG" alt="index"></div>
    <br/>
- Controller:
  - <br/>
      <div><img src="/src/images/Controller.PNG" alt="index"></div>
    <br/>
    
#### Frontend:
- TypeScript
#### Backend:
- PostgreSQL
- TypeScript
- Express and used Parcel to bundle the index.html to the frontend in order to run the script
#### Testing:
- Jest Unit Testing

### MVP's:
- Users can create an account and login automatically:
  - <br/>
      <div><img src="/src/images/signup.gif" alt="index"></div>
    <br/>
- Users can login and logout:
  - <br/>
      <div><img src="/src/images/loginlogout.gif" alt="index"></div>
    <br/>
- Users can create read update and delete blog posts:
  - <br/>
      <div><img src="/src/images/crud.gif" alt="index"></div>
    <br/>
- Users can favorite and search for blog posts by criteria such as date, title, username:
  - <br/>
      <div><img src="/src/images/amenities.gif" alt="index"></div>
    <br/>

#### Running the project:
- npm install
- then run npm build which compiles the typescript to javascript bundles into a new directory called /dist
- then enter npm run dev and head to localhost:5000