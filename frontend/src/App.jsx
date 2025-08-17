import MyExercises from './pages/MyExercises';
import MyRoutines from './pages/MyRoutines';
import { Link, NavLink } from 'react-router-dom'

import Navbar from './components/Navbar';


function App() {

  return (
    <>
      <Navbar />
      <main className='getting-started'>
        {/* Full-width: Welcome */}
        <section className="full-width">
          <h1>Getting Started</h1><br/>
          <h3>👋 Welcome to your personal workout routine builder!</h3>
          <p>This app makes it easy to create and organize the exercises you want to do, then group them into routines you can follow later. Whether you’re new to working out or just looking for a simple way to track your training, you’ll be up and running in just a couple of steps.</p>
        </section>

        {/* Full-width: Overview */}
        <section className="full-width">
          <h3>How It Works (overview):</h3>
          <p>The app is built around two things:</p>
          <ol>
            <li><strong>Exercises</strong> – the individual movements you want to track (like Squats, Bench Press, or Plank).</li>
            <li><strong>Routines</strong> – collections of exercises grouped together into a workout.</li>
          </ol>
        </section>

        {/* Split Layout: Steps + GIF */}
        {/* Step 1 row */}
        <section className="two-column">
          <div className="step-text">
            <h2>Step 1: Add Exercises</h2>
            <ul>
              <li>Go to the “Exercises” page and add a few moves you’d like to include.</li>
              <li>For each exercise, you can enter: <strong>Title, Sets, Reps, and Load (weight in lbs)</strong>.</li>
              <li>You’ll see a couple of sample exercises already loaded — feel free to use them, or delete them and start fresh.</li>
            </ul>
          </div>

          <aside className="gif-column">
            <img src="/Adding_Exercise.mov.gif" alt="Adding Exercise" className='tutorial-gif' />
          </aside>
        </section>

        {/* Step 2 row */}
        <section className="two-column">
          <div className="step-text">
            <h2>Step 2: Build a Routine</h2>
            <ul>
              <li>Once you’ve got some exercises, head over to “Routines.”</li>
              <li>Give your routine a name (e.g., “Push Day” or “Full Body Quick Workout”).</li>
              <li>Select from the exercises you’ve added to build your custom routine:
                <ul>
                  <li>To select a <strong>group of exercises in a row</strong>, click the first, then hold <strong>Shift</strong> and click the last.</li>
                  <li>To select <strong>multiple exercises that aren’t next to each other</strong>, hold <strong>Command (Mac)</strong> or <strong>Ctrl (Windows)</strong> while clicking each one.</li>
                  <li>You can also use <strong>Command/Ctrl + Click</strong> again to de-select an exercise.</li>
                </ul>
              </li>
              <li>When you’re happy with your selections, save the routine — and you’re done!</li>
            </ul>
          </div>

          <aside className="gif-column">
            <img 
              src="/Creating_Routine.mov.gif" 
              alt="Creating Routine Tutorial" 
              className="tutorial-gif"
            />
          </aside>
        </section>
          
        {/* Full-width: Notes */}
        <section className="full-width">
          <h3>Notes & Tips:</h3>
          <ul>
            <li>Right now, routines and exercises can be <strong>created or deleted</strong>, but not edited (yet). Updates are on the way!</li>
            <li>You’ll always need to be logged in to add or save exercises and routines.</li>
            <li>The sample data is just there to give you an idea — don’t be shy about clearing it out and making this space your own.</li>
          </ul>
        </section>
      </main>
    </>
  )
}

export default App
