export default {
  id: 'topic-9331b',
  code: '9.3.3.1',
  title: 'Программы с одномерными массивами',

  theory: `
<h2>Массивы (списки) в Python</h2>
<p>В Python роль одномерного массива выполняет <strong>список</strong> (<code>list</code>). Список — это упорядоченная изменяемая коллекция элементов. Элементы могут быть любых типов, а доступ к ним осуществляется по индексу, начиная с нуля.</p>
<pre><code class="language-python">numbers = [10, 20, 30, 40, 50]
#          ^    ^    ^    ^    ^
# индексы:  0    1    2    3    4

print(numbers[0])   # 10 — первый элемент
print(numbers[-1])  # 50 — последний элемент
print(numbers[1:3]) # [20, 30] — срез</code></pre>

<h2>Создание и изменение списков</h2>
<pre><code class="language-python"># Создание
a = [1, 2, 3]                    # прямое задание
b = list(range(1, 6))            # [1, 2, 3, 4, 5]
c = [0] * 5                      # [0, 0, 0, 0, 0]
d = [x**2 for x in range(5)]     # [0, 1, 4, 9, 16]

# Изменение
a[0] = 100       # изменить элемент
a.append(4)      # добавить в конец
a.insert(1, 99)  # вставить на позицию
a.remove(99)     # удалить первый 99
a.pop()          # удалить последний элемент</code></pre>

<h2>Основные операции с массивами</h2>
<pre><code class="language-python">nums = [5, 3, 8, 1, 7, 2]

print(len(nums))     # 6 — длина
print(sum(nums))     # 26 — сумма
print(min(nums))     # 1 — минимум
print(max(nums))     # 8 — максимум
print(sorted(nums))  # [1, 2, 3, 5, 7, 8] — сортировка</code></pre>
`,

  examples: [
    {
      title: 'Пример 1: Статистика массива',
      code: `data = [23, 45, 12, 67, 34, 89, 11, 56]

n = len(data)
summa = sum(data)
srednee = summa / n
minimum = min(data)
maximum = max(data)

print(f"Количество элементов: {n}")
print(f"Сумма: {summa}")
print(f"Среднее: {srednee:.2f}")
print(f"Минимум: {minimum}")
print(f"Максимум: {maximum}")
print(f"Размах: {maximum - minimum}")`
    },
    {
      title: 'Пример 2: Линейный поиск и фильтрация',
      code: `numbers = [15, 3, 42, 8, 27, 42, 16, 42, 9]
target = 42

# Линейный поиск
found_at = []
for i in range(len(numbers)):
    if numbers[i] == target:
        found_at.append(i)

if found_at:
    print(f"Число {target} найдено на позициях: {found_at}")
else:
    print(f"Число {target} не найдено")

# Фильтрация: только числа > 20
bolshe_20 = [x for x in numbers if x > 20]
print(f"Числа больше 20: {bolshe_20}")`
    }
  ],

  tasks: [
    {
      prompt: 'Дан список <code>scores = [78, 92, 45, 88, 67, 95, 52]</code>. Вычислите среднее значение и выведите результат с двумя знаками после запятой. Ожидаемый ответ: <em>73.86</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `scores = [78, 92, 45, 88, 67, 95, 52]\nsrednee = sum(scores) / len(scores)\nprint(f"{srednee:.2f}")`,
      hint: 'Среднее — это сумма всех элементов, делённая на их количество. Функции <code>sum()</code> и <code>len()</code> уже использованы. Форматирование до 2 знаков: <code>f"{значение:.2f}"</code>.',
      test: (out, code) => out.trim() === '73.86'
    },
    {
      prompt: 'Дан список <code>items = [3, 7, 3, 1, 3, 5, 2, 3]</code>. Подсчитайте, сколько раз встречается число <code>3</code>. Выведите это число. Ожидаемый ответ: <em>4</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `items = [3, 7, 3, 1, 3, 5, 2, 3]\ncount = items.count(3)\nprint(count)`,
      hint: 'У списков есть удобный метод <code>.count(значение)</code>, который возвращает количество раз, сколько это значение встречается. Код уже почти готов — просто запустите.',
      test: (out, code) => out.trim() === '4'
    },
    {
      prompt: 'Дан список <code>arr = [1, 2, 3, 4, 5]</code>. Сдвиньте все элементы на одну позицию влево (первый элемент становится последним). Выведите результат. Ожидаемый вывод: <em>[2, 3, 4, 5, 1]</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `arr = [1, 2, 3, 4, 5]\nfirst = arr[0]\narr = arr[1:] + [first]\nprint(arr)`,
      hint: 'Идея: сохраните первый элемент (<code>arr[0]</code>), затем возьмите срез без него (<code>arr[1:]</code>) и добавьте сохранённый элемент в конец через <code>+</code>. Код уже написан — разберитесь в логике и запустите.',
      test: (out, code) => out.trim() === '[2, 3, 4, 5, 1]'
    }
  ]
};
