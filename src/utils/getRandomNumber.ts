export function getRandomNumber(): number {
  const randomNumber = Math.random()
  console.log(Math.floor(randomNumber * 7))
  return Math.floor(randomNumber * 7)
}
