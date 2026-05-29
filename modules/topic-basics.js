export default {
  id: 'topic-basics',
  code: '7.1',
  title: 'Основы Python',
  layout: 'single',

  sections: [
    {
      heading: 'Функция print() — вывод данных',
      content: `
<p>Функция <code>print()</code> выводит информацию на экран. Это первое, что изучают в любом языке программирования. Можно выводить текст, числа, результаты вычислений.</p>
<pre><code class="language-python">print("Привет, мир!")   # вывод текста
print(42)               # вывод числа
print(2 + 3)            # вывод результата: 5
print("a", "b", "c")   # несколько значений через пробел</code></pre>
<p><strong>f-строки</strong> позволяют подставлять переменные прямо в текст:</p>
<pre><code class="language-python">name = "Алия"
age = 16
print(f"Меня зовут {name}, мне {age} лет")</code></pre>`,
      example: {
        title: 'Пример: различные варианты print()',
        code: `print("Привет, Python!")
print(100)
print(3 * 7)
name = "Данияр"
print(f"Имя: {name}, длина имени: {len(name)}")`
      },
      task: {
        prompt: 'Выведите на экран своё имя и возраст в формате: <em>«Имя: Алия, возраст: 16»</em>. Используйте переменные и f-строку. Первое слово вывода должно быть <em>«Имя:»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `name = "Алия"\nage = 16\nprint(f"Имя: {name}, возраст: {age}")`,
        hint: 'Используйте f-строку: <code>print(f"Имя: {name}, возраст: {age}")</code>. Фигурные скобки <code>{}</code> подставляют значение переменной.',
        test: (out, code) => out.trim().startsWith('Имя:') && out.includes('возраст:') && (code.includes('f"') || code.includes("f'"))
      }
    },

    {
      heading: 'Переменные и типы данных',
      content: `
<p>Переменная — это именованная ячейка памяти для хранения данных. В Python не нужно объявлять тип заранее — он определяется автоматически.</p>
<table>
  <tr><th>Тип</th><th>Название</th><th>Пример</th></tr>
  <tr><td><code>int</code></td><td>Целое число</td><td><code>x = 42</code></td></tr>
  <tr><td><code>float</code></td><td>Дробное число</td><td><code>pi = 3.14</code></td></tr>
  <tr><td><code>str</code></td><td>Строка (текст)</td><td><code>s = "Привет"</code></td></tr>
  <tr><td><code>bool</code></td><td>Логическое значение</td><td><code>flag = True</code></td></tr>
</table>
<p>Функция <code>type()</code> возвращает тип переменной. Преобразование типов: <code>int("5")</code>, <code>float("3.14")</code>, <code>str(42)</code>.</p>
<pre><code class="language-python">x = 10
y = 3.5
s = "Python"
print(type(x))   # &lt;class 'int'&gt;
print(type(y))   # &lt;class 'float'&gt;
print(type(s))   # &lt;class 'str'&gt;</code></pre>`,
      example: {
        title: 'Пример: типы данных и преобразование',
        code: `vozrast = 17           # int
rost = 175.5           # float
imya = "Берик"         # str
uchenik = True         # bool

print(f"{imya}: {vozrast} лет, рост {rost} см")
print(f"Учится: {uchenik}")

# Преобразование типов
chislo_str = "42"
chislo_int = int(chislo_str)
print(f"Строка '{chislo_str}' → число {chislo_int}, тип: {type(chislo_int)}")`
      },
      task: {
        prompt: 'Создайте переменную <code>temperature = "25"</code> (строка). Преобразуйте её в число, прибавьте 5 и выведите результат. Ожидаемый ответ: <em>30</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `temperature = "25"\nresult = int(temperature) + 5\nprint(result)`,
        hint: 'Используйте <code>int(temperature)</code> для преобразования строки в число, затем прибавьте 5.',
        test: (out, code) => out.trim() === '30' && code.includes('int')
      }
    },

    {
      heading: 'Арифметические операции',
      content: `
<p>Python поддерживает стандартные математические операции. Важно знать операторы целочисленного деления и остатка:</p>
<table>
  <tr><th>Оператор</th><th>Значение</th><th>Пример</th><th>Результат</th></tr>
  <tr><td><code>+</code></td><td>Сложение</td><td><code>7 + 3</code></td><td>10</td></tr>
  <tr><td><code>-</code></td><td>Вычитание</td><td><code>7 - 3</code></td><td>4</td></tr>
  <tr><td><code>*</code></td><td>Умножение</td><td><code>7 * 3</code></td><td>21</td></tr>
  <tr><td><code>/</code></td><td>Деление (дробное)</td><td><code>7 / 2</code></td><td>3.5</td></tr>
  <tr><td><code>//</code></td><td>Целочисленное деление</td><td><code>7 // 2</code></td><td>3</td></tr>
  <tr><td><code>%</code></td><td>Остаток от деления</td><td><code>7 % 2</code></td><td>1</td></tr>
  <tr><td><code>**</code></td><td>Возведение в степень</td><td><code>2 ** 8</code></td><td>256</td></tr>
</table>`,
      example: {
        title: 'Пример: арифметика и форматирование',
        code: `a = 17
b = 5

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.2f}")
print(f"{a} // {b} = {a // b}  (целая часть)")
print(f"{a} % {b} = {a % b}   (остаток)")
print(f"2 ** 10 = {2 ** 10}")`
      },
      task: {
        prompt: 'Вычислите площадь прямоугольника со сторонами <code>a = 8</code> и <code>b = 5</code>. Выведите: <em>«Площадь: 40»</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `a = 8\nb = 5\nprint(f"Площадь: {a * b}")`,
        hint: 'Площадь прямоугольника = длина × ширина. Используйте <code>a * b</code> внутри f-строки.',
        test: (out, code) => out.trim() === 'Площадь: 40' && code.includes('*')
      }
    },

    {
      heading: 'Строки: основные операции',
      content: `
<p>Строка — последовательность символов в кавычках. Строки можно складывать (<em>конкатенация</em>), умножать, получать их длину и обращаться к отдельным символам по индексу.</p>
<pre><code class="language-python">s = "Python"
print(len(s))        # 6 — длина строки
print(s[0])          # 'P' — первый символ (индекс с нуля)
print(s[-1])         # 'n' — последний символ
print(s[1:4])        # 'yth' — срез (символы 1,2,3)
print(s.upper())     # 'PYTHON'
print(s.lower())     # 'python'
print(s * 3)         # 'PythonPythonPython'
print("Hi " + s)    # 'Hi Python' — конкатенация</code></pre>`,
      example: {
        title: 'Пример: работа со строками',
        code: `slovo = "Программирование"

print(f"Слово: {slovo}")
print(f"Длина: {len(slovo)}")
print(f"Заглавные: {slovo.upper()}")
print(f"Первая буква: {slovo[0]}")
print(f"Последняя буква: {slovo[-1]}")
print(f"Первые 7 букв: {slovo[:7]}")`
      },
      task: {
        prompt: 'Дана строка <code>s = "Hello, Python!"</code>. Выведите её длину. Ожидаемый ответ: <em>14</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `s = "Hello, Python!"\nprint(len(s))`,
        hint: 'Функция <code>len(строка)</code> возвращает количество символов, включая пробелы и знаки препинания.',
        test: (out, code) => out.trim() === '14' && code.includes('len')
      }
    },

    {
      heading: 'Ввод данных — input()',
      content: `
<p>Функция <code>input()</code> считывает строку, которую вводит пользователь. Возвращает всегда <strong>строку</strong> — если нужно число, преобразуйте явно.</p>
<pre><code class="language-python">name = input("Введите имя: ")
print(f"Привет, {name}!")

age = int(input("Введите возраст: "))
year = 2024 + (18 - age)
print(f"Вам исполнится 18 в {year} году")</code></pre>
<div class="tip"><strong>Примечание:</strong> в этом тренажёре input() не работает (Python запущен в браузере без терминала). В задаче ниже данные уже заданы в коде — в реальной программе их получают через input().</div>`,
      example: {
        title: 'Пример: имитация ввода через переменные',
        code: `# В обычной программе: name = input("Имя: ")
# В браузере задаём значение напрямую:
name = "Айгерим"
age = int("17")   # как будто пришло из input()

print(f"Привет, {name}!")
print(f"Через {18 - age} год(а) тебе исполнится 18")`
      },
      task: {
        prompt: 'Запросите у пользователя вес в килограммах через <code>input()</code>. Переведите в граммы (умножьте на 1000) и выведите в формате: <em>«70 кг = 70000 г»</em>. Проверка: формат должен содержать <em>кг</em> и <em>г</em>, а граммы должны быть в 1000 раз больше килограммов.',
        starterCode: `# ваш код здесь
`,
        solution: `kg = int(input("Введите вес в кг: "))\ng = kg * 1000\nprint(f"{kg}кг = {g}г")`,
        hint: 'Используйте <code>input()</code> для ввода, <code>int()</code> для преобразования в число, затем умножьте на 1000 и выведите результат через f-строку.',
        test: (out, code) => {
          const m = out.trim().match(/(\d+)\s*кг\s*=\s*(\d+)\s*г/);
          return m ? parseInt(m[2]) === parseInt(m[1]) * 1000 : false;
        }
      }
    },

    {
      heading: 'Списки — основы',
      content: `
<p>Список (<code>list</code>) — упорядоченная коллекция элементов. Индексация начинается с нуля. Списки изменяемы: можно добавлять, удалять и изменять элементы.</p>
<pre><code class="language-python">fruits = ["яблоко", "банан", "вишня"]
print(fruits[0])      # "яблоко"
print(fruits[-1])     # "вишня"
print(len(fruits))    # 3

fruits.append("груша")   # добавить в конец
fruits.remove("банан")   # удалить элемент
print(fruits)            # ['яблоко', 'вишня', 'груша']

numbers = [5, 2, 8, 1, 9]
print(sum(numbers))   # 25
print(min(numbers))   # 1
print(max(numbers))   # 9</code></pre>`,
      example: {
        title: 'Пример: операции со списком',
        code: `scores = [88, 72, 95, 64, 81]

print(f"Оценки: {scores}")
print(f"Количество: {len(scores)}")
print(f"Сумма: {sum(scores)}")
print(f"Среднее: {sum(scores) / len(scores):.1f}")
print(f"Лучший результат: {max(scores)}")
print(f"Худший результат: {min(scores)}")`
      },
      task: {
        prompt: 'Дан список <code>nums = [3, 1, 4, 1, 5, 9, 2, 6]</code>. Выведите количество элементов, их сумму и максимальное значение — каждое на отдельной строке. Первая строка: <em>8</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `nums = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(len(nums))\nprint(sum(nums))\nprint(max(nums))`,
        hint: 'Используйте три функции: <code>len()</code>, <code>sum()</code>, <code>max()</code>. Каждый <code>print()</code> выводит на новую строку.',
        test: (out, code) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines[0] === '8' && lines[1] === '31' && lines[2] === '9';
        }
      }
    }
  ]
};
