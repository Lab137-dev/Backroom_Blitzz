# Backroom Blitzz

A browser-based retail backroom unloading and crew-management simulation.

Assign a crew, work through pallets and boxes, keep processing areas under control, manage trash and the compactor, and try to finish the shift without letting stress overwhelm the operation.

## Play

Download `index.html` and open it in a modern desktop or tablet browser. No build step is required.

## Gameplay systems

- Crew assignment and worker selection
- Pallet and box-processing simulation
- Shift clock and multi-day progression
- Stress management
- Trash-can and compactor capacity
- Home Goods bins, decor shelves, and clothing racks
- Rest and recovery
- Random shift events and callaways
- Pizza speed bonuses
- Pause, sound, help, and diagnostic controls

## Goal

Balance people, workload, capacity, and time. Moving every worker to the pallets may increase unloading speed, but neglected processing areas and rising stress can create new problems.

## Project status

Playable experimental simulation, version 16.1. It is a compact prototype contained in a single HTML file.

## About

Created by Danny Morgan / LAB-137 from firsthand knowledge of retail backroom operations. It is an independent fictional simulation and is not an official product of any retailer.

## Living Backroom upgrade

The first visual upgrade adds pixel-style workers with walking and carton-carrying animation, detailed processing equipment, a decorative roller conveyor, crew cards and direct job buttons. Existing simulation rules remain the foundation; the conveyor does not introduce a separate transport system yet.

Select a crew card and choose a job, or tap a worker and then equipment. Use Speed to cycle between 1×, 2× and 0.5×. New Game resets the shift. Pallets now reports completed pallets against the day's total.

The upgrade also fixes crew counts and prevents arrival logic from interrupting workers' breaks or bringing departed temps back.

Run the dependency-free simulation smoke checks with `node tests/simulation.cjs`. These exercise freight processing, break handling, pause, restart and drawing calls with a mock canvas. Real browser visual and touch validation remains necessary.
