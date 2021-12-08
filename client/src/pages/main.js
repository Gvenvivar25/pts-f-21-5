console.log('main')
import s from './main.module.css'
console.log(s)
const main = () => {
  return `<div class=${s.test}>test style</div>`
}
export default main()
