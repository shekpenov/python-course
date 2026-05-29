export default {
  id: 'topic-10511',
  code: '10.5.1.1',
  title: 'Функции и процедуры в Python',

  theory: `
<h2>Что такое функция?</h2>
<p>Функция — это именованный блок кода, который можно вызвать в любом месте программы. Функции позволяют избежать дублирования кода, разделить программу на логические части и упростить её отладку. В Python все функции определяются с помощью ключевого слова <code>def</code>.</p>

<h2>Определение и вызов функции</h2>
<pre><code class="language-python">def pozdravlenie(imya):    # определение функции
    """Выводит приветствие."""
    print(f"Привет, {imya}!")

pozdravlenie("Алия")     # вызов функции → Привет, Алия!
pozdravlenie("Данияр")   # ещё один вызов</code></pre>

<h2>Параметры и аргументы</h2>
<p>Функция может принимать <strong>параметры</strong> (в определении) и получать <strong>аргументы</strong> (при вызове). Можно задавать значения по умолчанию:</p>
<pre><code class="language-python">def step(base, exp=2):   # exp по умолчанию равен 2
    return base ** exp

print(step(3))    # 9  — exp=2 по умолчанию
print(step(3, 3)) # 27 — exp=3</code></pre>

<h2>Возвращаемое значение (return)</h2>
<p>Оператор <code>return</code> завершает функцию и возвращает значение вызывающему коду. Функция без <code>return</code> возвращает <code>None</code>. Можно вернуть несколько значений через запятую (они упаковываются в кортеж):</p>
<pre><code class="language-python">def min_max(lst):
    return min(lst), max(lst)

mn, mx = min_max([3, 1, 7, 2])
print(mn, mx)   # 1  7</code></pre>

<h2>Область видимости (scope)</h2>
<p>Переменные, созданные внутри функции, — <strong>локальные</strong> и не видны снаружи. Переменные вне функции — <strong>глобальные</strong>. Для изменения глобальной переменной внутри функции используют <code>global</code>, но злоупотреблять этим не стоит.</p>

<div class="tip"><strong>Хорошая практика:</strong> функция должна делать одну вещь и делать её хорошо. Давайте функциям глагольные названия: <code>calculate_sum</code>, <code>find_max</code>, <code>is_prime</code>.</div>
`,

  examples: [
    {
      title: 'Пример 1: Функции для математических вычислений',
      code: `def square(x):
    """Возвращает квадрат числа."""
    return x ** 2

def cube(x):
    """Возвращает куб числа."""
    return x ** 3

def factorial(n):
    """Вычисляет факториал n."""
    if n <= 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Используем функции
for n in range(1, 6):
    print(f"n={n}: n²={square(n)}, n³={cube(n)}, n!={factorial(n)}")`
    },
    {
      title: 'Пример 2: Рекурсивная функция — числа Фибоначчи',
      code: `def fibonacci(n):
    """Возвращает n-е число Фибоначчи рекурсивно."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def fibonacci_iter(n):
    """Возвращает n-е число Фибоначчи итеративно (эффективнее)."""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print("Первые 10 чисел Фибоначчи:")
for i in range(10):
    print(f"F({i}) = {fibonacci_iter(i)}")`
    }
  ],

  tasks: [
    {
      prompt: 'Напишите функцию <code>power(base, exp)</code>, которая вычисляет <code>base</code> в степени <code>exp</code> с помощью цикла (не используйте <code>**</code>). Вызовите <code>power(2, 10)</code> и выведите результат. Ожидаемый ответ: <em>1024</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `def power(base, exp):\n    result = 1\n    for _ in range(exp):\n        result *= base\n    return result\nprint(power(2, 10))`,
      hint: 'Внутри функции используйте цикл <code>for _ in range(exp)</code> и умножайте <code>result *= base</code> на каждой итерации. Начальное значение <code>result = 1</code> важно — умножение на 0 даст 0.',
      test: (out, code) => out.trim() === '1024' && code.includes('def power') && code.includes('power(')
    },
    {
      prompt: 'Напишите функцию <code>is_palindrome(s)</code>, которая возвращает <code>True</code>, если строка является палиндромом (читается одинаково слева направо и справа налево). Проверьте слово <code>"радар"</code> и выведите результат. Ожидаемый ответ: <em>True</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `def is_palindrome(s):\n    return s == s[::-1]\nresult = is_palindrome("радар")\nprint(result)`,
      hint: 'Обратная копия строки в Python записывается через срез: <code>s[::-1]</code>. Если строка равна своей обратной копии — она палиндром. Код почти готов, просто запустите.',
      test: (out, code) => out.trim() === 'True' && code.includes('def is_palindrome') && code.includes('is_palindrome(')
    },
    {
      prompt: 'Напишите функцию <code>count_vowels(s)</code>, которая подсчитывает количество гласных букв (а, е, ё, и, о, у, ы, э, ю, я) в строке. Проверьте на строке <code>"Программирование"</code> и выведите результат. Ожидаемый ответ: <em>7</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `def count_vowels(s):\n    glasnye = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"\n    count = 0\n    for ch in s:\n        if ch in glasnye:\n            count += 1\n    return count\nprint(count_vowels("Программирование"))`,
      hint: 'Оператор <code>in</code> проверяет, входит ли символ в строку: <code>if ch in glasnye</code>. Строка <code>glasnye</code> уже содержит все гласные в обоих регистрах. Код готов — проанализируйте и запустите.',
      test: (out, code) => out.trim() === '7' && code.includes('def count_vowels') && code.includes('count_vowels(')
    }
  ]
};
