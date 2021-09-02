import React from 'react';
import CreatePlanImg from '../../../img/createPlan.png';
import WorkoutFinderImg from '../../../img/findWorkout.png';
import UsePlanImg from '../../../img/usePlan.png';
import './CreateAccountModal.css';

const CreateAccountInfo = () => {
  return (
    <div>
      <h1 className='instructionsHeader'>
        What features come with my account?
      </h1>
      <div className='row'>
        <div className='col s12 xl6 accountFeatureDiv'>
          <img
            src={CreatePlanImg}
            alt='email-img'
            className='accountFeatureImg'
          />
          <h4 className='accountFeatureTitle'>Make A Plan!</h4>
          <p className='accountFeatureDescription'>
            Use the Workout Finder to put together your custom workout plans,
            complete with reps, sets, and rest times.
          </p>
        </div>
        <div className='col s12 xl6 accountFeatureDiv'>
          <img
            src={UsePlanImg}
            alt='social-media-img'
            className='accountFeatureImg'
          />
          <h4 className='accountFeatureTitle'>Guided Fitness</h4>
          <p className='accountFeatureDescription'>
            Utilize your personalized workout plans to run custom guided
            workouts, including rest timers and step-by-step instruction.
          </p>
        </div>
        <div className='col s12 xl6 offset-xl3 accountFeatureDiv'>
          <img
            className='accountFeatureImg'
            src={WorkoutFinderImg}
            alt='workout-finder-img'
          />
          <h4 className='accountFeatureTitle'>Workout Finder</h4>
          <p className='accountFeatureDescription'>
            Use the in-depth Workout Finder to search our extensive workout
            database. Explore muscles worked, video demonstrations, and helpful
            tips for each workout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountInfo;
