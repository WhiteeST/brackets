const config1 = [['(', ')']];
const config2 = [['(', ')'], ['[', ']']];
const config3 = [['(', ')'], ['[', ']'], ['{', '}']];
const config4 = [['|', '|']];
const config5 = [['(', ')'], ['|', '|']];
const config6 = [['1', '2'], ['3', '4'], ['5', '6'], ['7', '7'], ['8', '8']];
const config7 = [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']];

module.exports = function check(str, bracketsConfig) {
  let bracket_arr = str.split('');
  let brackets = [];
  for (let i = 0; i < bracket_arr.length; i++) {
    let pair_index;
    let cur_index;
    let current_symb = bracket_arr[i]
    let top = brackets[brackets.length - 1];
    let top_index;
    //находим в конфиге номер пары и узнаем открытая или закрытая скобка
    bracketsConfig.find((value, index) => {
      if (value.includes(current_symb)) {
        cur_index = value.indexOf(current_symb); //если 0 - то открытая
        pair_index = index;
      }
    })
    bracketsConfig.find((value, index) => { // узнаем тип верхней скобки
      if (value.includes(top))
        top_index = index;
    })

    //если открытая кладем в стек брэкетов, также проверяем конфиг на одинаковые скобки
    if (cur_index === 0) {
      if (((bracketsConfig[pair_index])[cur_index] === (bracketsConfig[pair_index])[1]) && (top_index === pair_index))
        brackets.pop();
      else
        brackets.push(current_symb);
    }

    //иначе сверяем подходит ли она к закрытия верхнего элемента стека
    else {
      if (brackets.length === 0)
        return false;

      if (pair_index === top_index)  // если они парные - вынимаем
        brackets.pop();
      else
        return false;
    }
  }
  return brackets.length === 0;
}