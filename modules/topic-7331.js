export default {
  id: 'topic-7331',
  code: '7.3.3.1',
  title: 'Цикл while в Python',

  theory: `
<h2>Что такое цикл while?</h2>
<p>Цикл <code>while</code> (пока) — это конструкция, которая повторяет блок кода до тех пор, пока заданное условие остаётся истинным. В отличие от <code>for</code>, количество итераций заранее неизвестно — цикл продолжается, пока условие <code>True</code>, и останавливается, как только оно становится <code>False</code>.</p>

<h2>Синтаксис</h2>
<pre><code class="language-python">while условие:
    # тело цикла — выполняется, пока условие True
    # не забудьте изменять переменную условия,
    # иначе цикл станет бесконечным!</code></pre>

<h2>Как работает цикл</h2>
<ol>
  <li>Проверяется условие.</li>
  <li>Если оно <code>True</code> — выполняется тело цикла.</li>
  <li>Снова проверяется условие.</li>
  <li>Если оно <code>False</code> — цикл завершается, выполнение продолжается после него.</li>
</ol>
<pre><code class="language-python">i = 1
while i <= 5:
    print(i)
    i += 1      # i = i + 1 — не забывайте увеличивать счётчик!
# Выведет: 1, 2, 3, 4, 5</code></pre>

<div class="warn"><strong>Внимание — бесконечный цикл!</strong> Если условие никогда не станет <code>False</code>, программа зависнет. Всегда убедитесь, что в теле цикла что-то изменяется так, чтобы условие в конце концов стало ложным.</div>

<h2>Счётчик и накопитель</h2>
<p>Типичные шаблоны с <code>while</code>: счётчик (переменная <code>i</code>, увеличивается на 1) и накопитель (переменная <code>summa</code>, накапливает результат). Эти паттерны используются в большинстве задач.</p>
`,

  examples: [
    {
      title: 'Пример 1: Обратный отсчёт',
      code: `schetchik = 5

print("Обратный отсчёт:")
while schetchik > 0:
    print(schetchik)
    schetchik -= 1   # уменьшаем счётчик

print("Пуск!")`
    },
    {
      title: 'Пример 2: Сумма чисел от 1 до N',
      code: `n = 10
i = 1
summa = 0

while i <= n:
    summa += i   # summa = summa + i
    i += 1

print(f"Сумма чисел от 1 до {n} = {summa}")
# Ожидается: 55`
    }
  ],

  tasks: [
    {
      prompt: 'Вычислите и выведите сумму чётных чисел от 1 до 20 включительно, используя цикл <code>while</code>. Результат: <em>110</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `i = 1\nsumma = 0\nwhile i <= 20:\n    if i % 2 == 0:\n        summa += i\n    i += 1\nprint(summa)`,
      hint: 'Внутри цикла сначала проверьте чётность с помощью <code>if i % 2 == 0:</code>, и только тогда прибавляйте к сумме. Строку <code>i += 1</code> оставьте вне этого <code>if</code> — она должна выполняться всегда.',
      test: (out, code) => out.trim() === '110' && code.includes('while')
    },
    {
      prompt: 'Вычислите факториал числа <code>n = 6</code> с помощью цикла <code>while</code>. Выведите результат. Факториал 6: 1×2×3×4×5×6 = <em>720</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `n = 6\ni = 1\nrezultat = 1\nwhile i <= n:\n    rezultat *= i\n    i += 1\nprint(rezultat)`,
      hint: 'Для умножения используйте оператор <code>*=</code>: <code>rezultat *= i</code> — это то же самое, что <code>rezultat = rezultat * i</code>. Начальное значение результата — 1 (уже задано), иначе умножение на 0 обнулит всё.',
      test: (out, code) => out.trim() === '720' && code.includes('while')
    },
    {
      prompt: 'Найдите наименьшее число <code>n</code>, при котором сумма 1+2+3+…+n превышает 100. Выведите это число <code>n</code>. Правильный ответ: <em>14</em> (1+2+…+14 = 105 > 100).',
      starterCode: `# ваш код здесь
`,
      solution: `n = 0\nsumma = 0\nwhile summa <= 100:\n    n += 1\n    summa += n\nprint(n)`,
      hint: 'Порядок важен: сначала увеличьте <code>n</code> на 1, затем добавьте это новое значение <code>n</code> к <code>summa</code>. Цикл остановится сам, когда сумма превысит 100.',
      test: (out, code) => out.trim() === '14' && code.includes('while')
    }
  ]
};
