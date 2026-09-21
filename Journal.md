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