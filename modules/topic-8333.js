export default {
  id: 'topic-8333',
  code: '8.3.3.3',
  title: 'Управление циклами: break, continue, else',
  layout: 'single',

  sections: [
    {
      heading: 'break — досрочный выход',
      content: `
<p><code>break</code> немедленно прерывает цикл. Используется когда нашли нужное — больше нет смысла продолжать.</p>
<pre><code class="language-python">for i in range(10):
    if i == 5:
        break       # выходим при i=5
    print(i)
# Выведет: 0 1 2 3 4</code></pre>
<div class="tip">После <code>break</code> выполнение продолжается с первой строки <em>после</em> цикла.</div>`,
      example: {
        title: 'Первое чётное в списке',
        code: `nums = [7, 3, 9, 4, 11, 6]
for n in nums:
    if n % 2 == 0:
        print(f"Первое чётное: {n}")
        break`
      },
      task: {
        xp: 10,
        prompt: 'Дан список <code>nums = [12, 5, 8, 3, 17, 2, 9]</code>. Найдите первое число больше 10 и выведите его. Ожидаемый ответ: <em>12</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `nums = [12, 5, 8, 3, 17, 2, 9]\nfor n in nums:\n    if n > 10:\n        print(n)\n        break`,
        hint: 'Внутри цикла: если <code>n > 10</code> — выводи и сразу <code>break</code>.',
        test: (out, code) => out.trim() === '12' && code.includes('break')
      }
    },

    {
      heading: 'continue — пропустить итерацию',
      content: `
<p><code>continue</code> пропускает оставшуюся часть текущей итерации и переходит к следующей. Используется когда нужно пропустить некоторые элементы.</p>
<pre><code class="language-python">for i in range(10):
    if i % 2 == 0:
        continue    # пропускаем чётные
    print(i)
# Выведет: 1 3 5 7 9</code></pre>`,
      example: {
        title: 'Только нечётные',
        code: `for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i, end=" ")
# 1 3 5 7 9`
      },
      task: {
        xp: 10,
        prompt: 'Выведите числа от 1 до 15, которые <strong>не кратны 3</strong>, через пробел в одну строку. Используйте <code>continue</code>. Ожидаемый вывод: <em>1 2 4 5 7 8 10 11 13 14</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `result = []\nfor i in range(1, 16):\n    if i % 3 == 0:\n        continue\n    result.append(str(i))\nprint(' '.join(result))`,
        hint: 'Если <code>i % 3 == 0</code> — пропускай через <code>continue</code>. Остальные добавляй в список и выводи через <code>join</code>.',
        test: (out, code) => out.trim() === '1 2 4 5 7 8 10 11 13 14' && code.includes('continue')
      }
    },

    {
      heading: 'else у цикла',
      content: `
<p>Блок <code>else</code> после цикла выполняется только если цикл завершился <strong>нормально</strong> (без <code>break</code>). Идеально для алгоритмов поиска:</p>
<pre><code class="language-python">for n in [1, 3, 5, 7]:
    if n == 4:
        print("Нашли 4")
        break
else:
    print("4 не найдено")  # выполнится — break не сработал</code></pre>`,
      example: {
        title: 'Поиск простого числа',
        code: `n = 17
for i in range(2, n):
    if n % i == 0:
        print(f"{n} составное")
        break
else:
    print(f"{n} простое")`
      },
      task: {
        xp: 15,
        prompt: 'Дан список <code>data = [4, 7, 2, 8, 1, 5]</code>. Используя <code>break</code> и <code>else</code>, проверьте есть ли число 8. Выведи <em>«Найдено: 8»</em> или <em>«Не найдено»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `data = [4, 7, 2, 8, 1, 5]\nfor x in data:\n    if x == 8:\n        print("Найдено: 8")\n        break\nelse:\n    print("Не найдено")`,
        hint: '<code>else</code> у цикла пишется на уровне <code>for</code>, не внутри. Выполняется только если <code>break</code> не сработал.',
        test: (out, code) => out.trim() === 'Найдено: 8' && code.includes('break')
      }
    },

    {
      heading: 'Практика: поиск первого числа',
      content: `<p>Скомбинируй <code>break</code> и <code>continue</code> для фильтрации и поиска.</p>`,
      task: {
        xp: 20,
        practice: true,
        prompt: 'Используя цикл <code>for</code> и <code>break</code>, найдите первое число от 1 до 100, которое одновременно делится на 7 и на 11. Выведите это число. Ожидаемый ответ: <em>77</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `for i in range(1, 101):\n    if i % 7 == 0 and i % 11 == 0:\n        print(i)\n        break`,
        hint: 'Условие: <code>i % 7 == 0 and i % 11 == 0</code>. После вывода — <code>break</code>.',
        test: (out, code) => out.trim() === '77' && code.includes('break')
      }
    },

    {
      heading: 'Практика: подсчёт уникальных',
      content: `<p>Использование <code>continue</code> для пропуска дубликатов.</p>`,
      task: {
        xp: 25,
        practice: true,
        prompt: 'Дан список <code>nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]</code>. Выведите каждое число <strong>по одному разу</strong>, через пробел, используя <code>continue</code> для пропуска повторов. Ожидаемый вывод: <em>1 2 3 4</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nseen = []\nfor n in nums:\n    if n in seen:\n        continue\n    seen.append(n)\nresult = ' '.join(str(x) for x in seen)\nprint(result)`,
        hint: 'Заведи список <code>seen = []</code>. Если число уже в seen — <code>continue</code>. Иначе добавляй в seen.',
        test: (out, code) => out.trim() === '1 2 3 4' && code.includes('continue')
      }
    }
  ]
};
