export default {
  id: 'topic-10513',
  code: '10.5.1.3',
  title: 'Работа с файлами: продвинутый уровень',

  theory: `
<h2>Обработка ошибок при работе с файлами</h2>
<p>При работе с файлами могут возникнуть ошибки: файл не существует, нет прав на запись, диск заполнен. Для обработки таких ситуаций используют конструкцию <code>try / except</code>:</p>
<pre><code class="language-python">try:
    with open('/tmp/data.txt', 'r') as f:
        content = f.read()
except FileNotFoundError:
    print("Файл не найден!")
except PermissionError:
    print("Нет прав доступа!")
except Exception as e:
    print(f"Неизвестная ошибка: {e}")</code></pre>

<h2>Работа с CSV-форматом</h2>
<p>CSV (Comma-Separated Values) — текстовый формат для хранения таблиц. Каждая строка файла — одна запись, поля разделены запятой. Модуль <code>csv</code> упрощает работу с таким форматом:</p>
<pre><code class="language-python">import csv

# Запись CSV
with open('/tmp/students.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Имя', 'Оценка'])   # заголовок
    writer.writerow(['Алия', 95])
    writer.writerow(['Берик', 87])

# Чтение CSV
with open('/tmp/students.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)</code></pre>

<h2>Дозапись и обновление файлов</h2>
<pre><code class="language-python"># Режим 'a' — дозапись в конец файла
with open('/tmp/log.txt', 'a', encoding='utf-8') as f:
    f.write("Новая запись\\n")</code></pre>

<div class="tip"><strong>Лучшая практика:</strong> всегда указывайте кодировку (<code>encoding='utf-8'</code>) при работе с текстовыми файлами — это предотвращает проблемы с кириллицей на разных системах.</div>
`,

  examples: [
    {
      title: 'Пример 1: Подсчёт частоты слов в тексте',
      code: `# Создаём текстовый файл
tekst = """python прост и элегантен
python мощный и универсальный
python используется в науке и в бизнесе
изучай python каждый день"""

with open('/tmp/words.txt', 'w', encoding='utf-8') as f:
    f.write(tekst)

# Подсчёт частоты слов
freq = {}
with open('/tmp/words.txt', 'r', encoding='utf-8') as f:
    for line in f:
        for word in line.strip().lower().split():
            freq[word] = freq.get(word, 0) + 1

# Сортируем по убыванию частоты
sorted_freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)

print("Топ-5 самых частых слов:")
for word, count in sorted_freq[:5]:
    print(f"  {word}: {count}")`
    },
    {
      title: 'Пример 2: CSV — оценки студентов',
      code: `import csv

# Записываем данные
students = [
    ['Алия', 95, 'Отлично'],
    ['Берик', 78, 'Хорошо'],
    ['Данияр', 62, 'Удовлетворительно'],
    ['Айгерим', 91, 'Отлично'],
]

with open('/tmp/grades.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Имя', 'Балл', 'Оценка'])
    writer.writerows(students)

# Читаем и анализируем
print("Успеваемость класса:")
total, count = 0, 0
with open('/tmp/grades.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    next(reader)  # пропускаем заголовок
    for row in reader:
        name, score, grade = row
        print(f"  {name:<12} {score:>4} — {grade}")
        total += int(score)
        count += 1

print(f"\\nСредний балл: {total/count:.1f}")`
    }
  ],

  tasks: [
    {
      prompt: 'Запишите список слов <code>["яблоко", "банан", "вишня", "груша", "дыня"]</code> в файл <code>/tmp/fruits.txt</code> (каждое на отдельной строке). Прочитайте файл и выведите количество слов, содержащих букву <em>«а»</em>. Ожидаемый ответ: <em>3</em> (яблоко — нет, банан — да, вишня — нет, груша — нет, дыня — да, а также яблоко не содержит «а»... проверьте: яблоко(нет), банан(да), вишня(нет), груша(да), дыня(да) = 3).',
      starterCode: `# ваш код здесь
`,
      solution: `...`,
      hint: 'При проверке слова на содержание буквы используйте оператор <code>in</code>: <code>if "а" in word</code>. Не забудьте <code>.strip()</code> для очистки строки от символа переноса. Разберитесь, какие из слов содержат «а»: банан, груша, дыня.',
      test: (out, code) => out.trim() === '3'
    },
    {
      prompt: 'Создайте файл <code>/tmp/data.txt</code> с числами: 10, 20, 30, 40, 50 (каждое на новой строке). Прочитайте файл, умножьте каждое число на 2 и запишите результаты в файл <code>/tmp/result.txt</code>. Выведите содержимое result.txt. Первая строка должна быть <em>20</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `...`,
      hint: 'Открывайте сразу два файла в одном блоке <code>with</code>: один для чтения (<code>fin</code>), другой для записи (<code>fout</code>). При записи результата преобразуйте число обратно в строку через <code>str()</code> и добавьте <code>\\n</code>.',
      test: (out, code) => {
        const lines = out.trim().split('\n').map(l => l.trim());
        return lines[0] === '20' && lines.length === 5 && lines[4] === '100';
      }
    },
    {
      prompt: 'Используя модуль <code>csv</code>, запишите таблицу успеваемости (3 студента: Алия 95, Берик 78, Данияр 62) в файл <code>/tmp/marks.csv</code>. Прочитайте файл и выведите имя студента с наибольшим баллом. Ожидаемый ответ: <em>Алия</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `...`,
      hint: 'При чтении CSV каждая строка — это список строк: <code>row[0]</code> — имя, <code>row[1]</code> — балл в виде текста. Преобразуйте балл в число через <code>int(row[1])</code>. <code>next(reader)</code> пропускает заголовок — не удаляйте эту строку.',
      test: (out, code) => out.trim() === 'Алия'
    }
  ]
};
