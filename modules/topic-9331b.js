export default {
  id: 'topic-9331b',
  code: '9.3.3.1',
  title: 'Программы с одномерными массивами',
  layout: 'single',

  sections: [
    {
      heading: 'Список — индексы и доступ',
      content: `
<p>Список (<code>list</code>) — упорядоченная коллекция. Индексация начинается с нуля. Отрицательные индексы считают с конца:</p>
<pre><code class="language-python">a = [10, 20, 30, 40, 50]
#     0    1    2    3    4  — прямые
#    -5   -4   -3   -2   -1  — обратные

a[0]    # 10 — первый
a[-1]   # 50 — последний
a[1:3]  # [20, 30] — срез (без индекса 3)</code></pre>`,
      example: {
        title: 'Создание и доступ',
        code: `nums = [5, 10, 15, 20, 25]
print(nums[0])       # первый
print(nums[-1])      # последний
print(nums[1:4])     # срез
print(len(nums))     # длина
print(nums[::-1])    # перевёрнутый`
      },
      task: {
        xp: 10,
        prompt: 'Дан список <code>scores = [78, 92, 45, 88, 67, 95, 52]</code>. Вычислите среднее значение и выведите с двумя знаками после запятой. Ожидаемый ответ: <em>73.86</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `scores = [78, 92, 45, 88, 67, 95, 52]\nprint(f"{sum(scores)/len(scores):.2f}")`,
        hint: 'Среднее = <code>sum(scores) / len(scores)</code>. Форматирование: <code>f"{значение:.2f}"</code>.',
        test: (out, code) => out.trim() === '73.86'
      }
    },

    {
      heading: 'Перебор и поиск',
      content: `
<p>Для работы с каждым элементом используй цикл <code>for</code>. Для поиска — условие внутри цикла:</p>
<pre><code class="language-python">nums = [5, 3, 8, 1, 7]

# Поиск максимума вручную
max_val = nums[0]
for n in nums:
    if n > max_val:
        max_val = n
print(max_val)  # 8</code></pre>`,
      example: {
        title: 'Статистика списка',
        code: `data = [23, 45, 12, 67, 34, 89, 11]
print(f"Сумма: {sum(data)}")
print(f"Мин: {min(data)}")
print(f"Макс: {max(data)}")
print(f"Среднее: {sum(data)/len(data):.1f}")
count_big = sum(1 for x in data if x > 30)
print(f"Больше 30: {count_big}")`
      },
      task: {
        xp: 10,
        prompt: 'Дан список <code>items = [3, 7, 3, 1, 3, 5, 2, 3]</code>. Подсчитайте сколько раз встречается число <code>3</code>. Ожидаемый ответ: <em>4</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `items = [3, 7, 3, 1, 3, 5, 2, 3]\nprint(items.count(3))`,
        hint: 'У списков есть метод <code>.count(значение)</code>.',
        test: (out, code) => out.trim() === '4'
      }
    },

    {
      heading: 'Изменение списков',
      content: `
<pre><code class="language-python">a = [1, 2, 3]
a.append(4)      # [1, 2, 3, 4] — добавить в конец
a.insert(1, 99)  # [1, 99, 2, 3, 4] — вставить на позицию
a.remove(99)     # убрать первое вхождение
a.pop()          # убрать последний элемент
a.reverse()      # развернуть список
a.sort()         # отсортировать</code></pre>`,
      example: {
        title: 'Фильтрация списка',
        code: `nums = [15, 3, 42, 8, 27, 16, 42]
# Только числа > 20
big = [x for x in nums if x > 20]
print(big)
# Убрать дубликаты (сохранить порядок)
seen = []
for n in nums:
    if n not in seen:
        seen.append(n)
print(seen)`
      },
      task: {
        xp: 15,
        prompt: 'Дан список <code>arr = [1, 2, 3, 4, 5]</code>. Сдвиньте элементы на одну позицию влево (первый становится последним). Выведите результат. Ожидаемый вывод: <em>[2, 3, 4, 5, 1]</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `arr = [1, 2, 3, 4, 5]\nfirst = arr[0]\narr = arr[1:] + [first]\nprint(arr)`,
        hint: 'Сохрани первый элемент: <code>first = arr[0]</code>. Новый список: <code>arr[1:] + [first]</code>.',
        test: (out, code) => out.trim() === '[2, 3, 4, 5, 1]'
      }
    },

    {
      heading: 'Практика: поиск максимума',
      content: `<p>Найти максимальный элемент вручную — базовый алгоритм, который нужно уметь писать без встроенного <code>max()</code>.</p>`,
      task: {
        xp: 20,
        practice: true,
        prompt: 'Дан список <code>m = [324, 52, 12, 325, 25, 1234, 3, 2]</code>. Найдите максимальный элемент <strong>без использования</strong> <code>max()</code>. Выведите его. Ожидаемый ответ: <em>1234</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `m = [324, 52, 12, 325, 25, 1234, 3, 2]\nMax = m[0]\nfor i in m:\n    if i > Max:\n        Max = i\nprint(Max)`,
        hint: 'Начни с <code>Max = m[0]</code>. Перебирай элементы: если текущий > Max, обновляй Max.',
        test: (out, code) => out.trim() === '1234' && code.includes('if') && code.includes('for')
      }
    },

    {
      heading: 'Практика: чётные из списка',
      content: `<p>Отбери нужные элементы из списка используя цикл и условие.</p>`,
      task: {
        xp: 20,
        practice: true,
        prompt: 'Дан список <code>b = [1, 2, 4, 7, 8, 11, 14]</code>. Подсчитайте количество чётных чисел. Ожидаемый ответ: <em>4</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `b = [1, 2, 4, 7, 8, 11, 14]\nk = 0\nfor i in b:\n    if i % 2 == 0:\n        k += 1\nprint(k)`,
        hint: 'Используй <code>for</code> + <code>if i % 2 == 0</code> и считай через счётчик.',
        test: (out, code) => out.trim() === '4' && code.includes('for')
      }
    }
  ]
};
