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
      prompt: 'Запишите числа от 1 до 5 в файл <code>/tmp/numbers.txt</code> (каждое на отдельной строке), затем прочитайте файл и выведите сумму всех чисел. Ожидаемый ответ: <em>15</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `with open('/tmp/numbers.txt', 'w') as f:\n    for i in range(1, 6):\n        f.write(str(i) + '\\n')\nsumma = 0\nwith open('/tmp/numbers.txt', 'r') as f:\n    for line in f:\n        summa += int(line.strip())\nprint(summa)`,
      hint: 'При чтении каждая строка файла содержит символ новой строки <code>\\n</code> в конце. Метод <code>.strip()</code> убирает его. После этого преобразуйте строку в число: <code>int(line.strip())</code>.',
      test: (out, code) => out.trim() === '15' && code.includes('open(')
    },
    {
      prompt: 'Запишите три строки в файл <code>/tmp/poem.txt</code> с помощью <code>writelines()</code>. Прочитайте файл и выведите количество строк. Ожидаемый ответ: <em>3</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `stroki = ["Первая строка\\n", "Вторая строка\\n", "Третья строка\\n"]\nwith open('/tmp/poem.txt', 'w', encoding='utf-8') as f:\n    f.writelines(stroki)\nwith open('/tmp/poem.txt', 'r', encoding='utf-8') as f:\n    lines = f.readlines()\nprint(len(lines))`,
      hint: '<code>readlines()</code> возвращает список строк — каждая строка файла становится отдельным элементом. Чтобы узнать количество строк, достаточно применить <code>len()</code> к этому списку.',
      test: (out, code) => out.trim() === '3' && code.includes('open(')
    },
    {
      prompt: 'Создайте файл <code>/tmp/search.txt</code> со словами: <em>яблоко, банан, апельсин, яблоко, груша</em> (каждое на отдельной строке). Найдите и выведите количество вхождений слова <em>«яблоко»</em>. Ожидаемый ответ: <em>2</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `with open('/tmp/search.txt', 'w', encoding='utf-8') as f:\n    f.write("яблоко\\nбанан\\nапельсин\\nяблоко\\nгруша\\n")\ncount = 0\nwith open('/tmp/search.txt', 'r', encoding='utf-8') as f:\n    for line in f:\n        if line.strip() == "яблоко":\n            count += 1\nprint(count)`,
      hint: 'Обязательно используйте <code>.strip()</code> при чтении строки из файла — он убирает символ <code>\\n</code> в конце, иначе сравнение <code>== "яблоко"</code> никогда не будет истинным.',
      test: (out, code) => out.trim() === '2' && code.includes('open(')
    }
  ]
};
