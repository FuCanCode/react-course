export interface Workout {
    name: "Full-body workout" | "Arms + Legs" | "Arms only" | "Legs only" | "Core only"
      numExercises: number
}

export type Workouts = Array<Workout>