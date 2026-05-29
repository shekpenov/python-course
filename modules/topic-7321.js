export default {
  id: 'topic-7321',
  code: '7.3.2.1',
  title: 'Ветвящиеся алгоритмы в Python',

  theory: `
<h2>Что такое ветвящийся алгоритм?</h2>
<p>Ветвящийся алгоритм — это алгоритм, в котором в зависимости от выполнения некоторого условия выполняется та или иная последовательность действий. В реальной жизни мы постоянно принимаем решения: «Если идёт дождь — взять зонт, иначе — идти без зонта». В Python для записи ветвлений используется конструкция <code>if</code> / <code>elif</code> / <code>else</code>.</p>

<h2>Синтаксис условного оператора</h2>
<p>Базовая форма условного оператора:</p>
<pre><code class="language-python">if условие:
    # блок выполняется, если условие истинно (True)
elif другое_условие:
    # выполняется, если первое условие ложно, а это — истинно
else:
    # выполняется, если все условия выше ложны</code></pre>
<p>Важно помнить о <strong>отступе</strong> (4 пробела или Tab): тело ветки всегда пишется с отступом. Python определяет принадлежность строк к ветке именно по отступу. Ветки <code>elif</code> и <code>else</code> необязательны — вы можете использовать только <code>if</code>.</p>

<h2>Операторы сравнения</h2>
<table>
  <tr><th>Оператор</th><th>Значение</th><th>Пример</th></tr>
  <tr><td><code>==</code></td><td>равно</td><td><code>x == 5</code></td></tr>
  <tr><td><code>!=</code></td><td>не равно</td><td><code>x != 0</code></td></tr>
  <tr><td><code>&gt;</code></td><td>больше</td><td><code>x &gt; 10</code></td></tr>
  <tr><td><code>&lt;</code></td><td>меньше</td><td><code>x &lt; 0</code></td></tr>
  <tr><td><code>&gt;=</code></td><td>больше или равно</td><td><code>x &gt;= 18</code></td></tr>
  <tr><td><code>&lt;=</code></td><td>меньше или равно</td><td><code>x &lt;= 100</code></td></tr>
</table>

<div class="tip"><strong>Совет:</strong> не путайте <code>=</code> (присваивание) и <code>==</code> (сравнение). Ошибка <code>if x = 5:</code> вызовет синтаксическую ошибку.</div>
`,

  examples: [
    {
      title: 'Пример 1: Определить знак числа',
      code: `x = -7

if x > 0:
    print("Число положительное")
elif x < 0:
    print("Число отрицательное")
else:
    print("Число равно нулю")`
    },
    {
      title: 'Пример 2: Классификация оценки',
      code: `ocenka = 75

if ocenka >= 90:
    print("Оценка: Отлично (A)")
elif ocenka >= 75:
    print("Оценка: Хорошо (B)")
elif ocenka >= 60:
    print("Оценка: Удовлетворительно (C)")
elif ocenka >= 50:
    print("Оценка: Почти (D)")
else:
    print("Оценка: Неудовлетворительно (F)")

print(f"Ваш балл: {ocenka}")`
    }
  ],

  tasks: [
    {
      prompt: 'Дано число <code>n = 14</code>. Определите, чётное оно или нечётное, и выведите соответствующее сообщение: <em>«Чётное»</em> или <em>«Нечётное»</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `n = 14\nif n % 2 == 0:\n    print("Чётное")\nelse:\n    print("Нечётное")`,
      hint: 'Используйте оператор <code>%</code> (остаток от деления). Если <code>n % 2 == 0</code> — число чётное, иначе — нечётное.',
      test: (out, code) => out.trim() === 'Чётное' && code.includes('if')
    },
    {
      prompt: 'Даны три числа <code>a = 8</code>, <code>b = 3</code>, <code>c = 11</code>. Найдите и выведите наибольшее из них.',
      starterCode: `# ваш код здесь
`,
      solution: `a = 8\nb = 3\nc = 11\nif a >= b and a >= c:\n    print(a)\nelif b >= a and b >= c:\n    print(b)\nelse:\n    print(c)`,
      hint: 'Для проверки «a наибольшее» нужно убедиться, что <code>a >= b</code> И <code>a >= c</code> одновременно — используйте <code>and</code>. Проверьте каждую переменную через отдельную ветку <code>if / elif / else</code>.',
      test: (out, code) => out.trim() === '11' && (code.includes('if') || code.includes('max('))
    },
    {
      prompt: 'Дана температура воздуха <code>temp = 18</code> (в °C). Выведите рекомендацию: если меньше 0 — <em>«Наденьте шубу»</em>, если 0–14 — <em>«Возьмите куртку»</em>, если 15–24 — <em>«Лёгкая одежда»</em>, если 25 и выше — <em>«Жарко!»</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `temp = 18\nif temp < 0:\n    print("Наденьте шубу")\nelif temp <= 14:\n    print("Возьмите куртку")\nelif temp <= 24:\n    print("Лёгкая одежда")\nelse:\n    print("Жарко!")`,
      hint: 'Используйте цепочку <code>if / elif / elif / else</code>. Условия проверяются по порядку сверху вниз — Python входит в первую подходящую ветку. Начните с самого холодного диапазона (<code>temp &lt; 0</code>).',
      test: (out, code) => out.trim() === 'Лёгкая одежда' && code.includes('if')
    }
  ]
};
