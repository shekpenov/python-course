export default {
  id: 'topic-9321',
  code: '9.3.2.1',
  title: 'Алгоритмы сортировки в Python',
  layout: 'single',

  sections: [
    {
      heading: 'Встроенная сортировка',
      content: `
<p>Python имеет два встроенных инструмента сортировки:</p>
<pre><code class="language-python">lst = [5, 2, 8, 1, 9]

sorted(lst)      # возвращает НОВЫЙ список, исходный не меняется
lst.sort()       # сортирует ИСХОДНЫЙ список

sorted(lst, reverse=True)  # по убыванию
lst.sort(key=len)           # по длине (для строк)</code></pre>`,
      example: {
        title: 'Сортировка чисел и строк',
        code: `nums = [5, 2, 8, 1, 9, 3]
print("До:", nums)
nums.sort()
print("После:", nums)
print("По убыванию:", sorted(nums, reverse=True))

names = ["Берик", "Алия", "Данияр"]
names.sort()
print("Имена:", names)`
      },
      task: {
        xp: 10,
        prompt: 'Дан список <code>fruits = ["банан", "яблоко", "апельсин", "вишня", "груша"]</code>. Отсортируйте и выведите его. Первый элемент должен быть <em>апельсин</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `fruits = ["банан", "яблоко", "апельсин", "вишня", "груша"]\nfruits.sort()\nprint(fruits)`,
        hint: 'Метод <code>.sort()</code> сортирует список по алфавиту на месте.',
        test: (out, code) => {
          const s = out.trim();
          return s.includes('апельсин') && s.startsWith('[') && s.indexOf('апельсин') < s.indexOf('банан');
        }
      }
    },

    {
      heading: 'Сортировка пузырьком',
      content: `
<p>Пузырьковая сортировка — учебный алгоритм. Идея: многократно проходим по массиву и меняем местами соседние элементы если они стоят неправильно. Большие элементы «всплывают» вправо как пузырьки:</p>
<pre><code class="language-python">arr = [5, 3, 8, 1]
n = len(arr)
for i in range(n-1):        # n-1 проходов
    for j in range(n-1-i):  # сравниваем соседей
        if arr[j] > arr[j+1]:
            arr[j], arr[j+1] = arr[j+1], arr[j]</code></pre>`,
      example: {
        title: 'Пузырьковая с визуализацией',
        code: `arr = [64, 34, 25, 12, 22]
n = len(arr)
for i in range(n-1):
    print(f"Проход {i+1}: {arr}")
    for j in range(n-1-i):
        if arr[j] > arr[j+1]:
            arr[j], arr[j+1] = arr[j+1], arr[j]
print("Итог:", arr)`
      },
      task: {
        xp: 15,
        prompt: 'Реализуйте сортировку пузырьком для списка <code>[9, 3, 7, 1, 5]</code>. Выведите отсортированный список. Ожидаемый вывод: <em>[1, 3, 5, 7, 9]</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `arr = [9, 3, 7, 1, 5]\nn = len(arr)\nfor i in range(n-1):\n    for j in range(n-1-i):\n        if arr[j] > arr[j+1]:\n            arr[j], arr[j+1] = arr[j+1], arr[j]\nprint(arr)`,
        hint: 'Двойной цикл: внешний — количество проходов, внутренний — сравнение соседей. Обмен: <code>arr[j], arr[j+1] = arr[j+1], arr[j]</code>.',
        test: (out, code) => out.trim() === '[1, 3, 5, 7, 9]' && code.includes('for')
      }
    },

    {
      heading: 'Практика: подсчёт перестановок',
      content: `<p>Анализ алгоритма: сколько обменов нужно чтобы отсортировать массив?</p>`,
      task: {
        xp: 20,
        practice: true,
        prompt: 'Реализуйте сортировку пузырьком для <code>[5, 4, 3, 2, 1]</code> и подсчитайте количество перестановок. Выведите только число. Ожидаемый ответ: <em>10</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `arr = [5, 4, 3, 2, 1]\nswaps = 0\nn = len(arr)\nfor i in range(n-1):\n    for j in range(n-1-i):\n        if arr[j] > arr[j+1]:\n            arr[j], arr[j+1] = arr[j+1], arr[j]\n            swaps += 1\nprint(swaps)`,
        hint: 'Добавьте счётчик <code>swaps = 0</code>. После каждого обмена: <code>swaps += 1</code>.',
        test: (out, code) => out.trim() === '10' && code.includes('for')
      }
    },

    {
      heading: 'Практика: функция сортировки',
      content: `<p>Оформи алгоритм как функцию для многократного использования.</p>`,
      task: {
        xp: 25,
        practice: true,
        prompt: 'Напишите функцию <code>bubble_sort(arr)</code>, которая сортирует список пузырьком и возвращает результат. Проверьте на <code>[64, 25, 12, 22, 11]</code>. Ожидаемый вывод: <em>[11, 12, 22, 25, 64]</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        for j in range(n-1-i):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\nprint(bubble_sort([64, 25, 12, 22, 11]))`,
        hint: 'Функция принимает список, выполняет пузырьковую сортировку внутри и возвращает его через <code>return</code>.',
        test: (out, code) => out.trim() === '[11, 12, 22, 25, 64]' && code.includes('def')
      }
    }
  ]
};
