function factor(n) {

	//housekeeping vars
	let factors = [];
	let answer = "";

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
	
	//handle trivial cases
	if (n === 0 || n === 1) {
		let answer = `${n}`;
		return answer;
	}

	//handle negatives
	if (n < 0) {
		answer = "Number must be positive";
		return answer;
	}

	//get factors
	for (let i = 1; i < Math.ceil(n / 2) + 1; i++) {
		let j = n / i;
		if (Number.isInteger(j)) {
			if (i in factors) {
				continue;
			}
			else {
				factors.push(i);
				factors.push(j);
			}
		}
	}

	//remove duplicates
	factors = Array.from([...new Set(factors)]);
	
	//sort array
	answer = factors.sort((a, b) => a - b);

	//return dict
	return answer;
}

console.log(factor(144));