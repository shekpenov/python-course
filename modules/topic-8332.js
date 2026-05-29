export default {
  id: 'topic-8332',
  code: '8.3.3.2',
  title: 'Цикл for в Python',

  theory: `
<h2>Цикл for — перебор элементов</h2>
<p>Цикл <code>for</code> используется для перебора элементов какой-либо последовательности: чисел, символов строки, элементов списка и т.д. В отличие от <code>while</code>, в цикле <code>for</code> заранее известно, сколько раз он выполнится.</p>

<h2>Синтаксис</h2>
<pre><code class="language-python">for переменная in последовательность:
    # тело цикла</code></pre>

<h2>Функция range()</h2>
<p>Чаще всего вместе с <code>for</code> используется функция <code>range()</code>, которая генерирует последовательность целых чисел:</p>
<pre><code class="language-python">range(stop)           # от 0 до stop-1
range(start, stop)    # от start до stop-1
range(start, stop, step)  # с шагом step

for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):     # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 11, 2): # 0, 2, 4, 6, 8, 10
    print(i)</code></pre>

<h2>Перебор строки и списка</h2>
<pre><code class="language-python"># Перебор символов строки
for bukva in "Python":
    print(bukva)    # P, y, t, h, o, n

# Перебор элементов списка
chisla = [10, 20, 30]
for ch in chisla:
    print(ch)       # 10, 20, 30</code></pre>

<div class="tip"><strong>Совет:</strong> если вам нужен и индекс, и значение, используйте <code>enumerate()</code>: <code>for i, val in enumerate(список):</code></div>
`,

  examples: [
    {
      title: 'Пример 1: Таблица умножения на 7',
      code: `print("Таблица умножения на 7:")
for i in range(1, 11):
    print(f"7 × {i} = {7 * i}")`
    },
    {
      title: 'Пример 2: Сумма и минимум списка',
      code: `chisla = [15, 3, 42, 8, 27, 1, 19]

summa = 0
minimum = chisla[0]

for ch in chisla:
    summa += ch
    if ch < minimum:
        minimum = ch

print(f"Сумма: {summa}")
print(f"Минимум: {minimum}")
print(f"Среднее: {summa / len(chisla):.2f}")`
    }
  ],

  tasks: [
    {
      prompt: 'Используя цикл <code>for</code> и <code>range()</code>, вычислите сумму всех чисел от 1 до 50. Выведите результат. Ожидаемый ответ: <em>1275</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `summa = 0\nfor i in range(1, 51):\n    summa += i\nprint(summa)`,
      hint: 'Замените <code>pass</code> на <code>summa += i</code>. Убедитесь, что в <code>range()</code> указаны правильные границы — второй аргумент не включается.',
      test: (out, code) => out.trim() === '1275' && (code.includes('for') || code.includes('sum('))
    },
    {
      prompt: 'Дан список <code>numbers = [4, 17, 2, 9, 31, 6, 14]</code>. Найдите и выведите количество чётных чисел в этом списке. Правильный ответ: <em>3</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `numbers = [4, 17, 2, 9, 31, 6, 14]\ncount = 0\nfor n in numbers:\n    if n % 2 == 0:\n        count += 1\nprint(count)`,
      hint: 'Внутри цикла проверяйте остаток от деления на 2: <code>if n % 2 == 0</code>. Если условие выполнено — увеличивайте счётчик <code>count</code> на 1.',
      test: (out, code) => out.trim() === '3' && code.includes('for')
    },
    {
      prompt: 'Используя цикл <code>for</code>, переверните строку <code>s = "Python"</code> и выведите её символы в обратном порядке одной строкой. Ожидаемый вывод: <em>nohtyP</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `s = "Python"\nrezultat = ""\nfor bukva in s:\n    rezultat = bukva + rezultat\nprint(rezultat)`,
      hint: 'Чтобы «развернуть» строку, каждую новую букву нужно ставить не в конец, а в <em>начало</em> накопителя. Подумайте: как изменится порядок, если писать <code>bukva + rezultat</code> вместо <code>rezultat + bukva</code>?',
      test: (out, code) => out.trim() === 'nohtyP' && code.includes('for')
    }
  ]
};
