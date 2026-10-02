# Pathfinder Project Journal

## Project

**Pathfinder**

A career discovery platform for secondary school students aged 13–17.

## Goal

The goal is to help students take small steps toward exploring careers.

For this MVP, we focused on creating one simple task-based experience.

## Initial Plan

Pathfinder was planned as a larger career discovery platform with multiple possible features and experiences.

However, building everything at once would make the MVP too large.

## What We Chose

We chose one complete flow:

**Today's Task → Task Details → Task Complete**

The student can:

1. View a task
2. Open the task details
3. Start the task
4. Complete the task
5. See the completion state and XP

## Why We Chose This Flow

We wanted to test a simple idea:

> Can Pathfinder help a student take one small step toward their career?

The task flow turns career exploration into a small action rather than only providing information.

## Design Decisions

We kept the interface:

- Simple
- Clean
- Modern
- Youth-friendly
- Easy to understand

The design uses clear layouts, rounded elements and friendly colours.

We avoided unnecessary visual effects to keep the interface simple.

## Build

The MVP was built with:

- HTML
- CSS
- JavaScript

## What We Built

### Today's Task

Shows the student's current task, estimated time and XP.

### Task Details

Shows information about the task and allows the student to start it.

### Task Complete

Shows the completed state and the XP earned.

# Week 5 — Progress Tracking

## What We Continued

Week 5 continues the Pathfinder MVP from Week 4.

In Week 4, we built the core task flow:

**Today's Task → Task Details → Task Complete**

For Week 5, we extended this flow to help students understand their progress after completing tasks.

## What We Chose

We added a simple progress-tracking flow:

**Task Complete → My Progress → Completed Task Details**

The student can:

1. Complete a task
2. View their progress
3. See their completed tasks
4. Open a completed task
5. Return to their progress

## Why We Chose This Flow

After completing a task, the student needs a simple way to see what they have accomplished.

The goal was to move Pathfinder from simply helping students complete tasks to helping them see their journey.

## What We Built

### My Progress

The progress screen shows:

- Tasks completed
- XP earned
- Current streak
- Completed tasks

### Completed Task Details

The student can select a completed task and view its details.

A **Back to Progress** action allows them to return to their progress.

## What Changed

We extended the original Week 4 task flow rather than creating a separate feature.

The original flow was:

**Today's Task → Task Details → Task Complete**

It is now:

**Today's Task → Task Details → Task Complete → My Progress → Completed Task**

## What We Parked

We deliberately did not add:

- Career recommendations
- Quizzes
- Career matching
- Mentors
- Roadmaps
- Social features
- Complex analytics

The focus remained on building one small, functional improvement.

## Review and Testing

The main things to check are:

- Can the student complete a task?
- Can they navigate to My Progress?
- Is the completed task displayed correctly?
- Are XP and progress displayed correctly?
- Can the student open the completed task?
- Can they return to My Progress?
- Does the existing Week 4 flow still work?

## Challenges

The main challenge was deciding how much progress information the student actually needs.

We wanted to make progress visible without turning the MVP into a complicated dashboard.

## What I Learned

- A product can be expanded by extending an existing user journey.
- Progress should help users understand what they have accomplished.
- New features should support the core product loop rather than distract from it.
- Keeping the flow small makes it easier to build and test.

## Current Status

**MVP / Prototype**

The original three-screen task flow has been extended with a simple progress-tracking experience.

The next step is to test the combined flow and identify what should be improved next.

# Week 6 — Functional Learning & Exploration

## What We Continued

Week 6 continues the Pathfinder MVP from Week 5.

In Week 4 and Week 5, we designed the task experience and progress-tracking screens:

**Today's Task → Task Details → Task Complete → My Progress → Completed Task Details**

For Week 6, we focused on making these flows fully functional, interactive, and persistent, while adding career track exploration to the discovery experience.

## What We Chose

We implemented three functional flows:

1. **Task Completion & Progress Update**
   - Completing a task updates completion state.
   - XP is added to the user's total.
   - The current streak counter increments when a new task is completed.
   - Skills are added.
   - Relevant badges can be unlocked.
   - State persists using Web Storage.

2. **Completed Task Review**
   - Completed tasks can be opened from My Progress.
   - The user can review the original scenario, selected strategy, feedback, skills gained, and badge earned.
   - Completed task state and the user’s selected answer are persisted with Web Storage, while the task’s original content and feedback are reconstructed from the existing task dataset.

3. **Career Track Filtering**
   - Users can filter tasks by All Tracks, Tech & AI, Design & Gaming, Science & Climate, and Future Business.
   - The task grid updates based on the selected track.
   - Existing completion states are preserved.
   - Filtered tasks can still be opened in Task Details.

## Why We Chose This Flow

A static mockup shows what the screens look like, but students need real interactivity to evaluate their choices and see their growth.

Making task completion functional gives students immediate feedback on their decisions and rewards their effort with real XP, streaks, skills, and badges.

Providing a completed task review reinforces learning by allowing students to reflect on why a chosen strategy succeeded.

Adding career track filtering enables students to explore specific career areas of interest without complicating the clean dashboard layout.

## What We Built

### 1. Task Completion & Progress Update

- Real-time strategy selection with immediate feedback explaining why the answer is correct or incorrect.
- The completion button activates once the correct strategy is selected.
- Completing a task updates the completion state, adds XP to the user's total, increments the current streak counter when a new task is completed, adds acquired skills, and unlocks relevant career badges.
- All updated progress and completion records are saved to Web Storage (`localStorage`) so state persists across sessions.

### 2. Completed Task Review

- Completed tasks displayed in My Progress can be clicked to open the Completed Task Details screen.
- Shows the original task scenario, the user's selected strategy, constructive feedback, skills gained, and the earned badge.
- Completed task state and the user’s selected answer are persisted with Web Storage, while the task’s original content and feedback are reconstructed from the existing task dataset.
- Navigation provides clear return paths back to My Progress and Today's Tasks.

### 3. Career Track Filtering

- Filter chips for All Tracks, Tech & AI, Design & Gaming, Science & Climate, and Future Business.
- The task grid updates immediately when a track is selected.
- Active filter states are clearly highlighted.
- Existing task completion statuses are preserved across filters.
- Filtered tasks can be selected to open the standard Task Details view.
- Selecting All Tracks restores the full task list.

## What Changed

The application transitioned from static mock screens to an interactive, persistent learning experience.

The flow now supports full end-to-end exploration, completion, review, and filtering:

**Today's Tasks (Filtered / All) → Task Details → Strategy Selection & Completion → My Progress → Completed Task Details → Back to My Progress / Today's Tasks**

Data no longer resets on page reload; all XP, streak counts, completed tasks, acquired skills, and badges are preserved.

## What We Parked

We deliberately did not add:

- Complex user authentication or backend databases
- Multi-step branching simulations
- User-generated tasks or custom tracks
- Social leaderboards or friend feeds
- Automated quiz generators

The focus remained strictly on making the core learning, review, and exploration flows fully functional.

## Review and Testing

The main functional checks performed:

- Does selecting a strategy display clear feedback?
- Is task completion enabled only when the correct strategy is selected?
- Are XP, streak, skills, and badges accurately updated upon completion?
- Does progress state persist across browser refreshes?
- Can completed tasks be opened from My Progress with scenario, strategy, feedback, skills, and badge displayed?
- Do "Back to My Progress" and "Today's Tasks" navigation buttons work reliably?
- Does clicking a career track filter update the task grid immediately?
- Are completion badges and statuses retained on filtered tasks?
- Does selecting "All Tracks" restore all task cards?

## Challenges

- Managing and synchronizing interrelated state (XP, streak, completed task IDs, skills, badges, and completion history) using Web Storage without introducing heavy external dependencies.
- Ensuring the Completed Task Details screen accurately reconstructs the full task context (original scenario, user answer, feedback, badge) from stored data.
- Maintaining reactive career track filtering while preserving individual completion states and task clickability.

## What I Learned

- Implementing Web Storage persistence immediately makes the application feel like a real product rather than a static prototype.
- Immediate explanatory feedback turns multiple-choice selection into an active learning moment.
- Preserving completion state across filtering and navigation is essential for student trust and continuity.
- Building incrementally on top of established UI screens keeps the codebase focused and reliable.

## Current Status

**MVP / Functional Prototype**

The Pathfinder MVP now features fully functional learning, progress tracking, and career track exploration loops:

- Interactive task completion with validation and feedback
- Dynamic XP, streak, skill acquisition, and badge unlock updates
- Persistent user progress and task history via Web Storage
- Completed task review with scenario, strategy, feedback, and badges
- Career track filtering with preserved completion states

The next step is to test the interactive flows with secondary school students, collect qualitative feedback, and identify future enhancements.