const radicals = require("./radicals");

function solve (a, b, c) {
	
	//housekeeping
	let answer = [];
	a = Number(a);
	b = Number(b);
	c = Number(c);

	//check for a = 0
	if (a == 0) {
		answer = "a cannot be equal to 0";
	}

	//handle non-ints
	if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(c)) {
		answer = "Please enter an integer";
		return answer;
	}

	//handle large numbers
	if (a > 1000000000000 || b > 1000000000000 || c > 1000000000000) {
		answer = "Numbers must be less than 1,000,000,000,000";
		return answer;
	}

	//quadratic formula: [-b ± (b² - 4ac)] / 2a

	let bottom_line = 2 * a;
	let radical = radicals.simplify((b * b) - (4 * a * c));

	if (Number.isInteger(radical)) {
		let top_line_plus = -b + radical
		let top_line_minus = -b - radical

		if (Number.isInteger(top_line_plus / bottom_line)) {
			answer.push(top_line_plus / bottom_line);
		}
		else {
			answer.push(`${top_line_plus} / ${bottom_line}`);
		}

		if (Number.isInteger(top_line_minus / bottom_line)) {
			answer.push(top_line_minus / bottom_line);
		}
		else {
			answer.push(`${top_line_minus} / ${bottom_line}`);
		}

		return answer;
	}
	else {
		//TODO: add logic for simplifying by factoring (future update)
		answer.push(`${-b} + ${radical} / ${bottom_line}`);
		answer.push(`${-b} - ${radical} / ${bottom_line}`);
		return answer;
	}
}

console.log(solve(1, 2, 3))