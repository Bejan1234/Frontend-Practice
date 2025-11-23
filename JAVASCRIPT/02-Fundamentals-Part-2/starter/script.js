"use sterict";

// let hasDriverLicence = false;
// const passTest = true;

// if (passTest) hasDriverLicence = true;
// if (hasDriverLicence) console.log("I can drive :D");

// const private = 534;

// function logger() {
//   console.log("My name is Jonas");
// }
// //call ghe function
// logger();
// logger();
// logger();
// function fruitProcessor(apples, oranges) {
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// const appleOranceJuice = fruitProcessor(2, 4);
// console.log(appleOranceJuice);

// const num = Number("23");

// function calcAge(birthYear) {
//   return 2025 - birthYear;
// }

// const age1 = calcAge(1991);
// console.log(age1);

// const calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// };
// const age2 = calcAge2(1991);
// console.log(age1, age2);

//Arrow function

// const calcAge3 = (birthDay) => 2037 - birthDay;
// const age2 = calcAge3(1991);
// console.log(age2);

// const yearsUntilRetirement = (birthYear, firstName) => {
//   const age = 2037 - birthYear;
//   const retirement = 65 - age;
//   return `${firstName} retires in ${retirement} years`;
// };

// console.log(yearsUntilRetirement(1991, `Jonas`));
// console.log(yearsUntilRetirement(1980, `Bob`));

// function cutFruitPieces(fruit) {
//   return fruit * 4;
// }
// function fruitProcessor(apples, oranges) {
//   const applePieces = cutFruitPieces(apples);
//   const orangesPieces = cutFruitPieces(oranges);
//   const juice = `Juice with ${applePieces} apples and ${orangesPieces} oranges.`;
//   return juice;
// }

// console.log(fruitProcessor(2, 3));

// const calcAge = function (birtYear) {
//   return 2037 - birtYear;
// };

// const yearsUntilRetirement = function (birthYear, firstName) {
//   const age = calcAge(birthYear);
//   const retirement = 65 - age;

//   if (retirement > 0) {
//     console.log(`${firstName} retires in ${retirement} years`);
//     return retirement;
//   } else {
//     console.log(`${firstName} has already retired 🎉`);
//     return -1;
//   }
// };

// console.log(yearsUntilRetirement(1991, `Jonas`));
// console.log(yearsUntilRetirement(1980, `Bob`));
// console.log(yearsUntilRetirement(1970, `Mike`));

// const calcAverage = function (score1, score2, score3) {
//   return (score1 + score2 + score3) / 3;
// };

// const scoreDolphins = calcAverage(85, 54, 41);
// const scoreKoalas = calcAverage(23, 34, 27);

// function checkWinner(avgDolphins, avgKoalas) {
//   if (avgDolphins >= 2 * avgKoalas) {
//     console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`);
//   } else if (avgKoalas >= 2 * avgDolphins) {
//     console.log(`Koalas win (${avgKoalas} vs ${avgDolphins})`);
//   } else {
//     console.log(`No team wins...`);
//   }
// }

// console.log(checkWinner(scoreDolphins, scoreKoalas));

// const friend1 = "Michael";
// const friend2 = "Steven";
// const friend3 = "Peter";

// const friends = ["Michael", "Steven", "Peter"];
// console.log(friends);

// const y = new Array(1991, 1984, 2008, 2020);

// console.log(friends[0]);
// console.log(friends[2]);

// console.log(friends.length);

// console.log(friends[friends.length - 1]);

// friends[2] = "Jay";
// console.log(friends);

// const firstName = "Jonas";
// const jonas = [firstName, "Schmedtmann", 2037 - 1991, "teacher", friends];
// console.log(jonas);

// const calcAge = function (birthYear) {
//   return 2025 - birthYear;
// };
// const years = [1990, 1967, 2002, 2010, 2018];

// const age1 = calcAge(years[0]);
// const age2 = calcAge(years[1]);
// const age3 = calcAge(years[years.length - 1]);

// console.log(age1, age2, age3);

// const ages = [
//   calcAge(years[0]),
//   calcAge(years[1]),
//   calcAge(years[years.length - 1]),
// ];
// console.log(ages);

// const friends = ["Michael", "Steven", "Peter"];
// const newLength = friends.push("Jay");
// console.log(friends);
// console.log(newLength);
// friends.unshift("John");
// console.log(friends);

// friends.pop();
// const popped = friends.pop();
// console.log(popped);

// console.log(friends);
// friends.shift();
// console.log(friends);

// console.log(friends.indexOf("Steven"));
// console.log(friends.indexOf("Bob"));

// friends.push(23);
// console.log(friends);

// if (friends.includes("Steven")) {
//   console.log("You have a friend called Steven");
// }

// function calcTip(bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }
// const bills = [125, 555, 44];

// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

// console.log(tips);

// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// console.log(totals);

// const jonasArray = [
//   "Jonas",
//   "Schmedtmann",
//   2037 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
// ];

// const jonas = {
//   firstName: "Jonas",
//   LastName: "Schmedtmann",
//   age: 2037 - 1991,
//   job: "teacher",
//   friends: ["Michael", "Peter", "Steven"],
// };

// console.log(jonas);
// console.log(jonas.LastName);
// console.log(jonas["LastName"]);

// const interestedIn = prompt(
//   "What do you want to know about Jonas? Choose between firstName, LastName, age, job, and friends"
// );

// if (jonas[interestedIn]) {
//   console.log(jonas[interestedIn]);
// } else {
//   console.log(
//     "Wrong request! Choose between firstName, LastName, age, job, and friends"
//   );
// }
// jonas.location = "Portugal";
// jonas["twitter"] = "ionutbejan678@gmail.com";
// console.log(jonas);

// console.log(
//   `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`
// );

// console.log(`${jonas.age} have this guy ${jonas.firstName} `);

// const jonas2 = {
//   firstName: "Jonas",
//   LastName: "Schmedtmann",
//   birthYear: 1991,
//   age: 2037 - 1991,
//   job: "teacher",
//   friends: ["Michael", "Peter", "Steven"],
//   hasDriverLicence: true,

//   calcAge: function (birthYear) {
//     console.log(this);
//     this.age = 2037 - this.birthYear;
//     return this.age;
//   },
// };

// console.log(jonas2.age);

// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,

//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };

// const john = {
//   fullName: "John Smith",
//   mass: 92,
//   height: 1.95,

//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };
// if (mark.calcBMI() > john.calcBMI()) {
//   console.log(
//     `${mark.fullName}'s BMI(${mark.bmi} is higher than ${john.fullName}'s BMI(${john.bmi})`
//   );
// } else {
//   console.log(
//     `${john.fullName}'s BMI(${john.bmi} is higher than ${mark.fullName}'s BMI(${mark.bmi})`
//   );
// }

for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
}
