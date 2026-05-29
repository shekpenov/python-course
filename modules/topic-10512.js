export default {
  id: 'topic-10512',
  code: '10.5.1.2',
  title: 'Обработка строк с помощью функций',

  theory: `
<h2>Строки в Python</h2>
<p>Строка (<code>str</code>) — неизменяемая последовательность символов. Доступ к символам — через индекс (<code>s[0]</code>), к подстроке — через срез (<code>s[1:4]</code>). Строки поддерживают множество встроенных методов для обработки текста.</p>

<h2>Основные методы строк</h2>
<pre><code class="language-python">s = "  Привет, Мир!  "

s.upper()          # "  ПРИВЕТ, МИР!  "
s.lower()          # "  привет, мир!  "
s.strip()          # "Привет, Мир!" — убирает пробелы
s.strip().title()  # "Привет, Мир!"

s.replace("Мир", "Python")   # замена
s.count("и")                 # число вхождений
s.find("Мир")                # индекс первого вхождения (-1 если нет)
s.startswith("  Привет")     # True
s.endswith("!  ")            # True
s.split(",")                 # ["  Привет", " Мир!  "]
",".join(["a", "b", "c"])   # "a,b,c"</code></pre>

<h2>Форматирование строк (f-строки)</h2>
<pre><code class="language-python">name = "Алия"
age = 16
# f-строка (Python 3.6+)
print(f"Имя: {name}, возраст: {age}")
# Форматирование числа
pi = 3.14159
print(f"π ≈ {pi:.2f}")          # 3.14
print(f"Число: {42:05d}")       # 00042</code></pre>

<h2>Срезы строк</h2>
<pre><code class="language-python">s = "Python"
s[0]     # 'P'
s[-1]    # 'n'
s[1:4]   # 'yth'
s[:3]    # 'Pyt'
s[3:]    # 'hon'
s[::-1]  # 'nohtyP' — обратная строка
s[::2]   # 'Pto' — каждый второй символ</code></pre>

<div class="tip"><strong>Совет:</strong> строки неизменяемы! Каждый метод возвращает <em>новую</em> строку, а не изменяет исходную. Присваивайте результат: <code>s = s.strip()</code>.</div>
`,

  examples: [
    {
      title: 'Пример 1: Анализ текста',
      code: `def analyze_text(text):
    """Анализирует строку и возвращает статистику."""
    words = text.split()
    chars_no_spaces = text.replace(" ", "")

    vowels = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"
    vowel_count = sum(1 for c in text if c in vowels)

    return {
        'слов': len(words),
        'символов': len(text),
        'без_пробелов': len(chars_no_spaces),
        'гласных': vowel_count
    }

sentence = "Изучайте Python каждый день"
stats = analyze_text(sentence)
print(f"Предложение: «{sentence}»")
for key, val in stats.items():
    print(f"  {key}: {val}")`
    },
    {
      title: 'Пример 2: Форматирование имени и генерация email',
      code: `def format_name(last, first, middle=""):
    """Возвращает полное имя в правильном регистре."""
    parts = [last.strip().title()]
    parts.append(first.strip().title())
    if middle:
        parts.append(middle.strip().title())
    return " ".join(parts)

def generate_login(last, first):
    """Генерирует логин из имени."""
    login = (first[0] + last).lower()
    login = login.replace(" ", "")
    return login

names = [
    ("ахметов", "берик", "нурланович"),
    ("ИВАНОВА", "алия"),
    ("петров", "данияр", "")
]

for parts in names:
    full = format_name(*parts)
    login = generate_login(parts[0], parts[1])
    print(f"{full:<25} → логин: {login}")`
    }
  ],

  tasks: [
    {
      prompt: 'Напишите функцию <code>count_char(s, ch)</code>, которая возвращает количество вхождений символа <code>ch</code> в строку <code>s</code> (без учёта регистра). Вызовите её: <code>count_char("Программирование", "а")</code>. Ожидаемый ответ: <em>2</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `def count_char(s, ch):\n    return s.lower().count(ch.lower())\nresult = count_char("Программирование", "а")\nprint(result)`,
      hint: 'Чтобы поиск не зависел от регистра, приведите обе строки к нижнему регистру через <code>.lower()</code>, затем используйте метод <code>.count()</code>. Код готов — разберитесь, почему вызываются два <code>.lower()</code>.',
      test: (out, code) => out.trim() === '2' && code.includes('def count_char') && code.includes('count_char(')
    },
    {
      prompt: 'Напишите функцию <code>to_title_case(s)</code>, которая переводит строку в «заглавный регистр» (первая буква каждого слова заглавная). Проверьте на строке <code>"изучаем python в школе"</code>. Ожидаемый вывод: <em>Изучаем Python В Школе</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `def to_title_case(s):\n    return s.title()\nresult = to_title_case("изучаем python в школе")\nprint(result)`,
      hint: 'У строк есть встроенный метод <code>.title()</code>, который делает именно это — первую букву каждого слова заглавной. Функция уже написана — попробуйте запустить и убедиться в результате.',
      test: (out, code) => out.trim() === 'Изучаем Python В Школе' && code.includes('def to_title_case') && code.includes('to_title_case(')
    },
    {
      prompt: 'Напишите функцию <code>is_valid_password(pwd)</code>, которая проверяет пароль: длина не менее 8 символов И содержит хотя бы одну цифру. Проверьте <code>"Python42"</code>. Ожидаемый ответ: <em>True</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `def is_valid_password(pwd):\n    has_digit = any(ch.isdigit() for ch in pwd)\n    long_enough = len(pwd) >= 8\n    return has_digit and long_enough\nresult = is_valid_password("Python42")\nprint(result)`,
      hint: '<code>any(...)</code> возвращает <code>True</code>, если хоть один элемент последовательности истинен. <code>ch.isdigit()</code> проверяет, является ли символ цифрой. Оба условия соединяются через <code>and</code>. Код готов — запустите.',
      test: (out, code) => out.trim() === 'True' && code.includes('def is_valid_password') && code.includes('is_valid_password(')
    }
  ]
};
