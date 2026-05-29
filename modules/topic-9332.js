export default {
  id: 'topic-9332',
  code: '9.3.3.2',
  title: 'Программы с двумерными массивами',
  layout: 'single',

  sections: [
    {
      heading: 'Матрица — список списков',
      content: `
<p>Двумерный массив (матрица) в Python — это список, элементы которого сами являются списками. Доступ к элементу: <code>matrix[строка][столбец]</code>, оба индекса с нуля:</p>
<pre><code class="language-python">m = [
    [1, 2, 3],   # строка 0
    [4, 5, 6],   # строка 1
    [7, 8, 9]    # строка 2
]
print(m[0][0])  # 1 — левый верхний
print(m[1][2])  # 6 — строка 1, столбец 2
print(m[2][2])  # 9 — правый нижний</code></pre>`,
      example: {
        title: 'Вывод матрицы',
        code: `m = [[1,2,3],[4,5,6],[7,8,9]]

for row in m:
    print(' '.join(f"{x:3}" for x in row))
print()
print(f"Сумма: {sum(sum(row) for row in m)}")
print(f"Макс: {max(max(row) for row in m)}")`
      },
      task: {
        xp: 10,
        prompt: 'Дана матрица <code>m = [[1,2,3],[4,5,6],[7,8,9]]</code>. Найдите сумму элементов главной диагонали (m[0][0]+m[1][1]+m[2][2]). Ожидаемый ответ: <em>15</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `m = [[1,2,3],[4,5,6],[7,8,9]]\ns = 0\nfor i in range(len(m)):\n    s += m[i][i]\nprint(s)`,
        hint: 'Главная диагональ: элементы где строка == столбец. Общая запись: <code>m[i][i]</code>.',
        test: (out, code) => out.trim() === '15'
      }
    },

    {
      heading: 'Обход матрицы двойным циклом',
      content: `
<pre><code class="language-python">m = [[1,2,3],[4,5,6],[7,8,9]]

# Обход всех элементов
for i in range(len(m)):
    for j in range(len(m[0])):
        print(m[i][j], end=" ")
    print()  # перенос строки

# Сумма всех элементов
s = 0
for i in range(len(m)):
    for j in range(len(m[0])):
        s += m[i][j]</code></pre>`,
      example: {
        title: 'Сумма строк и столбцов',
        code: `m = [[5,3,8],[1,9,2],[7,4,6]]
for i in range(len(m)):
    print(f"Строка {i+1}: {sum(m[i])}")
print()
for j in range(len(m[0])):
    s = sum(m[i][j] for i in range(len(m)))
    print(f"Столбец {j+1}: {s}")`
      },
      task: {
        xp: 10,
        prompt: 'Дана матрица <code>m = [[3,7,1],[9,2,8],[4,6,5]]</code>. Найдите максимальный элемент всей матрицы. Ожидаемый ответ: <em>9</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `m = [[3,7,1],[9,2,8],[4,6,5]]\nMax = m[0][0]\nfor row in m:\n    for elem in row:\n        if elem > Max:\n            Max = elem\nprint(Max)`,
        hint: 'Начни с <code>Max = m[0][0]</code>. Двойным циклом перебирай все элементы, обновляй Max.',
        test: (out, code) => out.trim() === '9'
      }
    },

    {
      heading: 'Создание матрицы',
      content: `
<pre><code class="language-python">import random

rows, cols = 3, 3
m = []
for i in range(rows):
    row = []
    for j in range(cols):
        row.append(random.randint(1, 9))
    m.append(row)</code></pre>
<div class="warn"><strong>Ошибка:</strong> <code>[[0]*3]*3</code> создаёт три ссылки на ОДНУ строку. Правильно: <code>[[0]*3 for _ in range(3)]</code></div>`,
      example: {
        title: 'Случайная матрица',
        code: `import random
rows, cols = 3, 4
m = [[random.randint(1,9) for j in range(cols)] for i in range(rows)]

for row in m:
    print(' '.join(f"{x:3}" for x in row))
print(f"\nМакс: {max(max(row) for row in m)}")`
      },
      task: {
        xp: 15,
        prompt: 'Транспонируйте матрицу <code>a = [[1,2,3],[4,5,6]]</code> (2×3 → 3×2). Выведите первую строку транспонированной матрицы. Ожидаемый вывод: <em>[1, 4]</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `a = [[1,2,3],[4,5,6]]\nrows = len(a)\ncols = len(a[0])\nt = [[0]*rows for _ in range(cols)]\nfor i in range(rows):\n    for j in range(cols):\n        t[j][i] = a[i][j]\nprint(t[0])`,
        hint: 'Элемент <code>a[i][j]</code> переходит в <code>t[j][i]</code>. Транспонированная матрица: размер <code>cols × rows</code>.',
        test: (out, code) => out.trim() === '[1, 4]'
      }
    },

    {
      heading: 'Практика: подсчёт отрицательных',
      content: `<p>Обход матрицы с условием — частая задача.</p>`,
      task: {
        xp: 20,
        practice: true,
        prompt: 'Дана матрица <code>a = [[-1,2,3],[4,-5,6],[7,8,-9]]</code>. Подсчитайте количество отрицательных элементов. Ожидаемый ответ: <em>3</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `a = [[-1,2,3],[4,-5,6],[7,8,-9]]\ncount = 0\nfor row in a:\n    for x in row:\n        if x < 0:\n            count += 1\nprint(count)`,
        hint: 'Двойной цикл: для каждой строки, для каждого элемента проверяй <code>if x < 0</code>.',
        test: (out, code) => out.trim() === '3' && code.includes('for') && code.includes('if')
      }
    },

    {
      heading: 'Практика: сумма диагоналей',
      content: `<p>Главная диагональ: <code>i == j</code>. Побочная диагональ: <code>i + j == n-1</code>.</p>`,
      task: {
        xp: 25,
        practice: true,
        prompt: 'Дана матрица <code>a = [[1,6,8],[4,5,6],[1,8,9]]</code>. Найдите сумму элементов ОБЕИХ диагоналей (центральный элемент не дублировать). Ожидаемый ответ: <em>34</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `a = [[1,6,8],[4,5,6],[1,8,9]]\nn = len(a)\ns = 0\nfor i in range(n):\n    for j in range(n):\n        if i == j or i + j == n - 1:\n            s += a[i][j]\n            if i == j and i + j == n - 1:\n                s -= a[i][j]  # центр не дублировать\nprint(s)`,
        hint: 'Главная: <code>i == j</code>. Побочная: <code>i + j == n - 1</code>. Если оба условия — центральный элемент, вычти его один раз.',
        test: (out, code) => out.trim() === '34' && code.includes('for')
      }
    }
  ]
};
