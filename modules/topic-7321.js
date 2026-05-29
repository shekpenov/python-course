export default {
  id: 'topic-7321',
  code: '7.3.2.1',
  title: 'Ветвящиеся алгоритмы в Python',
  layout: 'single',

  sections: [
    {
      heading: 'if / else — два пути',
      content: `
<p>Условный оператор <code>if</code> выбирает что выполнить в зависимости от условия. Если условие истинно (<code>True</code>) — выполняется первый блок, иначе (<code>False</code>) — блок <code>else</code>.</p>
<pre><code class="language-python">if условие:
    # выполнится если True
else:
    # выполнится если False</code></pre>
<p><strong>Важно:</strong> Python определяет принадлежность строк к блоку по <em>отступу</em> (4 пробела). Не забывай двоеточие после условия!</p>
<pre><code class="language-python">x = 10
if x > 0:
    print("Положительное")
else:
    print("Не положительное")</code></pre>`,
      example: {
        title: 'Чётное или нечётное',
        code: `n = 7
if n % 2 == 0:
    print("Чётное")
else:
    print("Нечётное")`
      },
      task: {
        xp: 10,
        prompt: 'Дано число <code>n = 14</code>. Проверьте, чётное оно или нечётное, и выведите <em>«Чётное»</em> или <em>«Нечётное»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `n = 14\nif n % 2 == 0:\n    print("Чётное")\nelse:\n    print("Нечётное")`,
        hint: 'Остаток от деления на 2: <code>n % 2</code>. Если равен 0 — чётное.',
        test: (out, code) => out.trim() === 'Чётное' && code.includes('if')
      }
    },

    {
      heading: 'elif — несколько ветвей',
      content: `
<p>Когда вариантов больше двух — используй <code>elif</code> (сокращение от «else if»). Python проверяет условия по порядку и входит в <em>первую</em> подходящую ветку:</p>
<pre><code class="language-python">if условие_1:
    ...
elif условие_2:
    ...
elif условие_3:
    ...
else:
    ...  # если ни одно не подошло</code></pre>`,
      example: {
        title: 'Оценка по баллу',
        code: `ball = 75
if ball >= 90:
    print("Отлично (A)")
elif ball >= 75:
    print("Хорошо (B)")
elif ball >= 60:
    print("Удовлетв. (C)")
else:
    print("Неудовлетв. (F)")`
      },
      task: {
        xp: 10,
        prompt: 'Дана температура <code>temp = 18</code> (°C). Выведите рекомендацию: ниже 0 → <em>«Наденьте шубу»</em>, 0–14 → <em>«Возьмите куртку»</em>, 15–24 → <em>«Лёгкая одежда»</em>, 25+ → <em>«Жарко!»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `temp = 18\nif temp < 0:\n    print("Наденьте шубу")\nelif temp <= 14:\n    print("Возьмите куртку")\nelif temp <= 24:\n    print("Лёгкая одежда")\nelse:\n    print("Жарко!")`,
        hint: 'Начни с самого холодного диапазона <code>temp &lt; 0</code>, потом <code>elif temp &lt;= 14</code> и т.д.',
        test: (out, code) => out.trim() === 'Лёгкая одежда' && code.includes('if')
      }
    },

    {
      heading: 'Операторы сравнения',
      content: `
<table>
  <tr><th>Оператор</th><th>Значение</th><th>Пример</th></tr>
  <tr><td><code>==</code></td><td>равно</td><td><code>x == 5</code></td></tr>
  <tr><td><code>!=</code></td><td>не равно</td><td><code>x != 0</code></td></tr>
  <tr><td><code>&gt;</code></td><td>больше</td><td><code>x &gt; 10</code></td></tr>
  <tr><td><code>&lt;</code></td><td>меньше</td><td><code>x &lt; 0</code></td></tr>
  <tr><td><code>&gt;=</code></td><td>больше или равно</td><td><code>x &gt;= 18</code></td></tr>
  <tr><td><code>&lt;=</code></td><td>меньше или равно</td><td><code>x &lt;= 100</code></td></tr>
</table>
<div class="tip"><strong>Важно:</strong> <code>=</code> — присваивание, <code>==</code> — сравнение. Не путай!</div>`,
      example: {
        title: 'Знак числа',
        code: `x = -7
if x > 0:
    print("Положительное")
elif x < 0:
    print("Отрицательное")
else:
    print("Ноль")`
      },
      task: {
        xp: 10,
        prompt: 'Даны <code>a = 8</code>, <code>b = 3</code>, <code>c = 11</code>. Найдите и выведите наибольшее число. Ожидаемый ответ: <em>11</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `a = 8\nb = 3\nc = 11\nif a >= b and a >= c:\n    print(a)\nelif b >= a and b >= c:\n    print(b)\nelse:\n    print(c)`,
        hint: 'Проверяй каждую переменную: «a наибольшее» значит <code>a >= b and a >= c</code>.',
        test: (out, code) => out.trim() === '11' && (code.includes('if') || code.includes('max('))
      }
    },

    {
      heading: 'Практика: классификация числа',
      content: `<p>Условия позволяют классифицировать данные — разбить на категории по определённым признакам.</p>`,
      example: {
        title: 'Делимость на 3',
        code: `n = 21
if n % 3 == 0:
    print("Делится на 3")
else:
    print("Не делится на 3")`
      },
      task: {
        xp: 20,
        practice: true,
        prompt: 'Дано число <code>n = 75</code>. Используя <code>if/elif/else</code>, выведите оценку: 90–100 → <em>«Отлично»</em>, 75–89 → <em>«Хорошо»</em>, 60–74 → <em>«Удовлетворительно»</em>, ниже 60 → <em>«Неудовлетворительно»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `n = 75\nif n >= 90:\n    print("Отлично")\nelif n >= 75:\n    print("Хорошо")\nelif n >= 60:\n    print("Удовлетворительно")\nelse:\n    print("Неудовлетворительно")`,
        hint: 'Четыре ветки: <code>if / elif / elif / else</code>. Условия проверяются сверху вниз.',
        test: (out, code) => out.trim() === 'Хорошо' && code.includes('if')
      }
    },

    {
      heading: 'Практика: чётное/нечётное с input()',
      content: `<p>Теперь попробуй ввести число самостоятельно через <code>input()</code>. Появится всплывающее окно браузера.</p>`,
      task: {
        xp: 25,
        practice: true,
        prompt: 'Попросите пользователя ввести число через <code>input()</code>. Если чётное — выведите <em>«Чётное»</em>, если нечётное — <em>«Нечётное»</em>. Введите <strong>14</strong> при проверке.',
        starterCode: `# ваш код здесь
`,
        solution: `n = int(input("Введите число: "))\nif n % 2 == 0:\n    print("Чётное")\nelse:\n    print("Нечётное")`,
        hint: 'Считайте число: <code>n = int(input(...))</code>. Затем проверьте остаток от деления на 2.',
        test: (out, code) => out.trim() === 'Чётное' && code.includes('if') && code.includes('input')
      }
    }
  ]
};
