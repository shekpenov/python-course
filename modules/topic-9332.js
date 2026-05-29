export default {
  id: 'topic-9332',
  code: '9.3.3.2',
  title: 'Программы с двумерными массивами',

  theory: `
<h2>Двумерные массивы (матрицы)</h2>
<p>Двумерный массив (матрица) представляется в Python как <strong>список списков</strong> — каждый вложенный список является строкой матрицы. Доступ к элементу осуществляется по двум индексам: <code>matrix[строка][столбец]</code>, оба начинаются с нуля.</p>
<pre><code class="language-python">matrix = [
    [1, 2, 3],   # строка 0
    [4, 5, 6],   # строка 1
    [7, 8, 9]    # строка 2
]

print(matrix[0][0])  # 1 — левый верхний
print(matrix[1][2])  # 6 — строка 1, столбец 2
print(matrix[2][2])  # 9 — правый нижний</code></pre>

<h2>Создание матриц</h2>
<pre><code class="language-python"># Матрица 3×3 из нулей
rows, cols = 3, 3
m = [[0] * cols for _ in range(rows)]

# Единичная матрица
n = 3
identity = [[1 if i == j else 0 for j in range(n)] for i in range(n)]</code></pre>

<h2>Обход матрицы</h2>
<pre><code class="language-python">matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Проход по всем элементам
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"[{i}][{j}] = {matrix[i][j]}")

# Удобный вывод матрицы
for row in matrix:
    print(' '.join(f"{x:3}" for x in row))</code></pre>

<div class="tip"><strong>Внимание при создании:</strong> не используйте <code>[[0]*3]*3</code> — это создаст три ссылки на одну и ту же строку. Правильно: <code>[[0]*3 for _ in range(3)]</code>.</div>
`,

  examples: [
    {
      title: 'Пример 1: Красивый вывод матрицы и её характеристики',
      code: `matrix = [
    [5, 3, 8],
    [1, 9, 2],
    [7, 4, 6]
]

print("Матрица:")
for row in matrix:
    print(' '.join(f"{x:3}" for x in row))

# Сумма всех элементов
total = sum(sum(row) for row in matrix)
print(f"\\nСумма всех элементов: {total}")

# Максимальный элемент
max_val = max(max(row) for row in matrix)
print(f"Максимальный элемент: {max_val}")

# Суммы строк
print("\\nСуммы строк:")
for i, row in enumerate(matrix):
    print(f"  Строка {i}: {sum(row)}")`
    },
    {
      title: 'Пример 2: Транспонирование матрицы',
      code: `original = [
    [1, 2, 3],
    [4, 5, 6]
]

rows = len(original)
cols = len(original[0])

# Транспонирование: строки становятся столбцами
transposed = [[0] * rows for _ in range(cols)]
for i in range(rows):
    for j in range(cols):
        transposed[j][i] = original[i][j]

print("Исходная матрица (2×3):")
for row in original:
    print(' '.join(f"{x:3}" for x in row))

print("\\nТранспонированная (3×2):")
for row in transposed:
    print(' '.join(f"{x:3}" for x in row))`
    }
  ],

  tasks: [
    {
      prompt: 'Дана матрица <code>m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</code>. Найдите сумму элементов главной диагонали (1+5+9). Выведите результат. Ожидаемый ответ: <em>15</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `m = [[1,2,3],[4,5,6],[7,8,9]]\ndiagonal_sum = 0\nfor i in range(len(m)):\n    diagonal_sum += m[i][i]\nprint(diagonal_sum)`,
      hint: 'Главная диагональ — это элементы, у которых номер строки равен номеру столбца: <code>m[0][0]</code>, <code>m[1][1]</code>, <code>m[2][2]</code>. Общая запись: <code>m[i][i]</code>. Код уже написан — запустите и проверьте.',
      test: (out, code) => out.trim() === '15'
    },
    {
      prompt: 'Дана матрица <code>m = [[3, 7, 1], [9, 2, 8], [4, 6, 5]]</code>. Найдите максимальный элемент всей матрицы. Выведите его значение. Ожидаемый ответ: <em>9</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `m = [[3,7,1],[9,2,8],[4,6,5]]\nmax_val = m[0][0]\nfor row in m:\n    for elem in row:\n        if elem > max_val:\n            max_val = elem\nprint(max_val)`,
      hint: 'Начните с <code>max_val = m[0][0]</code> (первый элемент как начальный максимум). Двойным циклом перебирайте все строки и все элементы в каждой строке, обновляя максимум при нахождении большего. Код уже готов — запустите.',
      test: (out, code) => out.trim() === '9'
    },
    {
      prompt: 'Транспонируйте матрицу <code>a = [[1, 2, 3], [4, 5, 6]]</code> (размер 2×3 → 3×2). Выведите первую строку транспонированной матрицы. Ожидаемый вывод: <em>[1, 4]</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `a = [[1,2,3],[4,5,6]]\nrows = len(a)\ncols = len(a[0])\ntransposed = [[0]*rows for _ in range(cols)]\nfor i in range(rows):\n    for j in range(cols):\n        transposed[j][i] = a[i][j]\nprint(transposed[0])`,
      hint: 'При транспонировании элемент из позиции <code>[i][j]</code> оригинала перемещается в позицию <code>[j][i]</code> результата. Обратите внимание: размер транспонированной матрицы — <code>cols × rows</code>, а не наоборот.',
      test: (out, code) => out.trim() === '[1, 4]'
    }
  ]
};
