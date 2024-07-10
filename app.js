import React, { useState } from 'react';
import { SignUpUser, SignInUser, getDashboardDetails, addWorkout } from './api/index'; // Adjust path as needed

const App = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleSignUp = async () => {
    try {
      const newUser = await SignUpUser(userData);
      console.log('Signed up user:', newUser);
      // Perform actions after successful signup
    } catch (error) {
      console.error('Error signing up user:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const user = await SignInUser(userData);
      console.log('Signed in user:', user);
      // Perform actions after successful sign-in
      if (user && user.token) {
        handleFetchDashboard(user.token);
      }
    } catch (error) {
      console.error('Error signing in user:', error);
    }
  };

  const handleFetchDashboard = async (token) => {
    try {
      const dashboardData = await getDashboardDetails(token);
      console.log('Dashboard details:', dashboardData);
      // Update state or perform actions with dashboard data
    } catch (error) {
      console.error('Error fetching dashboard details:', error);
    }
  };

  const handleAddWorkout = async (token, workoutData) => {
    try {
      const newWorkout = await addWorkout(token, workoutData);
      console.log('Added new workout:', newWorkout);
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  return (
    <div>
      <h1>Full Stack Developer</h1>
      
      <form>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          placeholder="Password"
        />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
      {/* Example button for adding workout (requires authentication) */}
      <button
        type="button"
        onClick={() => handleAddWorkout('token_here', { workoutData })}
      >
        Add Workout
      </button>
    </div>
  );
};

export default App;
