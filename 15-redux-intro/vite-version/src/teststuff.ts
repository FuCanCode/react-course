/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];

console.log(breeds.find((b) => b.breed === "Husky")?.averageWeight);
console.log(
  breeds.find(
    (b) => b.activities.includes("running") && b.activities.includes("fetch")
  )
);

const allActivities = breeds.flatMap((breed) => breed.activities);
console.log(allActivities);

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

const swimmingAdjacent = breeds
  .filter((breed) => breed.activities.includes("swimming"))
  .flatMap((breed) => breed.activities)
  .filter((activity) => activity !== "swimming");

console.log(swimmingAdjacent);

const swimmingAdjacent2 = breeds.reduce((arr: string[], breed) => {
  if (!breed.activities.includes("swimming")) return arr;

  const withoutSwimming = breed.activities.filter((a) => a !== "swimming");

  arr.push(...withoutSwimming);
  return arr;
}, []);

console.log(swimmingAdjacent2);

const reducer = (sum: number, current: { averageWeight: number }) => {
  sum = sum + current.averageWeight;
  return sum / 2;
};
const avgWeigth = breeds.reduce(reducer, 0);
console.log(avgWeigth >= 10);

console.log(breeds.some((b) => b.averageWeight < 10));
console.log(
  "Active: ",
  breeds.some((b) => b.activities.length >= 3)
);

const maxAvgWeightOfFetchers = Math.max(
  ...breeds
    .filter((breed) => breed.activities.includes("fetch"))
    .map((breed) => breed.averageWeight)
);
console.log("Max weight of fetcher: ", maxAvgWeightOfFetchers);

const movements = [100, -200, 300, -400, 500, -600];
const groupedBy = Object.groupBy(movements, (el) =>
  el > 0 ? "deposit" : "withdrawal"
);
console.log(groupedBy);
console.log(movements);
console.log(movements.with(2, 5000));
