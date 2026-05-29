export default {
  id: 'topic-7332',
  code: '7.3.3.2',
  title: 'Вложенные условия в Python',
  layout: 'single',

  sections: [
    {
      heading: 'if внутри if',
      content: `
<p>Вложенные условия — это когда один <code>if</code> находится <em>внутри</em> другого. Внутренняя проверка выполняется только тогда, когда внешняя оказалась истинной.</p>
<pre><code class="language-python">if внешнее:
    # это выполняется только при внешнем True
    if внутреннее:
        print("Оба условия истинны")
    else:
        print("Внешнее — да, внутреннее — нет")
else:
    print("Внешнее ложно")</code></pre>
<div class="warn">Каждый уровень вложенности добавляет отступ в 4 пробела. Следи за отступами!</div>`,
      example: {
        title: 'Положительное и чётное',
        code: `x = 6
if x > 0:
    print("Положительное")
    if x % 2 == 0:
        print("И чётное")
    else:
        print("И нечётное")
else:
    print("Неположительное")`
      },
      task: {
        xp: 10,
        prompt: 'Дано <code>x = 15</code>. Если положительное — проверь чётность. Выведи <em>«Положительное чётное»</em>, <em>«Положительное нечётное»</em> или <em>«Неположительное»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `x = 15\nif x > 0:\n    if x % 2 == 0:\n        print("Положительное чётное")\n    else:\n        print("Положительное нечётное")\nelse:\n    print("Неположительное")`,
        hint: 'Внешний if: <code>x &gt; 0</code>. Внутри него — ещё один if для проверки чётности через <code>x % 2 == 0</code>.',
        test: (out, code) => out.trim() === 'Положительное нечётное' && code.includes('if')
      }
    },

    {
      heading: 'Когда нужна вложенность',
      content: `
<p>Вложенные условия используют когда вторая проверка <em>имеет смысл только при выполнении первой</em>. Например: скидка студентам — но только если возраст подходит:</p>
<pre><code class="language-python">vozrast = 20
student = True

if vozrast < 26:
    if student:
        print("Скидка 20%")
    else:
        print("Скидка 10%")
else:
    print("Скидки нет")</code></pre>
<div class="tip">Переменная-флаг типа <code>bool</code> используется в условии напрямую: <code>if student:</code> — это то же самое, что <code>if student == True:</code></div>`,
      example: {
        title: 'Цена билета',
        code: `vozrast = 14
den = "суббота"

if vozrast < 18:
    if den == "суббота":
        print("200 тенге (детский, выходной)")
    else:
        print("150 тенге (детский, будний)")
else:
    if den == "суббота":
        print("500 тенге (взрослый, выходной)")
    else:
        print("350 тенге (взрослый, будний)")`
      },
      task: {
        xp: 10,
        prompt: 'Дано <code>vozrast = 20</code>, <code>student = True</code>. Если возраст < 26: студентам — <em>«Скидка: 20%»</em>, остальным — <em>«Скидка: 10%»</em>. Иначе — <em>«Скидка: 0%»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `vozrast = 20\nstudent = True\nif vozrast < 26:\n    if student:\n        print("Скидка: 20%")\n    else:\n        print("Скидка: 10%")\nelse:\n    print("Скидка: 0%")`,
        hint: 'Внешнее условие: <code>vozrast &lt; 26</code>. Внутри: <code>if student:</code> (без == True).',
        test: (out, code) => out.trim() === 'Скидка: 20%' && code.includes('if')
      }
    },

    {
      heading: 'Практика: делимость с вложением',
      content: `<p>Вложенные условия хорошо работают для последовательных проверок, где каждая уточняет предыдущую.</p>`,
      example: {
        title: 'Делится ли на 4?',
        code: `n = 12
if n % 2 == 0:
    if n % 4 == 0:
        print("Делится на 4")
    else:
        print("Делится на 2, но не на 4")
else:
    print("Нечётное")`
      },
      task: {
        xp: 20,
        practice: true,
        prompt: 'Дано <code>n = 36</code>. Сначала проверь: делится ли на 6? Если да — проверь делимость на 9. Выведи: <em>«Делится на 6 и на 9»</em>, <em>«Делится только на 6»</em> или <em>«Не делится на 6»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `n = 36\nif n % 6 == 0:\n    if n % 9 == 0:\n        print("Делится на 6 и на 9")\n    else:\n        print("Делится только на 6")\nelse:\n    print("Не делится на 6")`,
        hint: 'Внешний if: <code>n % 6 == 0</code>. Только если это True, внутри пишем второй if: <code>n % 9 == 0</code>.',
        test: (out, code) => out.trim() === 'Делится на 6 и на 9' && code.includes('if')
      }
    },

    {
      heading: 'Практика: система оценивания',
      content: `<p>Сочетай вложенные условия для многоуровневой классификации.</p>`,
      task: {
        xp: 25,
        practice: true,
        prompt: 'Дано <code>ball = 82</code>, <code>poseshaemost = 85</code> (%). Если посещаемость >= 75%: вычисли оценку (90+ Отлично, 70+ Хорошо, иначе Удовл.). Если посещаемость < 75: вывести <em>«Снижено: Хорошо»</em> при ball >= 80, иначе <em>«Снижено: Удовл.»</em>. Первое слово вывода должно быть <em>«Итого:»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `ball = 82\nposeshaemost = 85\nif poseshaemost >= 75:\n    if ball >= 90:\n        print("Итого: Отлично")\n    elif ball >= 70:\n        print("Итого: Хорошо")\n    else:\n        print("Итого: Удовл.")\nelse:\n    if ball >= 80:\n        print("Итого: Снижено: Хорошо")\n    else:\n        print("Итого: Снижено: Удовл.")`,
        hint: 'Внешнее условие — посещаемость. Внутри каждой ветки — условие на балл.',
        test: (out, code) => out.trim().startsWith('Итого:') && out.includes('Хорошо') && code.includes('if')
      }
    }
  ]
};
