export default {
  id: 'topic-9331a',
  code: '9.3.3.1',
  title: 'Чтение и запись файлов в Python',

  theory: `
<h2>Работа с файлами в Python</h2>
<p>Файлы позволяют сохранять данные между запусками программы. Python предоставляет встроенную функцию <code>open()</code> для работы с файлами. Функция принимает имя файла и режим доступа.</p>

<h2>Режимы открытия файла</h2>
<table>
  <tr><th>Режим</th><th>Описание</th></tr>
  <tr><td><code>'r'</code></td><td>Чтение (по умолчанию). Файл должен существовать.</td></tr>
  <tr><td><code>'w'</code></td><td>Запись. Создаёт файл или перезаписывает существующий.</td></tr>
  <tr><td><code>'a'</code></td><td>Дозапись в конец файла.</td></tr>
  <tr><td><code>'r+'</code></td><td>Чтение и запись.</td></tr>
</table>

<h2>Контекстный менеджер with</h2>
<p>Рекомендуемый способ работы с файлами — использовать конструкцию <code>with</code>. Она автоматически закрывает файл после выхода из блока, даже если произошла ошибка:</p>
<pre><code class="language-python"># Запись
with open('/tmp/myfile.txt', 'w', encoding='utf-8') as f:
    f.write("Привет, мир!\\n")
    f.write("Вторая строка\\n")

# Чтение всего файла
with open('/tmp/myfile.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)

# Чтение построчно
with open('/tmp/myfile.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())</code></pre>

<h2>Полезные методы</h2>
<ul>
  <li><code>f.read()</code> — читает весь файл как строку</li>
  <li><code>f.readlines()</code> — читает все строки в список</li>
  <li><code>f.write(str)</code> — записывает строку</li>
  <li><code>f.writelines(list)</code> — записывает список строк</li>
  <li><code>line.strip()</code> — убирает символ новой строки</li>
</ul>

<div class="tip"><strong>Примечание:</strong> в этом курсе мы работаем с файлами в виртуальной файловой системе браузера (папка <code>/tmp/</code>). Данные существуют только во время сессии.</div>
`,

  examples: [
    {
      title: 'Пример 1: Запись в файл и чтение обратно',
      code: `# Записываем несколько строк
with open('/tmp/notes.txt', 'w', encoding='utf-8') as f:
    f.write("Python — мощный язык программирования\\n")
    f.write("Файлы позволяют хранить данные\\n")
    f.write("Используйте with для безопасной работы\\n")

print("Файл записан. Читаем содержимое:")
print("-" * 40)

with open('/tmp/notes.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)`
    },
    {
      title: 'Пример 2: Подсчёт строк и слов в файле',
      code: `# Создаём файл с текстом
tekst = """Алгоритм — набор инструкций
Python прост в изучении
Программирование — это творчество
Файлы хранят информацию
Читай документацию"""

with open('/tmp/tekst.txt', 'w', encoding='utf-8') as f:
    f.write(tekst)

# Анализируем файл
with open('/tmp/tekst.txt', 'r', encoding='utf-8') as f:
    stroki = f.readlines()

kol_strok = len(stroki)
kol_slov = sum(len(s.split()) for s in stroki)
kol_simvolov = sum(len(s.strip()) for s in stroki)

print(f"Строк: {kol_strok}")
print(f"Слов: {kol_slov}")
print(f"Символов (без пробелов): {kol_simvolov}")`
    }
  ],

  tasks: [
    {
      prompt: 'Файл <code>/data/numbers.txt</code> уже есть на сайте — он содержит числа 10, 20, 30, 40, 50 (каждое на отдельной строке). Прочитайте его и выведите сумму всех чисел. Ожидаемый ответ: <em>150</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `summa = 0\nwith open('/data/numbers.txt', 'r') as f:\n    for line in f:\n        summa += int(line.strip())\nprint(summa)`,
      hint: 'Откройте файл через <code>open(\'/data/numbers.txt\', \'r\')</code>. Каждая строка — это число в виде текста. Используйте <code>int(line.strip())</code> для преобразования и накапливайте сумму.',
      test: (out, code) => out.trim() === '150' && code.includes('open(')
    },
    {
      prompt: 'Файл <code>/data/students.txt</code> уже загружен — он содержит 5 студентов в формате <em>Имя,Балл</em>. Прочитайте его и выведите количество строк. Ожидаемый ответ: <em>5</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `with open('/data/students.txt', 'r', encoding='utf-8') as f:\n    lines = f.readlines()\nprint(len(lines))`,
      hint: '<code>readlines()</code> возвращает список строк — каждая строка файла становится отдельным элементом. Примените <code>len()</code> к результату.',
      test: (out, code) => out.trim() === '5' && code.includes('open(')
    },
    {
      prompt: 'Файл <code>/data/students.txt</code> уже загружен — строки вида <em>Имя,Балл</em>. Найдите и выведите имя студента с наибольшим баллом. Ожидаемый ответ: <em>Алия</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `best_name = ''\nbest_score = 0\nwith open('/data/students.txt', 'r', encoding='utf-8') as f:\n    for line in f:\n        name, score = line.strip().split(',')\n        if int(score) > best_score:\n            best_score = int(score)\n            best_name = name\nprint(best_name)`,
      hint: 'Каждую строку разбивайте через <code>line.strip().split(\',\')</code> — получите список [имя, балл]. Балл преобразуйте в число через <code>int()</code> и сравнивайте с максимальным.',
      test: (out, code) => out.trim() === 'Алия' && code.includes('open(')
    },

    {
      prompt: 'Прочитайте файл <code>/data/students.txt</code> (формат: <em>Имя,Балл</em>). Используя условный оператор, подсчитайте количество студентов с баллом <strong>75 и выше</strong> и выведите это число. Ожидаемый ответ: <em>3</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `count = 0\nwith open('/data/students.txt', 'r', encoding='utf-8') as f:\n    for line in f:\n        name, score = line.strip().split(',')\n        if int(score) >= 75:\n            count += 1\nprint(count)`,
      hint: 'Для каждой строки получите балл через <code>split(\',\')[1]</code> и преобразуйте в число. Внутри цикла используйте <code>if int(score) >= 75:</code> и увеличивайте счётчик.',
      test: (out, code) => out.trim() === '3' && code.includes('open(') && code.includes('if')
    },

    {
      prompt: 'Прочитайте файл <code>/data/numbers.txt</code>. Выведите каждое число, умноженное на 2, но только если оно <strong>больше 25</strong>. Каждое число на отдельной строке. Ожидаемый вывод: <em>60, 80, 100</em> (каждое на новой строке).',
      starterCode: `# ваш код здесь
`,
      solution: `with open('/data/numbers.txt', 'r') as f:\n    for line in f:\n        n = int(line.strip())\n        if n > 25:\n            print(n * 2)`,
      hint: 'Читайте файл построчно, преобразуйте каждую строку в число через <code>int(line.strip())</code>. Добавьте условие <code>if n > 25:</code> и выводите удвоенное значение.',
      test: (out, code) => {
        const lines = out.trim().split('\n').map(l => l.trim());
        return lines.length === 3 && lines[0] === '60' && lines[1] === '80' && lines[2] === '100'
          && code.includes('open(') && code.includes('if');
      }
    },

    {
      prompt: 'Прочитайте файл <code>/data/words.txt</code>. Используя цикл, подсчитайте общее количество слов во всём файле и выведите результат. Ожидаемый ответ: <em>21</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `total = 0\nwith open('/data/words.txt', 'r', encoding='utf-8') as f:\n    for line in f:\n        total += len(line.split())\nprint(total)`,
      hint: 'Для каждой строки получите список слов через <code>line.split()</code> — он разбивает строку по пробелам. Длина этого списка (<code>len()</code>) — количество слов в строке. Накапливайте сумму.',
      test: (out, code) => out.trim() === '21' && code.includes('open(') && code.includes('for')
    }
  ]
};
