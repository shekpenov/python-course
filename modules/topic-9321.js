export default {
  id: 'topic-9321',
  code: '9.3.2.1',
  title: 'Алгоритмы сортировки в Python',

  theory: `
<h2>Зачем сортировать данные?</h2>
<p>Сортировка — одна из фундаментальных операций в программировании. Отсортированные данные значительно упрощают поиск, облегчают обработку и улучшают читаемость. Python предоставляет встроенные функции <code>sorted()</code> и метод <code>list.sort()</code>, но понимание алгоритмов сортировки необходимо каждому программисту.</p>

<h2>Сортировка пузырьком (Bubble Sort)</h2>
<p>Идея: несколько раз проходим по списку и сравниваем соседние элементы. Если они стоят в неправильном порядке — меняем их местами. Самый большой элемент «всплывает» на последнее место, как пузырёк.</p>
<pre><code class="language-python">def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):          # n-1 проходов
        for j in range(n - 1 - i):  # с каждым проходом меньше сравнений
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # обмен
    return arr</code></pre>
<p>Сложность: O(n²) — для каждого из n элементов делается до n сравнений. Подходит для небольших массивов.</p>

<h2>Сортировка выбором (Selection Sort)</h2>
<p>Идея: находим наименьший элемент в неотсортированной части и ставим его на правильное место.</p>
<pre><code class="language-python">def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr</code></pre>

<div class="tip"><strong>Встроенная сортировка Python:</strong> <code>sorted(список)</code> — возвращает новый список; <code>список.sort()</code> — сортирует на месте. Оба принимают параметр <code>reverse=True</code> для сортировки по убыванию.</div>
`,

  examples: [
    {
      title: 'Пример 1: Сортировка пузырьком с визуализацией шагов',
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        print(f"Проход {i + 1}: {arr}")
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"До сортировки:  {numbers}")
bubble_sort(numbers)
print(f"После сортировки: {numbers}")`
    },
    {
      title: 'Пример 2: Сравнение алгоритмов и встроенной сортировки',
      code: `import time

def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

original = [5, 3, 8, 1, 9, 2, 7, 4, 6]
print(f"Исходный список: {original}")

arr1 = original[:]
selection_sort(arr1)
print(f"Selection Sort:  {arr1}")

arr2 = original[:]
arr2.sort()
print(f"Встроенный sort: {arr2}")

# Сортировка строк
names = ["Берик", "Айгерим", "Данияр", "Алия"]
print(f"Имена до: {names}")
names.sort()
print(f"Имена после: {names}")`
    }
  ],

  tasks: [
    {
      prompt: 'Реализуйте алгоритм сортировки пузырьком для списка <code>[9, 3, 7, 1, 5]</code>. Выведите отсортированный список. Ожидаемый вывод: <em>[1, 3, 5, 7, 9]</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        for j in range(n-1-i):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\nnumbers = [9, 3, 7, 1, 5]\nprint(bubble_sort(numbers))`,
      hint: 'Структура функции уже готова. Обмен элементов — это строка вида <code>arr[j], arr[j+1] = arr[j+1], arr[j]</code>. Внешний цикл отвечает за количество проходов, внутренний — за сравнение соседей.',
      test: (out, code) => out.trim() === '[1, 3, 5, 7, 9]' && code.includes('def')
    },
    {
      prompt: 'Подсчитайте количество перестановок (swap) при сортировке пузырьком списка <code>[5, 4, 3, 2, 1]</code>. Выведите только это число. Ожидаемый ответ: <em>10</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `arr = [5, 4, 3, 2, 1]\nswaps = 0\nn = len(arr)\nfor i in range(n-1):\n    for j in range(n-1-i):\n        if arr[j] > arr[j+1]:\n            arr[j], arr[j+1] = arr[j+1], arr[j]\n            swaps += 1\nprint(swaps)`,
      hint: 'Код почти готов. Увеличение счётчика <code>swaps += 1</code> уже стоит в нужном месте — сразу после обмена. Просто запустите и убедитесь, что счётчик сбрасывается до нуля.',
      test: (out, code) => out.trim() === '10' && code.includes('for')
    },
    {
      prompt: 'Отсортируйте список строк <code>["банан", "яблоко", "апельсин", "вишня", "груша"]</code> по алфавиту (встроенным методом), выведите результат. Ожидаемый вывод: <em>[\'апельсин\', \'банан\', \'вишня\', \'груша\', \'яблоко\']</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `fruits = ["банан", "яблоко", "апельсин", "вишня", "груша"]\nfruits.sort()\nprint(fruits)`,
      hint: 'Метод <code>.sort()</code> сортирует список на месте (изменяет его). Для строк сортировка идёт по алфавиту. Код уже почти готов — уберите лишний комментарий и запустите.',
      test: (out, code) => {
        const s = out.trim();
        return s.includes('апельсин') && s.includes('яблоко') && s.startsWith('[') && s.indexOf('апельсин') < s.indexOf('банан');
      }
    }
  ]
};
