export default {
  id: 'topic-10512',
  code: '10.5.1.2',
  title: 'Обработка строк с помощью функций',
  layout: 'single',

  sections: [
    {
      heading: 'Основные методы строк',
      content: `
<p>Строка — неизменяемая последовательность символов. Методы возвращают <em>новую</em> строку — не меняют исходную:</p>
<pre><code class="language-python">s = "  Привет, Мир!  "
s.upper()            # "  ПРИВЕТ, МИР!  "
s.lower()            # "  привет, мир!  "
s.strip()            # "Привет, Мир!" (убрать пробелы)
s.replace("Мир", "Python")  # замена
s.count("и")         # число вхождений
s.find("Мир")        # индекс первого вхождения (-1 если нет)
s.split(",")         # список по разделителю
" ".join(["a","b"])  # объединить список → "a b"</code></pre>`,
      example: {
        title: 'Обработка имени',
        code: `name = "  алия ахметова  "
name = name.strip().title()
print(name)          # "Алия Ахметова"
print(len(name))     # длина
words = name.split()
print(words)         # ['Алия', 'Ахметова']
print(words[0])      # первое слово`
      },
      task: {
        xp: 10,
        prompt: 'Напишите функцию <code>count_char(s, ch)</code>, которая считает вхождения символа <code>ch</code> без учёта регистра. Проверьте <code>count_char("Программирование", "а")</code>. Ожидаемый ответ: <em>2</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def count_char(s, ch):\n    return s.lower().count(ch.lower())\nprint(count_char("Программирование", "а"))`,
        hint: 'Приведи обе строки к нижнему регистру через <code>.lower()</code>, потом используй <code>.count()</code>.',
        test: (out, code) => out.trim() === '2' && code.includes('def count_char') && code.includes('count_char(')
      }
    },

    {
      heading: 'Срезы строк',
      content: `
<pre><code class="language-python">s = "Python"
s[0]     # 'P'  — первый
s[-1]    # 'n'  — последний
s[1:4]   # 'yth' — символы с 1 по 3
s[:3]    # 'Pyt' — первые 3
s[3:]    # 'hon' — с 3 до конца
s[::-1]  # 'nohtyP' — обратная строка
s[::2]   # 'Pto' — каждый второй</code></pre>`,
      example: {
        title: 'Работа со срезами',
        code: `s = "Hello, World!"
print(s[7:12])     # World
print(s[::-1])     # !dlroW ,olleH
print(s[0].upper() + s[1:])  # строка с заглавной первой буквой`
      },
      task: {
        xp: 10,
        prompt: 'Напишите функцию <code>to_title_case(s)</code>, которая делает первую букву каждого слова заглавной. Проверьте на <code>"изучаем python в школе"</code>. Ожидаемый вывод: <em>Изучаем Python В Школе</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def to_title_case(s):\n    return s.title()\nprint(to_title_case("изучаем python в школе"))`,
        hint: 'Метод <code>.title()</code> делает первую букву каждого слова заглавной.',
        test: (out, code) => out.trim() === 'Изучаем Python В Школе' && code.includes('def to_title_case') && code.includes('to_title_case(')
      }
    },

    {
      heading: 'f-строки и форматирование',
      content: `
<pre><code class="language-python">name = "Алия"
age = 16
print(f"Имя: {name}, возраст: {age}")

pi = 3.14159
print(f"π ≈ {pi:.2f}")      # 3.14
print(f"{42:05d}")           # 00042
print(f"{'текст':>10}")      # выравнивание вправо
print(f"{'текст':<10}|")     # выравнивание влево</code></pre>`,
      example: {
        title: 'Форматирование таблицы',
        code: `students = [("Алия", 95), ("Берик", 78), ("Данияр", 62)]
print(f"{'Имя':<12} {'Балл':>5} {'Оценка'}")
print("-" * 30)
for name, score in students:
    grade = "A" if score >= 90 else "B" if score >= 75 else "C"
    print(f"{name:<12} {score:>5} {grade}")`
      },
      task: {
        xp: 15,
        prompt: 'Напишите функцию <code>is_valid_password(pwd)</code>: длина >= 8 AND содержит хотя бы одну цифру. Проверьте <code>"Python42"</code>. Ожидаемый ответ: <em>True</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def is_valid_password(pwd):\n    return len(pwd) >= 8 and any(ch.isdigit() for ch in pwd)\nprint(is_valid_password("Python42"))`,
        hint: '<code>any(ch.isdigit() for ch in pwd)</code> — True если есть хоть одна цифра. Объедини с <code>len(pwd) >= 8</code> через <code>and</code>.',
        test: (out, code) => out.trim() === 'True' && code.includes('def is_valid_password') && code.includes('is_valid_password(')
      }
    },

    {
      heading: 'Практика: анализ текста',
      content: `<p>Функция как инструмент анализа — подсчёт статистики строки.</p>`,
      task: {
        xp: 20,
        practice: true,
        prompt: 'Напишите функцию <code>word_count(text)</code>, которая возвращает количество слов в строке. Проверьте на <code>"Изучайте Python каждый день"</code>. Ожидаемый ответ: <em>4</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def word_count(text):\n    return len(text.split())\nprint(word_count("Изучайте Python каждый день"))`,
        hint: '<code>text.split()</code> разбивает строку на слова по пробелам, возвращает список. <code>len()</code> — длина этого списка.',
        test: (out, code) => out.trim() === '4' && code.includes('def word_count') && code.includes('word_count(')
      }
    },

    {
      heading: 'Практика: палиндром и разворот',
      content: `<p>Строковые операции в функциях — частая задача на экзаменах.</p>`,
      task: {
        xp: 25,
        practice: true,
        prompt: 'Напишите функцию <code>reverse_words(s)</code>, которая переворачивает порядок слов в строке. Проверьте на <code>"Python это здорово"</code>. Ожидаемый вывод: <em>здорово это Python</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def reverse_words(s):\n    return ' '.join(s.split()[::-1])\nprint(reverse_words("Python это здорово"))`,
        hint: '<code>s.split()</code> → список слов. <code>[::-1]</code> → перевёрнутый список. <code>\' \'.join()</code> → обратно в строку.',
        test: (out, code) => out.trim() === 'здорово это Python' && code.includes('def reverse_words') && code.includes('reverse_words(')
      }
    }
  ]
};
