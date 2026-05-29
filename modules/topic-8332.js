export default {
  id: 'topic-8332',
  code: '8.3.3.2',
  title: 'Цикл for в Python',
  layout: 'single',

  sections: [
    {
      heading: 'for и range() — перебор чисел',
      content: `
<p>Цикл <code>for</code> используется когда заранее известно, сколько раз нужно повторить действие. Чаще всего с ним используют <code>range()</code> — генератор последовательности чисел:</p>
<pre><code class="language-python">range(stop)              # от 0 до stop-1
range(start, stop)       # от start до stop-1
range(start, stop, step) # с шагом step</code></pre>
<pre><code class="language-python">for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):    # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 11, 2): # 0, 2, 4, 6, 8, 10
    print(i)</code></pre>`,
      example: {
        title: 'Таблица умножения на 5',
        code: `for i in range(1, 11):
    print(f"5 × {i} = {5 * i}")`
      },
      task: {
        prompt: 'Используя цикл <code>for</code> и <code>range()</code>, выведите чётные числа от <strong>2 до 10</strong> через пробел в одну строку. Ожидаемый вывод: <em>2 4 6 8 10</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `result = []\nfor i in range(2, 11, 2):\n    result.append(str(i))\nprint(' '.join(result))`,
        hint: 'Используйте <code>range(2, 11, 2)</code> — начало 2, конец 11 (не включается), шаг 2. Чтобы вывести через пробел: накапливайте в список и выводите через <code>print(\' \'.join(...))</code>.',
        test: (out, code) => out.trim() === '2 4 6 8 10' && code.includes('for')
      }
    },

    {
      heading: 'for по списку',
      content: `
<p>Цикл <code>for</code> умеет перебирать не только числа, но и элементы любого списка:</p>
<pre><code class="language-python">fruits = ["яблоко", "банан", "вишня"]
for fruit in fruits:
    print(fruit)

numbers = [5, 2, 8, 1]
for n in numbers:
    print(n * 2)</code></pre>
<p>Если нужен и индекс, и значение — используй <code>enumerate()</code>:</p>
<pre><code class="language-python">for i, val in enumerate(["а", "б", "в"]):
    print(i, val)  # 0 а, 1 б, 2 в</code></pre>`,
      example: {
        title: 'Найти минимум и максимум в списке',
        code: `numbers = [15, 3, 42, 8, 27, 1, 19]
min_val = numbers[0]
max_val = numbers[0]

for n in numbers:
    if n < min_val:
        min_val = n
    if n > max_val:
        max_val = n

print(f"Мин: {min_val}, Макс: {max_val}")`
      },
      task: {
        prompt: 'Дан список <code>nums = [3, 7, 2, 8, 1, 9, 4]</code>. Подсчитайте и выведите количество чисел, которые <strong>больше 5</strong>. Ожидаемый ответ: <em>3</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `nums = [3, 7, 2, 8, 1, 9, 4]\ncount = 0\nfor n in nums:\n    if n > 5:\n        count += 1\nprint(count)`,
        hint: 'Переберите элементы списка циклом <code>for</code>. Внутри проверяйте <code>if n > 5</code> и увеличивайте счётчик.',
        test: (out, code) => out.trim() === '3' && code.includes('for') && code.includes('if')
      }
    },

    {
      heading: 'Накопитель в цикле for',
      content: `
<p>Так же, как в <code>while</code>, можно накапливать сумму, произведение или другой результат:</p>
<pre><code class="language-python">numbers = [10, 20, 30, 40]
s = 0
for n in numbers:
    s += n
print(s)      # 100
print(s / len(numbers))  # 25.0 — среднее</code></pre>
<p>С <code>range()</code> и накопителем:</p>
<pre><code class="language-python">s = 0
for i in range(1, 6):
    s += i ** 2   # 1 + 4 + 9 + 16 + 25
print(s)  # 55</code></pre>`,
      example: {
        title: 'Сумма только положительных',
        code: `nums = [3, -1, 7, -5, 2, -8, 4, 9]
s = 0
for x in nums:
    if x > 0:
        s += x
print(f"Сумма положительных: {s}")`
      },
      task: {
        prompt: 'Вычислите сумму квадратов чисел от 1 до 10: <strong>1² + 2² + … + 10²</strong>. Выведите результат. Ожидаемый ответ: <em>385</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `s = 0\nfor i in range(1, 11):\n    s += i ** 2\nprint(s)`,
        hint: 'Заведите <code>s = 0</code>. Переберите <code>for i in range(1, 11)</code>. Внутри: <code>s += i ** 2</code>.',
        test: (out, code) => out.trim() === '385' && code.includes('for')
      }
    },

    {
      heading: 'Практика: сумма от 1 до 50',
      content: `<p>Цикл <code>for</code> с <code>range()</code> идеально подходит для вычислений над диапазоном чисел.</p>`,
      example: {
        title: 'Сумма нечётных',
        code: `s = 0
for i in range(1, 20, 2):  # 1, 3, 5, ..., 19
    s += i
print(s)  # 100`
      },
      task: {
        prompt: 'Используя цикл <code>for</code>, вычислите сумму всех чисел от <strong>1 до 50</strong> включительно. Ожидаемый ответ: <em>1275</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `s = 0\nfor i in range(1, 51):\n    s += i\nprint(s)`,
        hint: 'Используйте <code>range(1, 51)</code> — второй аргумент не включается, поэтому 51. Накапливайте сумму через <code>s += i</code>.',
        test: (out, code) => out.trim() === '1275' && (code.includes('for') || code.includes('sum('))
      }
    },

    {
      heading: 'Практика: чётные в списке',
      content: `<p>Комбинация <code>for</code> + <code>if</code> — один из самых частых паттернов в программировании: перебери все, отбери нужные.</p>`,
      example: {
        title: 'Подсчёт кратных 3',
        code: `nums = [9, 4, 15, 7, 21, 8, 6]
count = 0
for n in nums:
    if n % 3 == 0:
        count += 1
print(count)  # 4`
      },
      task: {
        prompt: 'Дан список <code>numbers = [4, 17, 2, 9, 31, 6, 14]</code>. Найдите и выведите количество <strong>чётных</strong> чисел в нём. Ожидаемый ответ: <em>3</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `numbers = [4, 17, 2, 9, 31, 6, 14]\ncount = 0\nfor n in numbers:\n    if n % 2 == 0:\n        count += 1\nprint(count)`,
        hint: 'Переберите список. Для каждого числа проверяйте <code>if n % 2 == 0</code> — если остаток от деления на 2 равен 0, число чётное.',
        test: (out, code) => out.trim() === '3' && code.includes('for') && code.includes('if')
      }
    },

    {
      heading: 'Практика: переворот строки',
      content: `<p>Строку можно перебирать как список символов. Если добавлять каждый новый символ в <em>начало</em> накопителя — строка перевернётся.</p>`,
      example: {
        title: 'Строка из чётных символов',
        code: `s = "abcdef"
result = ""
for i, ch in enumerate(s):
    if i % 2 == 0:
        result += ch
print(result)  # ace`
      },
      task: {
        prompt: 'Используя цикл <code>for</code>, переверните строку <code>s = "Python"</code> и выведите результат. Ожидаемый вывод: <em>nohtyP</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `s = "Python"\nresult = ""\nfor ch in s:\n    result = ch + result\nprint(result)`,
        hint: 'Заведите <code>result = ""</code>. Для каждой буквы: <code>result = ch + result</code> — буква добавляется в <em>начало</em>, а не в конец.',
        test: (out, code) => out.trim() === 'nohtyP' && code.includes('for')
      }
    }
  ]
};
