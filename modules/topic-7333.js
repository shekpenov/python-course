export default {
  id: 'topic-7333',
  code: '7.3.3.3',
  title: 'Составные условия в Python',
  layout: 'single',

  sections: [
    {
      heading: 'and — оба должны быть истинны',
      content: `
<p>Оператор <code>and</code> объединяет два условия: результат <code>True</code> только если <em>оба</em> условия истинны.</p>
<pre><code class="language-python">True  and True   # True
True  and False  # False
False and True   # False</code></pre>
<pre><code class="language-python">vozrast = 20
student = True
if vozrast < 26 and student:
    print("Скидка есть")  # оба условия истинны</code></pre>`,
      example: {
        title: 'Проверка диапазона',
        code: `n = 7
if n >= 1 and n <= 10:
    print("Число в диапазоне 1–10")
else:
    print("Вне диапазона")

# Краткая запись:
if 1 <= n <= 10:
    print("Тоже работает!")`
      },
      task: {
        xp: 10,
        prompt: 'Дано <code>n = 15</code>. Проверьте делится ли оно на 3 <strong>и</strong> на 5 одновременно. Выведите <em>«Делится на 3 и на 5»</em> или <em>«Не выполняется»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `n = 15\nif n % 3 == 0 and n % 5 == 0:\n    print("Делится на 3 и на 5")\nelse:\n    print("Не выполняется")`,
        hint: 'Два условия через <code>and</code>: <code>n % 3 == 0 and n % 5 == 0</code>.',
        test: (out, code) => out.trim() === 'Делится на 3 и на 5' && code.includes('if')
      }
    },

    {
      heading: 'or и not',
      content: `
<p><code>or</code> — истинно, если <em>хотя бы одно</em> условие истинно:</p>
<pre><code class="language-python">True  or False  # True
False or False  # False</code></pre>
<p><code>not</code> — инвертирует значение:</p>
<pre><code class="language-python">not True   # False
not False  # True</code></pre>
<p><strong>Приоритет:</strong> сначала <code>not</code>, потом <code>and</code>, потом <code>or</code>. Используй скобки для ясности.</p>`,
      example: {
        title: 'Выходной день',
        code: `den = "суббота"
if den == "суббота" or den == "воскресенье":
    print("Выходной!")
else:
    print("Рабочий день")`
      },
      task: {
        xp: 10,
        prompt: 'Дан <code>x = 7</code>. Выведите <em>«Подходит»</em>, если число от 5 до 15 включительно, но <strong>не равно 10</strong>. Иначе <em>«Не подходит»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `x = 7\nif 5 <= x <= 15 and x != 10:\n    print("Подходит")\nelse:\n    print("Не подходит")`,
        hint: 'Диапазон: <code>5 &lt;= x &lt;= 15</code>. Добавь через <code>and</code> исключение: <code>x != 10</code>.',
        test: (out, code) => out.trim() === 'Подходит' && code.includes('if')
      }
    },

    {
      heading: 'Практика: рекомендация к награде',
      content: `<p>Составные условия заменяют вложенные if и делают код чище.</p>`,
      example: {
        title: 'Вход в систему',
        code: `login = "admin"
password = "qwerty"
if login == "admin" and password == "qwerty":
    print("Добро пожаловать!")
else:
    print("Неверные данные")`
      },
      task: {
        xp: 20,
        practice: true,
        prompt: 'Дан <code>ball = 87</code> и <code>horosho_vedet = True</code>. Выведи <em>«Рекомендован к награде»</em>, если балл >= 85 И хорошо ведёт себя. Иначе — <em>«Не рекомендован»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `ball = 87\nhorosho_vedet = True\nif ball >= 85 and horosho_vedet:\n    print("Рекомендован к награде")\nelse:\n    print("Не рекомендован")`,
        hint: '<code>ball >= 85 and horosho_vedet</code> — флаг bool используется напрямую без == True.',
        test: (out, code) => out.trim() === 'Рекомендован к награде' && code.includes('if')
      }
    },

    {
      heading: 'Практика: високосный год',
      content: `<p>Год високосный если: делится на 4, но <strong>не</strong> на 100 — <strong>или</strong> делится на 400.</p>`,
      task: {
        xp: 25,
        practice: true,
        prompt: 'Дан год <code>god = 2024</code>. Определите, високосный ли он. Ожидаемый ответ: <em>«2024 — високосный»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `god = 2024\nif (god % 4 == 0 and god % 100 != 0) or god % 400 == 0:\n    print(f"{god} — високосный")\nelse:\n    print(f"{god} — обычный")`,
        hint: 'Формула: <code>(god % 4 == 0 and god % 100 != 0) or god % 400 == 0</code>. Скобки важны!',
        test: (out, code) => out.trim() === '2024 — високосный' && code.includes('if')
      }
    }
  ]
};
