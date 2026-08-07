import React from 'react';
import DashboardTour from './onboarding/DashboardTour';
import StoryIntro from './onboarding/StoryIntro';
import AgriMentorIntro from './onboarding/AgriMentorIntro';
import WelcomeModal from './onboarding/WelcomeModal';
import { SaveManager } from '../managers/SaveManager';

export default function GlobalOnboarding() {
  if (!SaveManager.getCurrentUsername()) return null;

  return (
    <>
      <WelcomeModal />
      <StoryIntro />
      <DashboardTour />
      <AgriMentorIntro />
    </>
  );
}
