export default {
  id: 'topic-8333',
  code: '8.3.3.3',
  title: 'Управление циклами: continue, break, else',

  theory: `
<h2>Операторы управления циклами</h2>
<p>Python предоставляет три инструмента для управления ходом выполнения цикла: <code>break</code>, <code>continue</code> и блок <code>else</code>. Они позволяют создавать более гибкие и эффективные циклы.</p>

<h2>Оператор break — досрочный выход</h2>
<p>Оператор <code>break</code> немедленно прерывает выполнение цикла и передаёт управление первой инструкции после него. Используется, когда нужный элемент найден или достигнуто особое условие.</p>
<pre><code class="language-python">for i in range(10):
    if i == 5:
        break       # выходим, как только i достигло 5
    print(i)
# Выведет: 0, 1, 2, 3, 4</code></pre>

<h2>Оператор continue — пропуск итерации</h2>
<p>Оператор <code>continue</code> пропускает оставшуюся часть текущей итерации и переходит к следующей. Используется, когда нужно пропустить отдельные элементы.</p>
<pre><code class="language-python">for i in range(10):
    if i % 2 == 0:
        continue    # пропускаем чётные числа
    print(i)
# Выведет: 1, 3, 5, 7, 9</code></pre>

<h2>Блок else у цикла</h2>
<p>Блок <code>else</code> после цикла выполняется только в том случае, если цикл завершился <strong>нормально</strong> (не через <code>break</code>). Это полезно для поиска: если элемент не найден — выполняется <code>else</code>.</p>
<pre><code class="language-python">for i in range(5):
    if i == 10:
        print("Нашли!")
        break
else:
    print("Не нашли")  # выполнится, так как break не сработал</code></pre>

<div class="tip"><strong>Совет:</strong> блок <code>else</code> у циклов — уникальная особенность Python, которой нет во многих других языках. Он идеально подходит для алгоритмов поиска.</div>
`,

  examples: [
    {
      title: 'Пример 1: Поиск первого числа, делящегося на 7 в диапазоне 1–50',
      code: `for n in range(1, 51):
    if n % 7 == 0:
        print(f"Первое число, делящееся на 7: {n}")
        break
else:
    print("Таких чисел нет")`
    },
    {
      title: 'Пример 2: Сумма только положительных чисел из списка',
      code: `chisla = [3, -1, 7, -5, 2, -8, 4, 9, -2]
summa = 0

for x in chisla:
    if x < 0:
        continue    # пропускаем отрицательные
    summa += x

print(f"Сумма положительных: {summa}")
print(f"Положительные числа: {[x for x in chisla if x > 0]}")`
    }
  ],

  tasks: [
    {
      prompt: 'Дан список <code>nums = [12, 5, 8, 3, 17, 2, 9]</code>. Используя <code>break</code>, найдите первое число в списке, которое больше 10, и выведите его. Ожидаемый ответ: <em>12</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `nums = [12, 5, 8, 3, 17, 2, 9]\nfor n in nums:\n    if n > 10:\n        print(n)\n        break`,
      hint: 'После того как нашли нужный элемент и вывели его, используйте <code>break</code> — это остановит цикл немедленно, так что следующие числа не будут проверяться.',
      test: (out, code) => out.trim() === '12' && code.includes('break')
    },
    {
      prompt: 'Используя <code>continue</code>, выведите все числа от 1 до 15, которые <strong>не</strong> делятся на 3. Выведите их через пробел в одну строку. Ожидаемый вывод: <em>1 2 4 5 7 8 10 11 13 14</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `chisla = []\nfor i in range(1, 16):\n    if i % 3 == 0:\n        continue\n    chisla.append(i)\nprint(' '.join(map(str, chisla)))`,
      hint: 'Код почти готов — <code>continue</code> уже на месте. Он пропускает оставшуюся часть итерации, поэтому <code>append</code> не выполнится для кратных 3. Просто уберите лишние комментарии и запустите.',
      test: (out, code) => out.trim() === '1 2 4 5 7 8 10 11 13 14' && code.includes('continue')
    },
    {
      prompt: 'Дан список <code>data = [4, 7, 2, 8, 1, 5]</code>. Используя <code>break</code> и <code>else</code>, проверьте, есть ли в нём число 8. Выведите <em>«Найдено: 8»</em> если есть, или <em>«Не найдено»</em> если нет.',
      starterCode: `# ваш код здесь
`,
      solution: `data = [4, 7, 2, 8, 1, 5]\nfor x in data:\n    if x == 8:\n        print("Найдено: 8")\n        break\nelse:\n    print("Не найдено")`,
      hint: 'Замените комментарий на <code>break</code>. Блок <code>else</code> у цикла выполняется только если <code>break</code> так и не был вызван — это идеальный паттерн для поиска.',
      test: (out, code) => out.trim() === 'Найдено: 8' && code.includes('break')
    }
  ]
};
