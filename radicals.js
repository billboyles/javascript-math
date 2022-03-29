const factors = require("./factors");

function simplify (n) {

	//housekeeping
	let isNeg = false;
	let answer = "";
	n = Number(n);

	//handle non-ints
	if (!Number.isInteger(n)) {
		answer = "Please enter an integer";
		return answer;
	}

	//handle large numbers
	if (n > 1000000000000) {
		answer = "Number must be less than 1,000,000,000,000";
		return answer;
	}
	
	//handle negatives
	if (n < 0) {
		n *= -1;
		isNeg = true;
	}

	//handle trivial cases
	if (n === 0 || n === 1) {
		let answer = `${n}`;
		if (isNeg) {
			answer = "i";
		}
		return answer;
	}

	//check for perfect square
	if (Number.isInteger(Math.sqrt(n))) {
		answer = `${Math.sqrt(n)}`;
		if (isNeg) {
			answer += "i";
		}
		return answer;
	}

	//if none of the above, simplify square root
	let factorsArr = [];
	let primeFactorsArr = [];

	factorsArr = Array.from(factors.factor(n));  //TODO: why does this need to be changed to array? should already be an array from factor()

	while (factorsArr.length > 2) {
		//slice off ends of factorsArr
		factorsArr.pop();
		factorsArr.shift();
		//add new lowest to primeFactorsArr
		primeFactorsArr.push(factorsArr[0]);
		//factor new highest, repeat until only 2 factors
		factorsArr = Array.from(factors.factor(factorsArr.slice(-1)));
	}

	//add last factor
	primeFactorsArr.push(factorsArr[1]);

	//get count of each prime factor
	counts = primeFactorsArr.reduce((a, b) => ({
    		...a,
      		[b]: 1 + (a[b] || 0),
    	}),
    	{}
  	);

	//split removes and remainders
	let remainders = [];
	let removes = [];
	let remove = 0;
	let remainder = 0;

	Object.entries(counts).forEach(([key, value]) => {
   		let i = value;
   		while (i > 1) {
   			removes.push(key);
   			i -= 2;
   		}
   		if (i == 1) {
   			remainders.push(key)
   		}
	});

	//calculate up remainders
	remainder = remainders.reduce((a, b) => a * b);

	//convert to string
	remainder = remainder.toString();

	//if factors were removed
	if (removes.length > 0) {
		//calculate up removes
		remove = removes.reduce((a, b) => a * b);

		//convert to string
		remove = remove.toString();

		//add i for negatives
		if (isNeg) {
			remove += "i";
		}
	}

	//add square root sign and return
	return remove + "\u221A" + remainder;
}

//export
module.exports = {simplify};

//uncomment to use example
//console.log(simplify(-160))