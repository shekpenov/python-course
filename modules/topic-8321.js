export default {
  id: 'topic-8321',
  code: '8.3.2.1',
  title: 'Трассировка алгоритмов',
  layout: 'single',

  sections: [
    {
      heading: 'Что такое трассировка',
      content: `
<p>Трассировка — это пошаговое выполнение алгоритма с отслеживанием значений всех переменных. Это главный инструмент для понимания кода и поиска ошибок.</p>
<p>Результат записывают в <strong>таблицу трассировки</strong>: каждая строка — одна итерация, столбцы — значения переменных.</p>
<table>
  <tr><th>Шаг</th><th>i</th><th>s</th><th>i &lt;= 3?</th></tr>
  <tr><td>Начало</td><td>1</td><td>0</td><td>—</td></tr>
  <tr><td>1</td><td>2</td><td>1</td><td>True</td></tr>
  <tr><td>2</td><td>3</td><td>3</td><td>True</td></tr>
  <tr><td>3</td><td>4</td><td>6</td><td>False → выход</td></tr>
</table>`,
      example: {
        title: 'Трассировка с выводом шагов',
        code: `i = 1
s = 0
print(f"{'Шаг':<4} {'i':<4} {'s'}")
while i <= 5:
    s += i
    print(f"{i:<4} {i:<4} {s}")
    i += 1
print(f"Итог: s = {s}")`
      },
      task: {
        xp: 10,
        prompt: 'Пройдите трассировку и запустите код: <pre style="background:var(--surface2);padding:8px;border-radius:6px;font-size:13px">result = 0\nfor i in range(1, 6):\n    if i % 2 != 0:\n        result += i\nprint(result)</pre>Ожидаемый ответ: <em>9</em> (сумма нечётных 1+3+5).',
        starterCode: `# ваш код здесь
`,
        solution: `result = 0\nfor i in range(1, 6):\n    if i % 2 != 0:\n        result += i\nprint(result)`,
        hint: 'Перепечатайте код из условия. Нечётные числа в range(1,6): 1, 3, 5. Их сумма: 9.',
        test: (out, code) => out.trim() === '9' && code.includes('for')
      }
    },

    {
      heading: 'Отладочный вывод',
      content: `
<p>Чтобы отследить работу программы, добавляют временные <code>print()</code> для вывода промежуточных значений — это называется «отладочный вывод» (debug print):</p>
<pre><code class="language-python">s = 0
for i in range(1, 4):
    print(f"До: i={i}, s={s}")  # отладка
    s += i
    print(f"После: s={s}")       # отладка
print(f"Итог: {s}")</code></pre>`,
      example: {
        title: 'Трассировка умножения',
        code: `p = 1
for i in range(1, 6):
    p *= i
    print(f"i={i}, p={p}")
print(f"5! = {p}")`
      },
      task: {
        xp: 10,
        prompt: 'Напишите цикл для чисел от 1 до 5, который выводит строку вида <em>«i=1, квадрат=1»</em>. Последняя строка должна быть <em>«i=5, квадрат=25»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `for i in range(1, 6):\n    print(f"i={i}, квадрат={i**2}")`,
        hint: 'Используйте f-строку: <code>print(f"i={i}, квадрат={i**2}")</code>.',
        test: (out, code) => out.trim().endsWith('i=5, квадрат=25') && out.includes('i=1, квадрат=1')
      }
    },

    {
      heading: 'Алгоритм Евклида (НОД)',
      content: `
<p>Наибольший общий делитель (НОД) двух чисел — самый эффективный алгоритм Евклида: на каждом шаге <code>a</code> получает значение <code>b</code>, а <code>b</code> — остаток от <code>a / b</code>. Цикл заканчивается когда <code>b = 0</code>:</p>
<pre><code class="language-python">a, b = 48, 18
while b != 0:
    a, b = b, a % b
print(f"НОД = {a}")</code></pre>`,
      example: {
        title: 'НОД с трассировкой',
        code: `a, b = 56, 98
shag = 1
while b != 0:
    print(f"Шаг {shag}: a={a}, b={b}")
    a, b = b, a % b
    shag += 1
print(f"НОД = {a}")`
      },
      task: {
        xp: 15,
        prompt: 'Реализуйте алгоритм Евклида для <code>a=48</code>, <code>b=18</code>. Выводите каждый шаг и в конце <em>«НОД = 6»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `a = 48\nb = 18\nshag = 1\nwhile b != 0:\n    print(f"Шаг {shag}: a={a}, b={b}")\n    a, b = b, a % b\n    shag += 1\nprint(f"НОД = {a}")`,
        hint: 'Ключевая строка: <code>a, b = b, a % b</code> — одновременное присваивание.',
        test: (out, code) => out.includes('НОД = 6') && code.includes('while')
      }
    },

    {
      heading: 'Практика: сумма цифр числа',
      content: `<p>Классический алгоритм с трассировкой: разбить число на цифры через остаток от деления на 10.</p>`,
      example: {
        title: 'Цифры числа',
        code: `n = 1234
while n > 0:
    cifra = n % 10
    print(f"Цифра: {cifra}, n до: {n}")
    n //= 10`
      },
      task: {
        xp: 20,
        practice: true,
        prompt: 'Дано число <code>n = 12345</code>. Вычислите сумму его цифр и выведите результат. Ожидаемый ответ: <em>15</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `n = 12345\ns = 0\nwhile n > 0:\n    s += n % 10\n    n //= 10\nprint(s)`,
        hint: '<code>n % 10</code> даёт последнюю цифру, <code>n //= 10</code> убирает её. Повторяй пока <code>n > 0</code>.',
        test: (out, code) => out.trim() === '15' && code.includes('while')
      }
    }
  ]
};
