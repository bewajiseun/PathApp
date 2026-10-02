# Pathfinder

Pathfinder is a career discovery platform for secondary school students aged 13–17.

It helps students take small steps toward exploring careers through simple learning tasks.

## Who It Is For

Pathfinder is designed for secondary school students aged 13–17 who are exploring different career options.

## The Problem

Many students are unsure about:

- What careers are available to them
- Which career to explore
- What steps they can take next

Pathfinder aims to make career exploration simpler and more actionable.

## What We Built

### Week 4 — Core Task Experience

For Week 4, we focused on one simple flow:

**Today's Task → Task Details → Task Complete**

### Today's Task

Students see their current task, the estimated time and XP they can earn.

### Task Details

Students can view the task information and start the task.

### Task Complete

Students see that the task has been completed and view their earned XP and progress.

### Week 5 — Progress Tracking

For Week 5, we extended the existing task experience with a simple progress-tracking flow:

**Task Complete → My Progress → Completed Task Details**

Students can:

- View their completed tasks
- See their earned XP
- See their current streak
- Open a completed task to view its details
- Return to their progress

### My Progress

The My Progress screen gives students a simple view of what they have accomplished so far.

### Completed Task Details

Students can select a completed task and view its details.

### Week 6 — Functional Learning & Exploration

For Week 6, we focused on making learning interactions, progress tracking, and career exploration fully functional and persistent:

#### 1. Task Completion & Progress Update

- Completing a task updates completion state.
- XP is added to the user's total.
- The current streak counter increments when a new task is completed.
- Skills are added.
- Relevant badges can be unlocked.
- State persists using Web Storage.

#### 2. Completed Task Review

- Completed tasks can be opened from My Progress.
- The user can review the original scenario, selected strategy, feedback, skills gained, and badge earned.
- Completed task state and the user’s selected answer are persisted with Web Storage, while the task’s original content and feedback are reconstructed from the existing task dataset.

#### 3. Career Track Filtering

- Users can filter tasks by All Tracks, Tech & AI, Design & Gaming, Science & Climate, and Future Business.
- The task grid updates based on the selected track.
- Existing completion states are preserved.
- Filtered tasks can still be opened in Task Details.

## Key Product Decision

Instead of building the full Pathfinder product, we are building the experience in small, complete flows.

Week 4 focused on helping a student complete one career exploration task.

Week 5 extended that experience by helping the student see and review their progress.

This allows us to build and test the product incrementally before adding more features.

## Design Direction

The interface is:

- Simple
- Clean
- Modern
- Youth-friendly
- Easy to understand

We use clear layouts, rounded elements and friendly colours to keep the experience approachable for students.

## Tech Stack

- HTML
- CSS
- JavaScript

## Project Status

**MVP / Functional Prototype**

The current version includes:

- Interactive task experience with scenario evaluation and feedback
- Real-time XP, streak tracking, skill acquisition, and badge unlocks
- Persistent progress and completed task history using Web Storage
- Completed task review with scenario, selected strategy, feedback, skills, and badges
- Career track filtering (All Tracks, Tech & AI, Design & Gaming, Science & Climate, Future Business) with preserved completion states

## What's Next

The next step is to test the interactive task completion, review, and track filtering flows with students, gather user feedback on the learning experience, and evaluate next steps such as expanded career tracks and deeper scenario tasks.