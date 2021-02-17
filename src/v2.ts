enum Colors {
	YELLOW,
	RED,
	BLUE,
	GREEN,
	PINK
}

interface ColorPosition {
	index: number
	item: Colors
}

const answer: Array<Colors> = [randomInt(5), randomInt(5), randomInt(5), randomInt(5)]

function generatePossibilities() {
	const v = Object.values(Colors).filter((i) => typeof i !== 'string') as Array<Colors>
	const l: Array<Array<Colors>> = []
	v.forEach((v1) => {
		v.forEach((v2) => {
			v.forEach((v3) => {
				v.forEach((v4) => {
					l.push([v1, v2, v3, v4])
				})
			})
		})
	})
	return l
}

/**
 * 
 * @param items the input item
 * @returns [the number of correct items, the number of correct color but not in the corretc place]
 */
function compare(items: Array<Colors>) {
	let correct = 0
	let colorIn = 0
	const checkForColor: Array<Colors> = []
	const anComparor: Array<Colors> = []
	for (let i = 0; i < (items || []).length; i++) {
		const item = items[i];
		if (item === answer[i]) {
			correct++
		} else if (!checkForColor.includes(item)) {
			checkForColor.push(item)
			anComparor.push(answer[i])
		}
	}
	for (const color of checkForColor) {
		const index = anComparor.indexOf(color)
		if (index !== -1) {
			colorIn++
			anComparor.splice(index, 1)
		}
	}
	return [correct, colorIn]
}

/**
 * List of possibilities
 */
let list = generatePossibilities()
let posPossible: Array<Array<Colors>> = [[], [], [], []]

function resolve(): void {
	addRow(answer)
	let i = 0
	let guess: Array<Colors> = []
	let won = false
	do {
		const index = randomInt(list.length)
		guess = list.splice(index, 1)[0]
		addRow(guess)
		console.log(++i)
		console.log('compare results', compare(guess), guess)
		console.log('list length', list.length)
		won = asWon(guess)
		if (!won && list.length === 0) {
			list = generatePossibilities()
		}
	} while (!won);
	console.log('Victoire', guess, answer)
}

function randomInt(max: number) {
	return Math.floor(Math.random() * max)
}

function asWon(guess: Array<Colors>) {
	const [correct, colorsIn] = compare(guess)
	if (correct === 4) {
		return true
	}
	if (correct === 0) {
		console.log(posPossible)
		list = list.filter((item) => {
			for (let index = 0; index < item.length; index++) {
				const color = item[index];
				if (colorsIn === 0) {
					if (guess.includes(color)) return false
				} else {
					if (guess[index] === color) return false
				}
			}
			return true
		})
	}
	return false
}


function addRow(colors: Array<Colors>) {
	const tr = document.createElement('tr')
	for (const color of colors) {
		const td = document.createElement('td')
		td.classList.add('color-' + color)
		tr.appendChild(td)
	}
	document.querySelector('table').appendChild(tr)
}

window.onload = resolve