enum Colors {
	YELLOW,
	RED,
	BLUE,
	GREEN,
	PINK,
	ORANGE
}

interface ColorPosition {
	index: number
	item: Colors
}

// interface Game {
// 	public constructor(points?: Array<Color>): Game

// }

// 1234

// 1111 = 4 / 1
// 1222 = 4 / 2
// 1233 = 4 / 3
// 1234 = 4 / 4

// 9999

// 1122 = 0 / 0
// 3344 = 0 / 0
// 5566 = 0 / 0
// 7788 = 0 / 0
// 9999 = 4 / 4

// 4751

// 1122 = 2 / 0
// 3313 = 1 / 0
// 4455 = 2 / 2
// 4666 = 1 / 1
// 7577 = 4 / 0

// ColorPositions possible
// xx1x,xxx1,2xxx,x2xx
// xxx1 !
// 4xxx,x4xx,xx4x,5xxx,x5xx,xx5x
// 4xxx ! x5xx, xx5x
// xx5x ! x7xx !





// nombres possibles
// 1, 2
// 1
// 1, 4, 5


// nombres exclus
// nil
// 2, 3
// 2, 3
// 2,3,6

const toWin = [Colors.PINK, Colors.ORANGE, Colors.BLUE, Colors.YELLOW]
// const length = toWin.length


const run = (input: Array<Colors>) => {
	let possible = 0
	let score = 0
	for (let i = 0; i < toWin.length; i++) {
		const winItem = toWin[i];
		const compareItem = input[i]
		if (winItem === compareItem) {
			score++
			continue
		}
		if (toWin.includes(compareItem)) {
			possible++
		}
	}
	return [possible, score]
}


let toCheck: Array<ColorPosition> = []
let confirmed: Array<ColorPosition> = []

let toRun = [Colors.YELLOW, Colors.YELLOW, Colors.RED, Colors.RED]
let [possibilities, correct] = run([Colors.YELLOW, Colors.YELLOW, Colors.RED, Colors.RED])
toCheck = toCheck.concat(calculatePossibilities(toRun, possibilities, correct))
updatePreviousMove(toRun, possibilities, correct)
console.log(toCheck, possibilities, correct)
toRun = [Colors.BLUE, Colors.BLUE, Colors.YELLOW, Colors.BLUE]
;[possibilities, correct] = run([Colors.BLUE, Colors.BLUE, Colors.YELLOW, Colors.BLUE])
toCheck = toCheck.concat(calculatePossibilities(toRun, possibilities, correct))
updatePreviousMove(toRun, possibilities, correct)
console.log(toCheck, possibilities, correct)
compareAndFilter(toRun, possibilities, correct)
console.log(toCheck, possibilities, correct)


// while (correct !== 4) {

// }

function possibleColors(items: Array<Colors>, possible: number): Array<Colors> {
	const colorCount: Array<number> = Array(toWin.length)
	for (const item of items) {
		if(!colorCount[item]) {
			colorCount[item] = 1
		} else {
			colorCount[item]++
		}
	}
	console.log(colorCount)
	const res: Array<Colors> = []
	for (let i = 0; i < colorCount.length; i++) {
		const element = colorCount[i];
		console.log(element)
		if (typeof element !== 'number') {continue}
		if (element === possible) {
			res.push(i)
		}
	}
	console.log(res)
	return res
}

function count(items: Array<Colors>, color: Colors) {
	return items.filter((col) => col === color).length
}

const knownAsFalse: Array<ColorPosition> = []
let previousMove: undefined | {
	sentItems: Array<Colors>
	possible: number
	correct: number
} = undefined

function compareAndFilter(sentItems: Array<Colors>, possible: number, correct: number) {
	const colorsUsed = possibleColors(sentItems, possible)
	const previousColors = possibleColors(previousMove.sentItems, previousMove.possible)
	console.log(colorsUsed, previousColors)
	for (const color of previousColors) {
		console.log(colorsUsed.includes(color),
		count(previousMove.sentItems, color) === previousMove.possible ,
		count(colorsUsed, color) === possible)
		if (
			colorsUsed.includes(color) &&
			count(previousMove.sentItems, color) === previousMove.possible &&
			count(colorsUsed, color) === possible
		) {
			const indexes = sentItems.map((item, key) => key).filter((key) => sentItems[key] === color)
			toCheck = toCheck.filter((item) => {
				if (item.item !== color) {
					return true
				}
				return indexes.includes(item.index)
			})
		}
	}
}

function updatePreviousMove(sentItems: Array<Colors>, possible: number, correct: number) {
	previousMove = {
		sentItems,
		possible,
		correct
	}
}

function calculatePossibilities(sentItems: Array<Colors>, possible: number, correct: number) {
	const res: Array<ColorPosition> = []
	if (possible === possibleColors(sentItems, possible).length) {
		for (const item of sentItems) {
			for (let i = 0; i < sentItems.length; i++) {
				const compared = sentItems[i]
				const toPush: ColorPosition = {index: i, item: item}
				const index = res.findIndex((t) => t.index === toPush.index && t.item === toPush.item)
				if (item !== compared && index === -1) {
					res.push(toPush)
				}
			}
		}
	}
	return res
}